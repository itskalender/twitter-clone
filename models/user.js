const mongoose      = require('mongoose');
const autopopulate  = require('mongoose-autopopulate')

const userSchema = mongoose.Schema({
  name        : { type: String, required: true },
  username    : { type: String, required: true, unique: true },
  email       : { type: String, required: true, unique : true },
  password    : { type: String, required: true },
  bio         : String,
  location    : String,
  webSite     : String,
  profilPic   : String,
  tweets      : [
    {
      type  : mongoose.Schema.Types.ObjectId,
      ref   : 'Tweet',
      autopopulate: { maxDepth: 1 }
    }
  ],
  likedTweets : [],
  followings  : [],
  followers   : [],
  home        : [],
}, { timestamps: true })

userSchema.plugin(autopopulate);

module.exports = mongoose.model('User', userSchema);


// class User {
//   constructor(
//     id = uuidv4(),
//     name,
//     username,
//     email,
//     password,
//     bio         = '',
//     location    = '',
//     webSite     = '',
//     createdAt   = new Date(),
//     profilePic  = '',
//     tweets      = [],
//     likedTweets = [],
//     followings  = [],
//     followers   = [],
//     home        = [],
//     ) {
//     this.id           = id;
//     this.name         = name;
//     this.username     = username;
//     this.email        = email;
//     this.password     = password;
//     this.bio          = bio;
//     this.location     = location;
//     this.webSite      = webSite;
//     this.createdAt    = createdAt;
//     this.profilePic   = profilePic;
//     this.tweets       = tweets;
//     this.likedTweets  = likedTweets;
//     this.followings   = followings;
//     this.followers    = followers;
//     this.home         = home;
//   }

//   static create({
//       id,
//       name,
//       username,
//       email,
//       password,
//       bio,
//       location,
//       webSite,
//       createdAt,
//       profilePic,
//       tweets,
//       likedTweets,
//       followings,
//       followers,
//       home
//     }) {
//     const user = new User(id, name, username, email, password, bio, location, webSite,createdAt, profilePic, tweets, likedTweets, followings, followers, home);
    
//     return user;
//   }

//   tweet(tweet) {
//     this.tweets.push(tweet);
//     this.home.push(tweet);
//     this.followers.forEach(f => f.home.push(tweet));

//     console.log(`${colors.red(this.name)} tweeted "${colors.yellow(tweet.content)}".`)
//   }

//   deleteTweet(tweet) {
//     const hasDeleted = this.tweets.find(t => t.id === tweet.id) === undefined ? true : false;

//     if (hasDeleted) {
//       console.log(`You've already deleted "${colors.yellow(tweet.content)}" from your tweets.`)
//       return;
//     }

//     const updatedTweets = this.tweets.filter(t => t.id !== tweet.id );
//     const updatedHome   = this.home.filter(t => t.id !== tweet.id);

//     this.tweets         = updatedTweets;
//     this.home           = updatedHome;

//     this.followers.forEach(f => {
//       const updatedHome = f.home.filter(t => t.id !== tweet.id);
//       f.home            = updatedHome;
//     })
    
//     console.log(`${colors.red(this.name)} deleted a tweet "${colors.yellow(tweet.content)}".`)
//   }

//   follow(user) {
//     const hasFollowed = this.followings.find(u => u.id === user.id) !== undefined ? true : false;

//     if (hasFollowed) {
//       console.log(`You've already followed ${colors.red(user.name)}.`);
//       return;
//     }

//     this.followings.push(user);
//     this.home.push(...user.tweets); // You cannot add all the tweets of user. Use an algorithmn.
//     user.followers.push(this);

//     console.log(`${colors.red(this.name)} followed ${colors.red(user.name)}.`);
//   }

//   unfollow(user) {
//     const hasUnfollowed = this.followings.find(u => u.id === user.id) === undefined ? true : false;

//     if (hasUnfollowed) {
//       console.log(`You've already unfollowed ${colors.red(user.name)}.`);
//       return;
//     }

//     const updatedFollowings = this.followings.filter(u => u.id !== user.id);
//     const updatedHome       = this.home.filter(t => t.author.id !== user.id);
//     const updatedFollowers  = user.followers.filter(u => u.id !== this.id);

//     this.followings   = updatedFollowings;
//     this.home         = updatedHome;
//     user.followers    = updatedFollowers;

//     console.log(`${colors.red(this.name)} unfollowed ${colors.red(user.name)}.`);
//   }

//   retweet(originalTweet, content = '') {
//     const retweets      = this.tweets.filter(t => t.originalTweet);
//     const hasRetweeted  = retweets.find(t => t.originalTweet.id === originalTweet.id) !== undefined ? true : false;

//     if (hasRetweeted) {
//       console.log(`You've already retweeted "${colors.yellow(originalTweet.content)}"${content ? ` with a comment on it: ${colors.yellow(content)}.` : '.'}`);
//       return;
//     }

//     const retweet = new Retweet(this, content, originalTweet);

//     this.tweets.push(retweet);
//     this.home.push(retweet);

//     originalTweet.retweets.push(retweet);

//     console.log(`${colors.red(this.name)} retweeted "${colors.yellow(originalTweet.content)}"${content ? ` with a comment on it: ${colors.yellow(content)}.` : '.'}`)
//   }
  
//   unretweet(retweet) {
//     const retweets        = this.tweets.filter(t => t.originalTweet);
//     const hasUnretweeted  = retweets.find(t => t.originalTweet.id === retweet.id) === undefined ? true : false;

//     if (hasUnretweeted) {
//       console.log(`You've already unretweeted "${colors.yellow(retweet.content)}".`);
//       return;
//     }

//     const updatedTweets = this.tweets.filter(t => {
//       if (t.originalTweet) {
//         return t.originalTweet.id !== retweet.id 
//       }
//       return true;
//     });
//     const updatedHome = this.home.filter(t => {
//       if (t.originalTweet) {
//         return t.originalTweet.id !== retweet.id 
//       }
//       return true
//     });

//     this.tweets = updatedTweets; 
//     this.home   = updatedHome;

//     /* BAD CODE */
//     const unretweetedTweet = retweet.retweets.find(t => t.author.id === this.id)
//     this.followers.forEach(f => {
//       const updatedHome = f.home.filter(t => t.id !== unretweetedTweet )
//       f.home = updatedHome;
//     })

//     console.log(`${colors.red(this.name)} unretweeted "${colors.yellow(retweet.content)}".`);
//   }

//   like(tweet) {
//     const hasLiked = this.likedTweets.find(t => t.id === tweet.id) !== undefined ? true : false;

//     if (hasLiked) {
//       console.log(`You've already liked "${colors.yellow(tweet.content)}".`);
//       return;
//     }

//     this.likedTweets.push(tweet);
//     tweet.likes.push(this);
    
//     console.log(`${colors.red(this.name)} liked "${colors.yellow(tweet.content)}".`);
//   }
  
//   unlike(tweet) {
//     const hasUnliked = this.likedTweets.find(t => t.id === tweet.id) === undefined ? true : false;

//     if (hasUnliked) {
//       console.log(`You've already unliked "${colors.yellow(tweet.content)}".`);
//       return;
//     }

//     const updatedLikedTweets  = this.likedTweets.filter(t => t.id !== tweet.id);
//     const updatedLikes        = tweet.likes.filter(u => u.id !== this.id);

//     this.likedTweets  = updatedLikedTweets;
//     tweet.likes       = updatedLikes;
    
//     console.log(`${colors.red(this.name)} unliked "${colors.yellow(tweet.content)}".`);
//   }
// }

// module.exports = User;
