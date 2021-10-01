const ProfilePage = require('./profile-page');
const HomePage    = require('./home-page');
const Tweet       = require('./tweet');

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
    this.retweets     = [];

    this.profilePage  = this.#createProfilePage();
    this.homePage     = this.#createHomePage();
  }

  #createProfilePage() {
    return new ProfilePage(this);
  }

  #createHomePage() {
    return new HomePage(this);
  }

  tweet(content, id) {
    const tweet = new Tweet(this, content, id);

    this.tweets.push(tweet);
    this.profilePage.tweets.push(tweet);
    this.homePage.tweets.push(tweet);
  }

  deleteTweet(id) {
    const updatedTweets         = this.tweets.filter(tweet => tweet.id !== id );
    const updatedHomePageTweets = this.homePage.tweets.filter(tweet => tweet.id !== id)

    this.tweets             = updatedTweets;
    this.profilePage.tweets  = updatedTweets;
    this.homePage.tweets    = updatedHomePageTweets;
  }

  follow(user) {
    this.followings.push(user);
    user.followers.push(this);
    this.homePage.tweets.push(...user.tweets);
    this.homePage.retweets.push(...user.retweets);
  }

  unfollow(user) {
    const updatedFollowings       = this.followings.filter(following => following.userName !== user.userName);
    const updatedHomePageTweets   = this.homePage.tweets.filter(tweet => tweet.user.userName !== user.userName);
    const updatedHomePageRetweets = this.homePage.retweets.filter(retweet => retweet.user.userName !== user.userName);

    this.followings               = updatedFollowings;
    this.homePage.tweets          = updatedHomePageTweets;
    this.homePage.retweets        = updatedHomePageRetweets;
  }

  retweet(id) {
    const [tweet] = 
      this.homePage.tweets.filter(tweet => tweet.id === id ) || 
      this.homePage.retweets.filter(retweet => retweet.id === id );

    this.retweets.push(tweet);
    this.profilePage.retweets.push(tweet);
    this.homePage.retweets.push(tweet);
  }

  undoRetweet(id) {
    const retweets            = this.retweets;
    const updatedRetweets     = retweets.filter(retweet => retweet.id !== id );
    
    this.retweets             = updatedRetweets; 
    this.profilePage.retweets  = updatedRetweets;
    this.homePage.retweets    = updatedRetweets;
  }

  like(id) {
    const [tweet] = 
      this.homePage.tweets.filter(tweet => tweet.id === id ) || 
      this.homePage.retweets.filter(retweet => retweet.id === id );

    this.likedTweets.push(tweet);
  }

  undoLike(id) {
    const tweets        = this.likedTweets;
    const updatedTweets = tweets.filter(tweet => tweet.id !== id);

    this.likedTweets    = updatedTweets;
  }
}

module.exports = User;