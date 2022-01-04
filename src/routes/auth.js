const router      = require('express').Router();
const { 
  validateAgainst
}                 = require('../middlewares');
const {
  signUpValidation,
  logInValidation
}                 = require('../validations');
const {
  signUp,
  logIn
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

module.exports = router;