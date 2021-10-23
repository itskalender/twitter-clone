const colors          = require('colors/safe');
const { v4: uuidv4 }  = require('uuid');
const Retweet         = require('./retweet');

class User {
  constructor(
    id = uuidv4(),
    name,
    username,
    email,
    password,
    bio         = '',
    location    = '',
    webSite     = '',
    createdAt   = new Date(),
    profilePic  = '',
    tweets      = [],
    likedTweets = [],
    followings  = [],
    followers   = [],
    home        = [],
    ) {
    this.id           = id;
    this.name         = name;
    this.username     = username;
    this.email        = email;
    this.password     = password;
    this.bio          = bio;
    this.location     = location;
    this.webSite      = webSite;
    this.createdAt    = createdAt;
    this.profilePic   = profilePic;
    this.tweets       = tweets;
    this.likedTweets  = likedTweets;
    this.followings   = followings;
    this.followers    = followers;
    this.home         = home;
  }

  static create({
      id,
      name,
      username,
      email,
      password,
      bio,
      location,
      webSite,
      createdAt,
      profilePic,
      tweets,
      likedTweets,
      followings,
      followers,
      home
    }) {
    const user = new User(id, name, username, email, password, bio, location, webSite,createdAt, profilePic, tweets, likedTweets, followings, followers, home);
    
    return user;
  }

  tweet(tweet) {
    this.tweets.push(tweet);
    this.home.push(tweet);
    this.followers.forEach(f => f.home.push(tweet));

    console.log(`${colors.red(this.name)} tweeted "${colors.yellow(tweet.content)}".`)
  }

  deleteTweet(tweet) {
    const updatedTweets = this.tweets.filter(t => t.id !== tweet.id );
    const updatedHome   = this.home.filter(t => t.id !== tweet.id);

    this.tweets         = updatedTweets;
    this.home           = updatedHome;

    this.followers.forEach(f => {
      const updatedHome = f.home.filter(t => t.id !== tweet.id);
      f.home            = updatedHome;
    })
    
    console.log(`${colors.red(this.name)} deleted a tweet "${colors.yellow(tweet.content)}".`)
  }

  follow(user) {
    this.followings.push(user);
    this.home.push(...user.tweets); // You cannot add all the tweets of user. Use an algorithmn.
    user.followers.push(this);

    console.log(`${colors.red(this.name)} followed ${colors.red(user.name)}.`);
  }

  unfollow(user) {
    const updatedFollowings = this.followings.filter(u => u.id !== user.id);
    const updatedHome       = this.home.filter(t => t.author.id !== user.id);
    const updatedFollowers  = user.followers.filter(u => u.id !== this.id);

    this.followings   = updatedFollowings;
    this.home         = updatedHome;
    user.followers    = updatedFollowers;

    console.log(`${colors.red(this.name)} unfollowed ${colors.red(user.name)}.`);
  }

  retweet(originalTweet, content = '') {
    const retweet = new Retweet(this, content, originalTweet);

    this.tweets.push(retweet);
    this.home.push(retweet);

    originalTweet.retweets.push(retweet);

    console.log(`${colors.red(this.name)} retweeted "${colors.yellow(originalTweet.content)}"${content ? ` with a comment on it: ${colors.yellow(content)}.` : '.'}`)
  }
  
  undoRetweet(tweet) {
    const updatedTweets = this.tweets.filter(t => {
      if (t.originalTweet) {
        return t.originalTweet.id !== tweet.id 
      }
      else {
        return t.id !== tweet.id
      }
    });
    const updatedHome = this.home.filter(t => {
      if (t.originalTweet) {
        return t.originalTweet.id !== tweet.id 
      }
      else {
        return t.id !== tweet.id
      }
    });

    this.tweets = updatedTweets; 
    this.home   = updatedHome;

    this.followers.forEach(f => {
      const updatedHome = f.home.filter(t => t.id !== tweet.id)
      f.home = updatedHome;
    })

    console.log(`${colors.red(this.name)} deleted a retweet "${colors.yellow(tweet.content)}".`);
  }

  like(tweet) {
    this.likedTweets.push(tweet);
    tweet.likes.push(this);
    
    console.log(`${colors.red(this.name)} liked "${colors.yellow(tweet.content)}".`);
  }
  
  undoLike(tweet) {
    const updatedLikedTweets  = this.likedTweets.filter(t => t.id !== tweet.id);
    const updatedLikes        = tweet.likes.filter(u => u.id !== this.id);

    this.likedTweets  = updatedLikedTweets;
    tweet.likes       = updatedLikes;
    
    console.log(`${colors.red(this.name)} did undo like a tweet "${colors.yellow(tweet.content)}".`);
  }
}

module.exports = User;
