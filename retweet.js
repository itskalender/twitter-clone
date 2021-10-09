const Tweet = require('./tweet')

class Retweet extends Tweet {
  constructor(id, creator, content, createTime, retweets, likes, retweeter) {
    super(id, creator, content, createTime, retweets, likes);
    this.shareTime  = new Date();
    this.retweeter  = retweeter;
  }
}

module.exports = Retweet;