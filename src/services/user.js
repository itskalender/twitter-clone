const BaseService = require('./base');
const { User }    = require('../models');

class UserService extends BaseService {}

module.exports = new UserService(User);