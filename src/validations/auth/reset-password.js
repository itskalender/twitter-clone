const Joi                 = require('joi');
const { joiErrorHandler } = require('../../utils');
const {
  USER_PASSWORD_PATTERN
}                         = require('../config');

const resetPasswordValidation = Joi.object({
  password: Joi
    .string()
    .pattern(USER_PASSWORD_PATTERN)
    .required()
    .error(joiErrorHandler),

  confirmationPassword: Joi
    .ref('password')

})
  .with('password', 'confirmationPassword')
  .error(joiErrorHandler)

module.exports = resetPasswordValidation;
