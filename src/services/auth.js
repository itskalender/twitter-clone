const BaseService = require('./base');
const { User }    = require('../models');

class AuthService extends BaseService {}

module.exports = new AuthService(User);