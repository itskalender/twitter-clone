const { catchAsync }  = require('../utils');
const { authService } = require('../services');

const signUp = catchAsync(async (req, res, next) => {
  const { body: user } = req;

  const account = await authService.create(user);

  res.status(200).json({
    code: 0,
    msg: 'success',
    account
  })
});

module.exports = {
  signUp
}