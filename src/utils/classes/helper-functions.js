const bcrypt = require('bcryptjs');
const crypto = require('crypto');

class HelperFunctions {
  hashPassword(password, salt) {
    return bcrypt.hash(password, salt);
  }

  comparePasswords(password, hash) {
    return bcrypt.compare(password, hash);
  }

  hash(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
  }

  createRandomBytes(bytes) {
    return crypto.randomBytes(bytes).toString('hex');
  }

}

module.exports = new HelperFunctions();