const mongoose  = require('mongoose');
const bcrypt    = require('bcryptjs');
const {
  hashPassword
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
      validator : function validatePasswordConfirm(value) {
        return this.password === value;
      },
      message   : function createConfirmationPasswordErrorMessage(props) {
        return `Confirmation password must be equal to password.`
      }
    },
    required    : [true, 's']
  },

  bio           : String,

  location      : String,

  webSite       : String,

  profilPic     : String,

  tweets: [
    {
      type      : mongoose.Schema.Types.ObjectId,
      ref       : 'Tweet',
    }
  ],

  likedTweets: [
    {
      type      : mongoose.Schema.Types.ObjectId,
      ref       : 'Tweet',
    }
  ],

  followings: [
    {
      type      : mongoose.Schema.Types.ObjectId,
      ref       : 'User',
    }
  ],

  followers: [
    {
      type      : mongoose.Schema.Types.ObjectId,
      ref       : 'User',
    }
  ],

  home: [
    {
      type      : mongoose.Schema.Types.ObjectId,
      ref       : 'Tweet',
    }
  ]

}, { 
  timestamps  : true,
  versionKey  : false,
  toObject    : { virtuals: true },
  toJSON      : { virtuals: true }
});

userSchema.methods.comparePasswords = function(password, hash) {
  return bcrypt.compare(password, hash);
}

userSchema.pre('save', async function(next) {
  if ( this.isModified('password') ) {
    this.password             = await hashPassword(this.password);
    this.confirmationPassword = undefined;
    next();
  }

  next();
});

userSchema.post('save', function() {
  this.password = undefined;
});

module.exports = userSchema;