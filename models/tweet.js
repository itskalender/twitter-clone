const mongoose      = require('mongoose');
const autopopulate  = require('mongoose-autopopulate');

const tweetSchema = mongoose.Schema({
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

}, { timestamps: true })

tweetSchema.plugin(autopopulate);

module.exports = mongoose.model('Tweet', tweetSchema);