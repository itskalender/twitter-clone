const {
  catchAsync,
  AppError,
}               = require('../utils');
const {
  userService
}               = require('../services');

const getUser = catchAsync(async (req, res, next) => {
  const { username } = req.params;

  const user = await userService.findOne({ username });

  if (!user) {
    return next(new AppError(404, 'Cannot find a user with given username.'));
  }

  res.status(200).json({
    code: 0,
    msg: 'success',
    data: {
      data: user
    }
  });
});

module.exports = {
  getUser
}