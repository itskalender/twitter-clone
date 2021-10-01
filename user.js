const colors      = require('colors/safe');

const HomePage    = require('./home-page');
const Tweet       = require('./tweet');
const Retweet     = require('./retweet')

class User {
  #password;

  constructor(firstName, lastName, userName, email, password) {
    this.firstName    = firstName;
    this.lastName     = lastName;
    this.userName     = userName;
    this.email        = email;
    this.#password    = password;
    this.followings   = [];
    this.followers    = [];
    this.tweets       = [];
    this.likedTweets  = [];

    this.homePage     = this.#createHomePage();
  }

  #createHomePage() {
    return new HomePage(this);
  }

  tweet(content, id) {
    const tweet = new Tweet(this, content, id);

    this.tweets.push(tweet);
    this.homePage.tweets.push(tweet);

    console.log(`${colors.red(this.firstName)} tweeted "${colors.yellow(tweet.content)}".`)
  }

  deleteTweet(id) {
    const tweet                   = this.tweets.find(tweet => tweet.id === id);
    const updatedTweets           = this.tweets.filter(tweet => tweet.id !== id );
    const updatedHomePageTweets   = this.homePage.tweets.filter(tweet => tweet.id !== id)

    this.tweets             = updatedTweets;
    this.homePage.tweets    = updatedHomePageTweets;

    console.log(`${colors.red(this.firstName)} deleted a tweet "${colors.yellow(tweet.content)}".`)
  }

  follow(user) {
    this.followings.push(user);
    user.followers.push(this);
    this.homePage.tweets.push(...user.tweets);

    console.log(`${colors.red(this.firstName)} followed ${colors.red(user.firstName)}.`);
  }

  unfollow(user) {
    const updatedFollowings     = this.followings.filter(following => following.userName !== user.userName);
    const updatedFollowers      = user.followers.filter(follower => follower.userName !== this.userName);
    const updatedHomePageTweets = this.homePage.tweets.filter(tweet => tweet.creator.userName !== user.userName);

    this.followings       = updatedFollowings;
    user.followers        = updatedFollowers;
    this.homePage.tweets  = updatedHomePageTweets;

    console.log(`${colors.red(this.firstName)} unfollowed ${colors.red(user.firstName)}.`);
  }

  retweet(id) {
    const tweet     = this.homePage.tweets.find(tweet => tweet.id === id);
    const newTweet  = new Retweet(tweet.creator, tweet.content, 9, tweet.createTime );

    this.tweets.push(newTweet);
    this.homePage.tweets.push(newTweet);

    console.log(`${colors.red(this.firstName)} retweeted "${colors.yellow(tweet.content)}".`);
  }

  undoRetweet(id) {
    const tweets                = this.tweets;
    const tweet                 = tweets.find(tweet => tweet.id === id);
    const updatedTweets         = tweets.filter(tweet => tweet.id !== id );
    const updatedHomePageTweets = this.homePage.tweets.filter(tweet => tweet.id !== id);
    
    this.tweets             = updatedTweets; 
    this.homePage.tweets    = updatedHomePageTweets;

    console.log(`${colors.red(this.firstName)} did undo a retweet "${colors.yellow(tweet.content)}".`);
  }

  like(id) {
    const tweet = this.homePage.tweets.find(tweet => tweet.id === id );

    this.likedTweets.push(tweet);

    console.log(`${colors.red(this.firstName)} liked "${colors.yellow(tweet.content)}".`);
  }

  undoLike(id) {
    const tweets        = this.likedTweets;
    const tweet         = tweets.find(tweet => tweet.id === id);
    const updatedTweets = tweets.filter(tweet => tweet.id !== id);

    this.likedTweets    = updatedTweets;

    console.log(`${colors.red(this.firstName)} did undo a liked tweet "${colors.yellow(tweet.content)}".`);
  }
}

module.exports = User;