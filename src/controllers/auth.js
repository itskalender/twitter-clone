const {
  catchAsync,
  AppError,
  signToken
}               = require('../utils');
const {
  authService
}               = require('../services');

const signUp = catchAsync(async (req, res, next) => {
  const { body: user } = req;

  const newUser = await authService.create(user);

  res.status(200).json({
    code: 0,
    msg: 'success',
    data: {
      data: newUser
    }
  });
});

const logIn = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  const user = await authService.findOne({ email }, '+password');

  if (!user) {
    return next(new AppError(400, 'Cannot find a user with given email or password.'));
  }

  const arePasswordsEqual = await user.comparePasswords(password, user.password);

  if (!arePasswordsEqual) {
    return next(new AppError(400, 'Cannot find a user with given email or password.'));
  }

  const JWT = await signToken(user.id);

  res.status(200).json({
    code: 0,
    msg: 'success',
    token: JWT,
    data: {
      data: user
    }
  });
});

module.exports = {
  signUp,
  logIn
}