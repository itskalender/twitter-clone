const mongoose  = require('mongoose');
const {
  HelperFunctions
}               = require('../../../utils');

const userSchema = mongoose.Schema({
  name: {
    type        : String,
    required    : [true, 'A user must have a name.']
  },

  username: {
    type        : String,
    unique      : true,
    default     : function setDefaultUsername() {
      return this.name.toLowerCase() + String(Date.now()).slice(0, 6);
    }
  },

  email: {
    type        : String,
    unique      : true,
    required    : [true, 'A user must have an email.']
  },

  password: {
    type        : String,
    required    : [true, 'A user must have a password']
  },

  confirmationPassword: {
    type        : String,
    validate: {
      validator : function validateConfirmationPassword(value) {
        return this.password === value;
      },
      message   : `Confirmation password must be equal to password.`
    },
    required    : [true, 'Confirmation password must be provided.']
  },

  passwordResetToken: String,

  passwordResetTokenExpiresAt: String,

  bio           : String,

  location      : String,

  webSite       : String,

  profilPic     : String,

}, { 
  timestamps  : true,
  versionKey  : false,
  toObject    : { virtuals: true },
  toJSON      : { virtuals: true }
});

userSchema.methods.update = function(object) {
  for (let key of Object.keys(object)) {
    this[key] = object[key];
  }
}

userSchema.methods.setPasswordResetToken = function() {
  const passwordResetToken          = HelperFunctions.createRandomBytes(32);
  const passwordResetTokenHash      = HelperFunctions.hash(passwordResetToken);

  this.passwordResetToken           = passwordResetTokenHash;
  this.passwordResetTokenExpiresAt  = Date.now() + 10 * 60 * 1000;

  return passwordResetToken;
}

userSchema.pre('save', async function(next) {
  if ( this.isModified('password') ) {
    this.password                     = await HelperFunctions.hashPassword(this.password, 8);
    this.confirmationPassword         = undefined;
    this.passwordResetToken           = undefined;
    this.passwordResetTokenExpiresAt  = undefined;

    next();
  }

  next();
});

userSchema.post('save', function() {
  this.password = undefined;
});

module.exports = userSchema;