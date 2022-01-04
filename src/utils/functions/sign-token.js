const jwt   = require('jsonwebtoken');
const {
  AppError
}           = require('../classes');

function signToken(userId) {
  try {
    return jwt.sign(
      { id: userId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN }
    );
  } catch (err) {
    throw new AppError(500, 'Cannot sign token.');
  }
}

module.exports = signToken;