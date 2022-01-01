async function errorHandler(err, req, res, next) {
  if (err.isOperational) {
    res.status(err.status).json({
      error: err,
      code: err.code,
      msg: err.message
    });
  }
  else {
    res.status(500).json({
      error: err,
      code: 2,
      msg: 'Internal server error.'
    });
  }
}

module.exports = errorHandler;


