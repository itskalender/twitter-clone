function catchAsync(callback) {
  return function controller(req, res, next) {
    callback(req, res, next)
      .catch(next)
  }
}

module.exports = catchAsync;