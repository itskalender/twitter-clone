const jwt = require('jsonwebtoken');

function signToken(userId) {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id: userId },
      process.env.JWT_SECRET_KEY,
      { expiresIn: process.env.JWT_EXPIRES_IN },
      (err, jwt) => {
        if (err) {
          reject(err);
        } else {
          resolve(jwt);
        }
      }
    );
  });
}

module.exports = signToken;