const BaseDatabase  = require('./base-database');
const User          = require('../user');

class UserDatabase extends BaseDatabase {
  findByName(name){
    return this.findBy('firstName', name);
  }
};

module.exports = new UserDatabase(User)