const authControllers   = require('./auth');
const usersControllers  = require('./users');

module.exports = {
  ...authControllers,
  ...usersControllers
}