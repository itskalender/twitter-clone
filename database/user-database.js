const BaseDatabase  = require('./base-database');
const { User }      = require('../models');

class UserDatabase extends BaseDatabase {
  findByName(name){
    return this.findBy('firstName', name);
  }
  /*
    findByUsername
  */
};

module.exports = new UserDatabase(User)