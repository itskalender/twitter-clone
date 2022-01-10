const Joi                 = require('joi');
const { joiErrorHandler } = require('../../utils');
const {
  USER_EMAIL_OPTIONS
}                         = require('../config');

const forgotPasswordValidation = Joi.object({
  email: Joi
    .string()
    .email(USER_EMAIL_OPTIONS)
    .lowercase()
    .required()
    .error(joiErrorHandler),

});

module.exports = forgotPasswordValidation;
