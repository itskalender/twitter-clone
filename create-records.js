const { User, Tweet }   = require('./models');
const { userDatabase }  = require('./database');

/* Creating Users */

const kalender = User.create({
  name      : 'Kalender',
  username  : 'toptaskalender',
  email     : 'toptaskalender@gmail.com',
  password  : '1111'
});

const ozden = User.create({
  name      : 'Ozden',
  username  : 'kaynarcaozden',
  email     : 'kaynarcaozden@gmail.com',
  password  : '2222'
})

const ezgi = User.create({
  name      : 'Ezgi',
  username  : 'turkmenezgi',
  email     : 'turkmenezgi@gmail.com',
  password  : '3333'
})

/* Creating Actions */

const tweet1 = new Tweet(kalender, 'Hi, this is my first tweet!');
const tweet2 = new Tweet(kalender, 'What a wonderful day to begin to code!');

kalender.tweet(tweet1);

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

kalender.unlike(tweet4);

kalender.retweet(tweet3);
kalender.retweet(tweet4, 'Yes, you are right!');

kalender.unretweet(tweet3);

/* Saving Users */

userDatabase.save([kalender, ozden, ezgi]);