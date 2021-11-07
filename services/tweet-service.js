const BaseService = require('./base-service');
const userService = require('./user-service');
const { Tweet }   = require('../models');

class TweetService extends BaseService {
  async tweet(userId, body) {
    const author  = await userService.findById(userId);
    const tweet   = await Tweet.create({ author, body }); // const tweet = new Tweet({ author, body }).save();
    
    author.tweets.push(tweet);
    author.home.push(tweet);

    await author.save();

    for ( let user of author.followers ) {
      user.home.push(tweet);
      user.save();
    }

    return tweet;
  };

  async deleteTweet(userId, tweetId) {
    await this.deleteById(tweetId);
    // In this way, the tweet can be able to be removed from tweets collection, but can't from user's tweets array and user's followers' home array!
  }

  async like(userId, tweetId) {
    const user  = await userService.findById(userId);
    const tweet = await this.findById(tweetId);

    user.likedTweets.push(tweet);
    tweet.likes.push(user);

    await user.save();
    await tweet.save();
  }

  async unlike(userId, tweetId) {
    const user  = await userService.findById(userId);
    const tweet = await this.findById(tweetId);

    user.likedTweets  = user.likedTweets.filter(tweet => tweet.id !== tweetId);
    tweet.likes       = tweet.likes.filter(user => user.id !== userId);

    await user.save();
    await tweet.save();
  }

  async retweet(userId, originalTweetId, body) {
    const author        = await userService.findById(userId);
    const originalTweet = await this.findById(originalTweetId);

    const retweet = await Tweet.create({ author, originalTweet, body })

    author.tweets.push(retweet);
    author.home.push(retweet);

    originalTweet.retweets.push(retweet);

    await author.save();
    await originalTweet.save();

    return retweet;
  }

  async unretweet(userId, retweetId) {
    const user          = await userService.findById(userId);
    const retweet       = await this.findById(retweetId);
    const originalTweet = await this.findById(retweet.originalTweet.id);

    user.tweets = user.tweets.filter(tweet => tweet.id !== retweetId);
    user.home   = user.home.filter(tweet => tweet.id !== retweetId);
    await user.save();

    originalTweet.retweets = originalTweet.retweets.filter(tweet => tweet.id !== retweetId);
    await originalTweet.save();

    await this.deleteById(retweetId);
  }
};

module.exports = new TweetService(Tweet)