const colors            = require('colors');
const User              = require('./user');
const Tweet             = require('./tweet');
const { userDatabase }  = require('./database');

const kalender = new User(
  undefined,
  'Kalender',
  'Toptas',
  'toptaskalender',
  'toptaskalender@gmail.com',
  '1111'
);

const ozden = new User (
  undefined,
  'Ozden',
  'Kaynarca',
  'kaynarcaozden',
  'kaynarcaozden@gmail.com',
  '2222'
)

const ezgi = new User(
  undefined,
  'Ezgi',
  'Turkmen',
  'turkmenezgi',
  'turkmenezgi@gmail.com',
  '3333',
)

const tweet1 = new Tweet(kalender, 'Hi, this is my first tweet!');
const tweet2 = new Tweet(kalender, 'What a wonderful day to begin to code!');
kalender.tweet(tweet1);
kalender.tweet(tweet2);

kalender.deleteTweet(tweet2);

const tweet3 = new Tweet(ozden, 'Hi, this is Ozden, this\'s my first tweet ever!');

ozden.tweet(tweet3);

const tweet4 = new Tweet(ezgi, 'Hi, I\'m Ezgi :)');

ezgi.tweet(tweet4);

kalender.follow(ozden);
kalender.follow(ezgi);

kalender.unfollow(ezgi);

kalender.like(tweet3);
kalender.like(tweet4);

kalender.undoLike(tweet4);

kalender.retweet(tweet3);
kalender.retweet(tweet4, 'Yes, you are right!');

kalender.undoRetweet(tweet3);

// function getUsers() {
//   return userDatabase.load();
// }

// function printTweets(users){
//   users.forEach(u => u.tweets.forEach(t => console.log(colors.yellow(t.content))));
// };

// function printUsernames(users){
//   users.forEach(u => console.log(`${colors.red(u.firstName)}`));
// }