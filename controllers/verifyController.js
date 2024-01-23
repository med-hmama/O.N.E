const jwt = require('jsonwebtoken');
const User = require('../models/userModel');


// Verify user ID
module.exports.verify = async (req, res, next) => {
  const token = req.headers.authorization

  if (!token) return res.status(401).send('Access Denied')
  try {
    const verified = jwt.verify(token, process.env.TOKEN_SECRET);
    const user = await User.findById(verified._id);
    if (!user) {
      return res.status(400).send('user not found');
    }
    req.user = user
    next()
  } catch (err) {
    return res.status(400).send('invalid token');
  }
};



// Manage roles
exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.headers.role)) {
      return res.status(400).send('invalid role');
    };
    next();
  };
};