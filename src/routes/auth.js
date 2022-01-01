const router      = require('express').Router();
const { 
  validateAgainst
}                 = require('../middlewares');
const {
  signUpValidation
}                 = require('../validations');
const {
  signUp
}                 = require('../controllers');

router.route('/sign-up')
  .post(
    validateAgainst(signUpValidation),
    signUp
  )

module.exports = router;