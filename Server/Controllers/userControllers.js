const server = require('../db');
const bcrypt = require('bcrypt');
const { createToken } = require('../utils/jwtHelpers');
const jwt = require('jsonwebtoken');

//This creates a new user
exports.signUp = async (req, res) => {
  const pool = server.openDb();

  try {
    //encrypt password before storing
    const hashedPassword = await bcrypt.hash(req.body.password, 10);
    const newUser = await pool.query(
      'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
      [req.body.username.toLowerCase(), hashedPassword]
    );
    res.json({ users: newUser.rows[0] });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

//this is for user to login
exports.login = async (req, res) => {
  const pool = server.openDb();
  try {
    const { username, password } = req.body;
    // Check if user exists
    const users = await pool.query('SELECT * FROM users WHERE username = $1', [
      username,
    ]);
    if (users.rows.length === 0)
      return res.status(400).json({ error: 'User does not exist' });

    // password check
    const validPassword = await bcrypt.compare(
      password,
      users.rows[0].password
    );
    if (!validPassword)
      return res.status(400).json({ error: 'Invalid username or password' });
    //Jwt

    let token = createToken(users.rows[0]);

    res.cookie('access_token', token.access_token, {
      httpOnly: true,
      // comment out this line below to test on postman
      sameSite: 'None',
      secure: true,
      expires: new Date(Number(new Date()) + 15 * 24 * 60 * 60 * 1000),
    });
    res.json(token);
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// this is to log user out
exports.logout = (req, res) => {
  try {
    res.clearCookie('access_token');
    return res.status(200).json({ message: 'access token deleted' });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

// this is to add gem when user claims free gems

exports.freeGems = async (req, res) => {
  const pool = server.openDb();
  const query = 'UPDATE users SET gems = gems + 1000 WHERE id = $1 RETURNING *';

  try {
    await pool.query(query, [req.user.id]);
    res
      .status(200)
      .json({ message: `1000 gems added to user ${req.user.username}` });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.checkAuth = async (req, res) => {
  try {
    if (!req.cookies.access_token) {
      return res.status(200).json({ isLoggedIn: false });
    }

    jwt.verify(
      req.cookies.access_token,
      process.env.ACCESS_TOKEN_SECRET,
      async (err, user) => {
        const pool = server.openDb();
        const userDB = await pool.query('SELECT * FROM users WHERE id = $1', [
          user.id,
        ]);

        if (!userDB) {
          return res.status(404).json({ message: 'User does not exist' });
        }

        const userData = userDB.rows[0];

        res.status(200).json({ isLoggedIn: true, userData });
      }
    );
  } catch (err) {
    res.status(404).json({ message: 'Something went wrong' });
  }
};


// this is to change password

exports.changePassword = async (req, res) => {
  const pool = server.openDb();
  try {
    const { currentPassword, newPassword, confirmPassword } = req.body;
  
    const user = await pool.query('SELECT * FROM users WHERE id = $1', [
      req.user.id,
    ]);
    const validPassword = await bcrypt.compare(currentPassword, user.rows[0].password);

    if (!validPassword) {
      return res
        .status(400)
        .json({ message: 'Your current password is incorrect' });
    } else {
      if (newPassword !== confirmPassword ) {
        return res
          .status(400)
          .json({ message: 'Your new passwords does not match' });
      } else if(newPassword.length < 4) {
        return res
        .status(400)
        .json({ message: 'The new password must be at least 4 characters long.' });
      } else {
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        const updatePassword = await pool.query(
          'UPDATE users SET password = $1 WHERE id = $2 RETURNING *',
          [hashedPassword, req.user.id]
        );
        res.json({ message: 'Password updated successfully' });
      }
    }
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
