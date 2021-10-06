const colors        = require('colors/safe');
const Home          = require('./home');
const Tweet         = require('./tweet');
const Retweet       = require('./retweet');
class User {
  constructor(firstName, lastName, username, email, password ,id, tweets = [], likedTweets = [], followings = [], followers = [], home = this.#createHome()) {
    this.id           = id;
    this.firstName    = firstName;
    this.lastName     = lastName;
    this.username     = username;
    this.email        = email;
    this.password     = password;
    this.tweets       = tweets;
    this.likedTweets  = likedTweets;
    this.followings   = followings;
    this.followers    = followers;
    this.home         = home;
  }

  #createHome() {
    return new Home();
  }

  static create({firstName, lastName, username, email, password, id, tweets, likedTweets, followings, followers, home}) {
    const newUser = new User(firstName, lastName, username, email, password ,id, tweets, likedTweets, followings, followers, home);
    
    return newUser;
  }

  tweet(content, id) {
    const user = this;
    const tweet = new Tweet(this, content, id);

    user.tweets.push(tweet);
    user.home.tweets.push(tweet);

    console.log(`${colors.red(user.firstName)} tweeted "${colors.yellow(tweet.content)}".`)
  }

  deleteTweet(id) {
    const user  = this;
    const tweet = user.tweets.find(t => t.id === id);

    if (!tweet) {
      console.log(`This tweet has been already deleted.`);
      return;
    }

    const updatedTweets     = user.tweets.filter(t => t.id !== id );
    const updatedHomeTweets = user.home.tweets.filter(t => t.id !== id);

    user.tweets       = updatedTweets;
    user.home.tweets  = updatedHomeTweets;

    console.log(`${colors.red(user.firstName)} deleted a tweet "${colors.yellow(tweet.content)}".`)
  }

  follow(user) {
    const hasSameUser = this.followings.some(u => u.id === user.id);

    if (hasSameUser) {
      console.log(`You've already followed ${user.firstName}.`);
      return;
    }

    this.followings.push(user);
    this.home.tweets.push(...user.tweets);
    user.followers.push(this);

    console.log(`${colors.red(this.firstName)} followed ${colors.red(user.firstName)}.`);
  }

  unfollow(user) {
    const hasSameUser = this.followings.some(u => u.id === user.id);

    if (!hasSameUser) {
      console.log(`You've already unfollowed ${user.firstName}.`);
      return;
    }

    const updatedFollowings = this.followings.filter(u => u.id !== user.id);
    const updatedHomeTweets = this.home.tweets.filter(t => t.creator.id !== user.id);
    const updatedFollowers  = user.followers.filter(u => u.id !== this.id);

    this.followings   = updatedFollowings;
    this.home.tweets  = updatedHomeTweets;
    user.followers    = updatedFollowers;

    console.log(`${colors.red(this.firstName)} unfollowed ${colors.red(user.firstName)}.`);
  }

  retweet(id) {
    const tweet         = this.home.tweets.find(t => t.id === id);
    const newTweet      = new Retweet(tweet.creator, tweet.content, 9, tweet.createTime);
    const hasSameTweet  = this.tweets.some(t => t.id === 9);

    if (hasSameTweet) {
      console.log(`You've already retweeted this tweet.`);
      return;
    } // I've hardcoded because I need to know the id of the tweet that will be retweeted.

    this.tweets.push(newTweet);
    this.home.tweets.push(newTweet);

    console.log(`${colors.red(this.firstName)} retweeted "${colors.yellow(tweet.content)}".`);
  }

  undoRetweet(id) {
    const tweet = this.tweets.find(t => t.id === id);

    if (!tweet) {
      console.log(`You've already deleted this retweet.`);
      return;     
    }

    const updatedTweets     = this.tweets.filter(t => t.id !== id );
    const updatedHomeTweets = this.home.tweets.filter(t => t.id !== id);

    this.tweets       = updatedTweets; 
    this.home.tweets  = updatedHomeTweets;

    console.log(`${colors.red(this.firstName)} deleted a retweet "${colors.yellow(tweet.content)}".`);
  }

  like(id) {
    const tweet         = this.home.tweets.find(t => t.id === id);
    const hasSameTweet  = this.likedTweets.some(t => t.id === id);

    if (hasSameTweet) {
      console.log(`You've already liked this tweet.`);
      return;
    }

    this.likedTweets.push(tweet);

    console.log(`${colors.red(this.firstName)} liked "${colors.yellow(tweet.content)}".`);
  }

  undoLike(id) {
    const tweet = this.likedTweets.find(t => t.id === id);

    if (!tweet) {
      console.log(`You've already deleted this liked tweet.`);
      return;
    }

    const updatedTweets = this.likedTweets.filter(t => t.id !== id);
    this.likedTweets    = updatedTweets;

    console.log(`${colors.red(this.firstName)} did undo like a tweet "${colors.yellow(tweet.content)}".`);
  }
}

module.exports = User;
