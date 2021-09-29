class Tweet {
  constructor(user, content, id) {
    // this.id       = this.#generateId();
    this.id       = id;
    this.user     = user;
    this.content  = content;
    this.time     = new Date();
  }

  #generateId() {
    return Math.floor(Math.random() * 3);
  }
}

module.exports = Tweet;