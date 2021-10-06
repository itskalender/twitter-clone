const colors            = require('colors');
const User              = require('./user');
const { userDatabase }  = require('./database');

const kalender = new User(
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
  '3333',
  'user3'
);

userDatabase.save([kalender, kahtali, latif]);

kalender.tweet('Hi, this is my very first tweet!', 1); // Last item is id number.
kalender.tweet('Hi, this is my second tweet!', 2);
kalender.tweet('Hi, this is my third tweet!', 3);
kalender.tweet('Hi, this is my fourth tweet!', 4);
kalender.tweet('Hi, this is my fifth tweet!', 5);

kahtali.tweet('Hello, I\'m Kahtali!', 6);
kahtali.tweet('What a wonderful day!', 7);
kahtali.tweet('My tweets are exciting, not like Kalender\'s!', 8);

kalender.deleteTweet(5);

kalender.follow(kahtali);
kalender.follow(latif);

kalender.unfollow(latif);

kalender.retweet(6);

kalender.undoRetweet(9);

kalender.like(6);
kalender.like(8);

kalender.undoLike(8);

const ibrahim = new User(
  'İbrahim',
  'Tatlıses',
  'tatlisesibrahim',
  'tatlisesibrahim@gmail.com',
  '4444',
  'user4'
);

const hakki = new User(
  'Hakki',
  'Bulut',
  'buluthakki',
  'buluthakki@gmail.com',
  '5555',
  'user5'
);

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

function showTweets(users) {
  users.forEach(u => u.tweets.forEach(t => console.log(colors.yellow(t.content))));
}
