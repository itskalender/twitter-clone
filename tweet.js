class Tweet {
  constructor(creator, content, id, createTime = new Date()) {
    // this.id       = 
    this.id         = id;
    this.creator    = creator;
    this.content    = content;
    this.createTime = createTime
  }
}

module.exports = Tweet;