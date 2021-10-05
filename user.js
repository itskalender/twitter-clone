const colors      = require('colors/safe');

const Home        = require('./home');
const Tweet       = require('./tweet');
const Retweet     = require('./retweet');
const db          = require('./database')
class User {
  #password;

  constructor(firstName, lastName, username, email, password ,id) {
    this.id           = id;
    this.firstName    = firstName;
    this.lastName     = lastName;
    this.username     = username;
    this.email        = email;
    this.#password    = password;
    this.tweets       = [];
    this.likedTweets  = [];
    this.followings   = [];
    this.followers    = [];

    this.home         = this.#createHome();
  }

  #createHome() {
    return new Home();
  }

  tweet(content, id) {
    const users = db.load('users');
    const user  = users.find(u => u.id === this.id);
    
    const tweet = new Tweet(this, content, id);

    user.tweets.push(tweet);
    user.home.tweets.push(tweet);

    db.update('users', [user]);

    console.log(`${colors.red(user.firstName)} tweeted "${colors.yellow(tweet.content)}".`)
  }

  deleteTweet(id) {
    const users             = db.load('users');
    const user              = users.find(u => u.id === this.id);

    const tweet             = user.tweets.find(t => t.id === id);
    if (!tweet) {
      console.log(`The tweet has been already deleted.`);
      return;
    }
    const updatedTweets     = user.tweets.filter(t => t.id !== id );
    const updatedHomeTweets = user.home.tweets.filter(t => t.id !== id)

    user.tweets             = updatedTweets;
    user.home.tweets        = updatedHomeTweets;

    db.update('users', [user]);

    console.log(`${colors.red(user.firstName)} deleted a tweet "${colors.yellow(tweet.content)}".`)
  }

  follow(id) {
    const users     = db.load('users');
    const follower  = users.find(u => u.id === this.id);
    const following = users.find(u => u.id === id);
    
    follower.followings.push(following);
    following.followers.push(follower);
    follower.home.tweets.push(...following.tweets);

    db.update('users', [follower, following]);

    console.log(`${colors.red(follower.firstName)} followed ${colors.red(following.firstName)}.`);
  }

  unfollow(id) { // change the variable names, it feels like not a libükütüs language.
    const users             = db.load('users');
    const follower          = users.find(u => u.id === this.id);
    const following         = users.find(u => u.id === id);

    const updatedFollowings = follower.followings.filter(f => f.id !== id);
    const updatedFollowers  = following.followers.filter(f => f.id !== follower.id);
    const updatedHomeTweets = follower.home.tweets.filter(t => t.creator.id !== following.id);

    follower.followings     = updatedFollowings;
    following.followers     = updatedFollowers;
    follower.home.tweets    = updatedHomeTweets;

    db.update('users', [follower, following]);

    console.log(`${colors.red(follower.firstName)} unfollowed ${colors.red(following.firstName)}.`);
  }

  retweet(id) {
    const users     = db.load('users');
    const user      = users.find(u => u.id === this.id);
    const tweet     = users.flatMap(u => u.tweets).find(t => t.id === id);
    const newTweet  = new Retweet(tweet.creator, tweet.content, 9, tweet.createTime );

    user.tweets.push(newTweet);
    user.home.tweets.push(newTweet);

    db.update('users', [user]);

    console.log(`${colors.red(user.firstName)} retweeted "${colors.yellow(tweet.content)}".`);
  }

  undoRetweet(id) {
    const users = db.load('users');
    const user  = users.find(u => u.id === this.id);
    const tweet = users.flatMap(u => u.tweets).find(t => t.id === id);
    if (!tweet) {
      console.log(`${colors.bgWhite.red('WARNING')} - There is no tweet with the id of ${colors.red(id)}`);
      return;     
    }
    const updatedTweets     = user.tweets.filter(t => t.id !== id );
    const updatedHomeTweets = user.home.tweets.filter(t => t.id !== id);

    user.tweets             = updatedTweets; 
    user.home.tweets        = updatedHomeTweets;

    db.update('users', [user]);

    console.log(`${colors.red(user.firstName)} did undo a retweet "${colors.yellow(tweet.content)}".`);
  }

  like(id) {
    const users = db.load('users'); // getUsers f();
    const user  = users.find(u => u.id === this.id);
    const tweet = users.flatMap(u => u.tweets).find(t => t.id === id);

    user.likedTweets.push(tweet);

    db.update('users', [user]);

    console.log(`${colors.red(user.firstName)} liked "${colors.yellow(tweet.content)}".`);
  }

  undoLike(id) {
    const users         = db.load('users'); // getUsers f();
    const user          = users.find(u => u.id === this.id);
    const tweet         = user.likedTweets.find(t => t.id === id);
    const updatedTweets = user.likedTweets.filter(t => t.id !== id);

    user.likedTweets    = updatedTweets;

    db.update('users', [user]);

    console.log(`${colors.red(user.firstName)} did undo like a tweet "${colors.yellow(tweet.content)}".`);
  }
}

module.exports = User;
