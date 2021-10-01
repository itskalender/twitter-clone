const Tweet = require('./tweet')

class Retweet extends Tweet {
  constructor(creator, content, id, createTime) {
    super(creator, content, id, createTime);
    this.shareTime  = new Date();
  }
}

module.exports = Retweet;