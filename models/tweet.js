const { v4: uuidv4 }  = require('uuid');

class Tweet {
  id            = uuidv4();
  createdAt     = new Date();
  attachments   = [];
  replies       = [];
  retweets      = [];
  likes         = [];
  
  constructor(author, content) {
    this.author   = author;
    this.content  = content;
  }
}

module.exports = Tweet;