const User        = require('./user');

const kalender  = new User('Kalender', 'Toptas', 'toptaskalender', 'toptaskalender@gmail.com', '1111');
const kahtali   = new User('Kahtali', 'Mice', 'micekahtali', 'micekahtali@gmail.com', '2222');
const latif     = new User('Latif', 'Dogan', 'doganlatif', 'doganlatif@gmail.com', '4444' );

kalender.tweet('Hi, this is my very firts tweet!', 1);
kalender.tweet('Hi, this is my second tweet!', 2);
kalender.tweet('Hi, this is my third tweet!', 3);
kalender.tweet('Hi, this is my fourth tweet!', 4);
kalender.tweet('Hi, this is my fifth tweet!', 5);

kahtali.tweet('Hello, I\'m Kahtali!', 6);
kahtali.tweet('What a wonderful day!', 7);
kahtali.tweet('My tweets are exciting, not like Kalender\'s :)', 8);

kalender.deleteTweet(5);

kalender.follow(kahtali);
kalender.follow(latif);

kalender.unfollow(latif);

kalender.retweet(6);
kalender.retweet(7);

kalender.undoRetweet(6);

kalender.like(6);
kalender.like(8);

kalender.undoLike(8);