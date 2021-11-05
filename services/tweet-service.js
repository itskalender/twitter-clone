const BaseService = require('./base-service');
const userService = require('./user-service');
const { Tweet }   = require('../models');

class TweetService extends BaseService {
  async tweet(userId, body) {
    const author  = await userService.findById(userId);
    const tweet   = await Tweet.create({ author, body });

    author.tweets.push(tweet);
    await author.save();
    
    return tweet;
  };
};

module.exports = new TweetService(Tweet)