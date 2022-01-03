const mongoose  = require('mongoose');

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
    required    : true,
    unique      : true
  },
  password: {
    type        : String,
    required    : true
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

userSchema.pre('save', async function(next) {
  if ( this.isModified('password') ) {
    this.password = await hashPassword(this.password);

    next();
  }

  next();
});

userSchema.post('save', function() {
  this.password = undefined;
});



module.exports = userSchema;