const jwt = require('jsonwebtoken');

//This middleware is used to authenticate the token(verify if the token is valid)
function authenticateToken(req, res, next) {
  const token = req.cookies.access_token;
  
  if (token == null) return res.status(401).json({ error: 'null token' });
  jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (error, user) => {
    if (error) return res.status(403).json({ error: error.message });
    req.user = user;
    next();
  });
}

module.exports = authenticateToken;
