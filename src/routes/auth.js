const router      = require('express').Router();
const { 
  validateAgainst
}                 = require('../middlewares');
const {
  signUpValidation,
  logInValidation,
  forgotPasswordValidation
}                 = require('../validations');
const {
  signUp,
  logIn,
  forgotPassword
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

module.exports = router;