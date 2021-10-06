const BaseDatabase  = require('./base-database');
const User          = require('../user');

class UserDatabase extends BaseDatabase {};

module.exports = new UserDatabase(User)
