const errorMiddlewares      = require('./error');
const validationMiddlewares = require('./validation');

module.exports = {
  ...errorMiddlewares,
  ...validationMiddlewares
}