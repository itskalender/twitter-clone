const colors  = require('colors');
const db      = require('./database');
const User    = require('./user');

const kalender  = new User(
  'Kalender',
  'Toptas',
  'toptaskalender',
  'toptaskalender@gmail.com',
  '1111',
  'user1'
);
const kahtali = new User(
  'Kahtali',
  'Mice',
  'micekahtali',
  'micekahtali@gmail.com',
  '2222',
  'user2'
);
const latif = new User(
  'Latif',
  'Dogan',
  'doganlatif',
  'doganlatif@gmail.com',
  '4444',
  'user3'
);

// db.save('users', [kalender, kahtali, latif]);

// kalender.tweet('Hi, this is my very first tweet!', 1); // Last item is id number.
// kalender.tweet('Hi, this is my second tweet!', 2);
// kalender.tweet('Hi, this is my third tweet!', 3);
// kalender.tweet('Hi, this is my fourth tweet!', 4);
// kalender.tweet('Hi, this is my fifth tweet!', 5);

// kahtali.tweet('Hello, I\'m Kahtali!', 6);
// kahtali.tweet('What a wonderful day!', 7);
// kahtali.tweet('My tweets are exciting, not like Kalender\'s!', 8);

kalender.deleteTweet(5);

kalender.follow('user2'); // to point unique user, I hardcoded these ids
kalender.follow('user3');

kalender.unfollow('user3');

// kalender.retweet(6);

// kalender.undoRetweet(9);

// kalender.like(6);
// kalender.like(8);

// kalender.undoLike(8);

// @@@@@@@@@@@@@@@@@@@@@@@@@@

// const ibrahim = new User('İbrahim', 'Tatlıses', 'tatlisesibrahim', 'tatlisesibrahim@gmail.com', 4444, 'user4');
// ibrahim.tweet('Do you wanna learn how to halay? Then check my profile!');
// const hakki   = new User('Hakkı', 'Bulut', 'buluthakki', 'buluthakki@gmail.com', 5555, 'user5');

// db.insert('users', ibrahim);
// db.remove('users', 'tatlisesibrahim');


const users = db.load('users');
// console.log(users);

// function showTweets(users) {
//   users.forEach(u => u.tweets.forEach(t => console.log(colors.yellow(t.content))));
// }

// showTweets(users);