const crypto = require('crypto');

class HelperFunctions {
  createRandomBytes(bytes) {
    return crypto.randomBytes(bytes).toString('hex');
  }

  hashToken(token) {
    return crypto.createHash('sha256').update(token).digest('hex');
  }
}

module.exports = new HelperFunctions();