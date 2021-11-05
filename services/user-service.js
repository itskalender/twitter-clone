const BaseService = require('./base-service');
const { User }    = require('../models');

class UserService extends BaseService {
  async findByName(name) {
    /* const user = await this.findBy('name', name);
    return user; */

    return this.findBy('name', name);
  }
  
  async findByUsername(username) {
    /* const user = await this.findBy('username', username);
    return user; */

    return this.findBy('username', username);
  }

  
};

module.exports = new UserService(User)