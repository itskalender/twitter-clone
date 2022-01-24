const router      = require('express').Router();
const { 
  validateAgainst
}                 = require('../middlewares');
const {
  signUpValidation,
  logInValidation,
  forgotPasswordValidation,
  resetPasswordValidation
}                 = require('../validations');
const {
  signUp,
  logIn,
  forgotPassword,
  resetPassword
}                 = require('../controllers');

router.route('/sign-up')
  .post(
    validateAgainst(signUpValidation),
    signUp
  )

router.route('/log-in')
  .post(
    validateAgainst(logInValidation),
    logIn
  )

router.route('/forgot-password')
  .post(
    validateAgainst(forgotPasswordValidation),
    forgotPassword
  )

router.route('/reset-password/:resetToken')
  .patch(
    validateAgainst(resetPasswordValidation),
    resetPassword
  )

module.exports = router;