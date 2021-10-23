const { userDatabase }  = require('./database');
const { 
  getUsers,
  printUsernames,
  printTweets 
}                       = require('./lib');
const { Tweet }         = require('./models');

const kalender  = userDatabase.findByName('Kalender');

const tweet1 = new Tweet(kalender, 'Hi, being a member of Twitter is very cool!') 
kalender.tweet(tweet1);

userDatabase.update([kalender])

printTweets(kalender);