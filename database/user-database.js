const BaseDatabase  = require('./base-database');
const { User }      = require('../models');

class UserDatabase extends BaseDatabase {
  async findByName(name) {
    const user = await this.findBy('name', name);
    return user;
  }
  
  async findByUsername(username) {
    const user = await this.findBy('username', username);
    return user;
  }
};

module.exports = new UserDatabase(User)