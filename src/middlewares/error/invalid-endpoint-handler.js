const { AppError } = require('../../utils');

async function invalidEndpointHandler(req, _, next) {
  next(
    new AppError(
      404,
      `The requested endpoint ${req.method} ${req.originalUrl} was not defined on this server.`
    )
  );
}

module.exports = invalidEndpointHandler;