const mongoose      = require('mongoose');
const autopopulate  = require('mongoose-autopopulate');

const tweetSchema = mongoose.Schema({
  author        : { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: { maxDepth : 1 }
  },
  body          : { type: String, required() { return !this.originalTweet } },
  originalTweet : { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Tweet',
    autopopulate: { maxDepth: 1 } 
  },
  retweets      : [],
  likes         : [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      autopopulate: { maxDepth: 1 }
    }
  ],
  attachments   : []

}, { timestamps: true })

tweetSchema.plugin(autopopulate);

module.exports = mongoose.model('Tweet', tweetSchema);