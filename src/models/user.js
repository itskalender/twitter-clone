const mongoose      = require('mongoose');
const autopopulate  = require('mongoose-autopopulate')

const userSchema = mongoose.Schema({
  name : {
    type        : String,
    required    : [true, 'A user must have a name.']
  },
  username : {
    type: String,
    // required: true,
    unique: true
  },
  email       : { type: String, required: true, unique : true },
  password    : { type: String, required: true },
  bio         : String,
  location    : String,
  webSite     : String,
  profilPic   : String,
  tweets      : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tweet',
      autopopulate: { maxDepth: 1 }
    }
  ],
  likedTweets : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tweet',
      autopopulate: { maxDepth: 1 }
    }
  ],
  followings  : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate : { maxDepth: 1 }
    }
  ],
  followers   : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { maxDepth: 1 }
    }
  ],
  home        : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Tweet',
      autopopulate: { maxDepth: 1 }
    }
  ],
}, { timestamps: true })

userSchema.plugin(autopopulate);

module.exports = mongoose.model('User', userSchema);
