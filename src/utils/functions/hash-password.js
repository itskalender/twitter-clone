const bcrypt = require('bcryptjs');

function hashPassword(password) {
  return bcrypt.hash(password, 8);
}

module.exports = hashPassword;