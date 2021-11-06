const BaseService = require('./base-service');
const userService = require('./user-service');
const { Tweet }   = require('../models');

class TweetService extends BaseService {
  async tweet(userId, body) {
    const author  = await userService.findById(userId);
    const tweet   = await Tweet.create({ author, body }); // const tweet = new Tweet({ author, body }).save();
    
    author.tweets.push(tweet);
    author.home.push(tweet);

    author.followers.forEach(user => {
      user.home.push(tweet);
      user.save();
    })
    
    await author.save();
    
    return tweet;
  };

  async deleteTweet(userId, tweetId) {
    await this.deleteById(tweetId);
    // In this way, the tweet can be able to be removed from tweets collection, but can't from user's tweets array and user's followers' home array!
  }
};

module.exports = new TweetService(Tweet)