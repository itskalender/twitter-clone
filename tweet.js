class Tweet {
  constructor(creator, content, id, createTime = new Date()) {
    // this.id       = this.#generateId();
    this.id         = id;
    this.creator    = creator;
    this.content    = content;
    this.createTime = createTime
  }

  #generateId() {
    return Math.floor(Math.random() * 3);
  }
}

module.exports = Tweet;