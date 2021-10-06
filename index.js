const colors            = require('colors');
const User              = require('./user');
const { userDatabase }  = require('./database');

const kalender = new User(
  undefined,
  'Kalender',
  'Toptas',
  'toptaskalender',
  'toptaskalender@gmail.com',
  '1111'
);
const kahtali = new User(
  undefined,
  'Kahtali',
  'Mice',
  'micekahtali',
  'micekahtali@gmail.com',
  '2222'
);
const latif = new User(
  undefined,
  'Latif',
  'Dogan',
  'doganlatif',
  'doganlatif@gmail.com',
  '3333',
);

function printTweets(users){
  users.forEach(u => u.tweets.forEach(t => console.log(colors.yellow(t.content))));
};

function printUsernames(users){
  users.forEach(u => console.log(`${colors.red(u.firstName)}`));
};

userDatabase.save([kalender, kahtali, latif]);

// const users = userDatabase.load();
// printUsernames(users); // OK

// const kalender = userDatabase.findByName('Kalender');
// kalender.tweet('Hi, this is my very first tweet!', 1); // Last item is id number.
// kalender.tweet('Hi, this is my second tweet!', 2);
// kalender.tweet('Hi, this is my third tweet!', 3);
// kalender.tweet('Hi, this is my fourth tweet!', 4);
// kalender.tweet('Hi, this is my fifth tweet!', 5);

// kahtali.tweet('Hello, I\'m Kahtali!', 6);
// kahtali.tweet('What a wonderful day!', 7);
// kahtali.tweet('My tweets are exciting, not like Kalender\'s!', 8);

// kalender.deleteTweet(5);

// const kalender  = userDatabase.findBy('firstName', 'Kalender');
// const kahtali   = userDatabase.findBy('firstName', 'Kahtali');
// const latif     = userDatabase.findBy('firstName', 'Latif');

// kalender.follow(kahtali);
// kalender.follow(latif);

// kalender.unfollow(latif);
// kalender.unfollow(kahtali);


// kalender.retweet(6);

// kalender.undoRetweet(9);

// kalender.like(6);
// kalender.like(8);

// kalender.undoLike(8);

// const ibrahim = new User(
//   'user4',
//   'İbrahim',
//   'Tatlıses',
//   'tatlisesibrahim',
//   'tatlisesibrahim@gmail.com',
//   '4444'
// );

// const hakki = new User(
//   'user5',
//   'Hakki',
//   'Bulut',
//   'buluthakki',
//   'buluthakki@gmail.com',
//   '5555'
// );

// userDatabase.insert([ibrahim, hakki]);
// const users = userDatabase.load();
// console.log(users); // OK

// userDatabase.remove([ibrahim, hakki]);
// const users = userDatabase.load();
// console.log(users); // OK

// ibrahim.tweet('Do you wanna learn how to halay? Then check my profile!');
// const users = userDatabase.load();
// showTweets(users); // OK

// const kalender2 = userDatabase.findById('user1');
// kalender2.tweet('This is my new tweet!', 10);
// const users = userDatabase.load();
// showTweets(users); // OK