const Tweet = require('./tweet')

class Retweet extends Tweet {
  constructor(author, content, originalTweet) {
    super(author, content);
    this.originalTweet = originalTweet;
  }
}

module.exports = Retweet;