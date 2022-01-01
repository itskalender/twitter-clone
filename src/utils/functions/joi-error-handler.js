function joiErrorHandler(errors) {
  console.log('errors => ', errors);

  errors.forEach(err => {
    const field   = err.local;
    
    switch (err.code) {
      case 'any.required':
        err.message = `${field.label} is a required field.`;
        break;
      case 'any.only':
        err.message = `${field.label} must be either ${field.valids.join(', ')}.`;
        break;

      case 'string.base':
        err.message = `${field.label} must be a string.`;
        break;
      case 'string.pattern.base':
        err.message = `${field.label} must satisfy the required pattern (${field.regex}).`;
        break;
      case 'string.empty':
        err.message = `${field.label} cannot be empty.`;
        break;
      case 'string.email':
        err.message = `${field.label} must be a valid email.`;
        break;
      case 'string.min':
        err.message = `${field.label} must be at least ${field.limit} character long.`;
        break;

      case 'number.base':
        err.message = `${field.label} must be a number.`;
        break;
      case 'number.max':
        err.message = `${field.label} must be less than or equal to ${field.limit}.`;
        break;
      case 'number.min':
        err.message = `${field.label} must be greater than or equal to ${field.limit}.`;
        break;

      case 'array.length':
        err.message = `${field.label}'s length must be equal to ${field.limit}.`;
        break;

      case 'object.with':
        err.message = `${field.main} must be provided with ${field.peer}.`;
        break;
    }
  });

  return errors;
}

module.exports = joiErrorHandler;