const mongoose      = require('mongoose');
const autopopulate  = require('mongoose-autopopulate');

const TweetSchema = mongoose.Schema({
  author      : { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    autopopulate: { maxDepth : 1 }
  },
  body        : { type: String, required: true },
  replies     : [],
  retweets    : [],
  likes       : [],
  attachments : []

}, { timestamp: true })

TweetSchema.plugin(autopopulate);

module.exports = mongoose.model('Tweet', TweetSchema);