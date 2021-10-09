class Tweet {
  constructor(id, creator, content, createTime = new Date(), retweets = [], likes = []) {
    this.id         = id;
    this.creator    = creator;
    this.content    = content;
    this.createTime = createTime;
    this.retweets   = retweets;
    this.likes      = likes;
  }

  addToRetweets(user) {
    this.retweets.push(user);
  }
  
  deleteFromRetweets(user) {
    const retweets        = this.retweets;
    const updatedRetweets = retweets.filter(u => u.id !== user.id); 

    this.retweets = updatedRetweets;
  }

  addToLikes(user) {
    this.likes.push(user);
  }

  deleteFromLikes(user) {
    const likes         = this.likes;
    const updatedLikes  = likes.filter(u => u.id !== user.id);

    this.likes = updatedLikes;
  }
}

module.exports = Tweet;