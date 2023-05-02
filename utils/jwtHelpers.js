const jwt = require('jsonwebtoken');

const { promisify } = require('util');
const server = require('../db');

// Create tokens for user function
function createToken({id,username}) {
  const user = {id,username};
  const access_token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {expiresIn: '15d'}); 
  
  return({access_token});
}

const protect = async (req, res, next) => {
  // 1) Getting token and check if it is there
  console.log(req.cookies);
  let token;
  if (req.cookies.access_token) {
    token = req.cookies.access_token;
  }

  if (!token) {
    return res.status(401).json({ error: 'No token provided.' });
  }

  // 2) Verification of the token
  const decoded = await promisify(jwt.verify)(
    token,
    process.env.ACCESS_TOKEN_SECRET
  );

  // 3) Check if user still exists
  const pool = server.openDb();
  const currentUser = await pool.query('SELECT * FROM users WHERE id = $1', [
    decoded.id,
  ]);
  if (currentUser.rows.length === 0)
    return res.status(404).json({ error: 'User no longer exists' });

  // GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  next();
};

module.exports = { createToken, protect };
