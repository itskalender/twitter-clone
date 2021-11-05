const BaseDatabase  = require('./base-database');
const userDatabase  = require('./user-database');
const { Tweet }     = require('../models');

class TweetDatabase extends BaseDatabase {
  async tweet(userId, body) {
    const author  = await userDatabase.findById(userId);
    const tweet   = await Tweet.create({ author, body });

    author.tweets.push(tweet);
    await author.save();
    
    return tweet;
  };
};

module.exports = new TweetDatabase(Tweet)