const { AppError } = require('../../utils');

function validateAgainst(schema) {
  return async function validate(req, _, next) {
    //  TO DO 
    const payload = {
      ...req.body,
    }

    const { error, value } = schema.validate(payload);

    console.log('error validateAgainst => ', error);

    if (error) {
      const msg = error.details[0].message;
      
      return next(new AppError(400, msg));
    }

    next();
  }
}

module.exports = validateAgainst;