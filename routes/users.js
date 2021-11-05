const router          = require('express').Router();
const { 
  userDatabase,
  tweetDatabase
}                     = require('../database');

router.get('/', async (_, res) => {
  const users = await userDatabase.load();

  res.render('users', { users } );
})

router.post('/', async (req, res) => {
  try {
    const user = await userDatabase.insert(req.body);
    res.send(user);
  } catch (error) {
    res.send(error.message);    
  }
})

router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  const user = await userDatabase.findById(userId);

  if ( !user ) {
    res.status(404).send('Cannot find user');
  }
  
  res.render('user', { user });
})

router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;

  await userDatabase.delete(userId);

  res.send('OK');
})

router.patch('/:userId', async (req, res) => {
  const { userId }  = req.params;
  const object      = req.body;

  await userDatabase.update(userId, object);

  res.send('OK');
})

router.post('/:userId/tweets', async (req, res) => {
  const { userId }  = req.params;
  const { body }    = req.body;

  const tweet = await tweetDatabase.tweet(userId, body);

  res.send(tweet);
})

router.get('/:userId/tweets/:tweetId', async (req, res) => {
  const { tweetId } = req.params;

  const tweet = await tweetDatabase.findById(tweetId);

  res.render('tweet', { tweet });
  // res.send(tweet);
})

// router.delete('/:userId/tweets/:tweetId', async (req, res) => {
//   const { userId, tweetId } = req.params;

//   const user  = await userDatabase.find(userId);
//   const tweet = user.tweets.find(t => t.id === tweetId); // Should I make a database for tweets separately?

//   if ( !tweet ) {
//     res.status(404).send('Cannot find tweet');
//   }

//   user.deleteTweet(tweet);

//   await userDatabase.update(user);

//   res.send('OK');
// })

// router.post('/:userId/followings/:otherUserId', async (req, res) => {
//   const { userId, otherUserId } = req.params;

//   const user      = await userDatabase.find(userId);
//   const otherUser = await userDatabase.find(otherUserId);
  
//   user.follow(otherUser);

//   await userDatabase.update(user);
//   await userDatabase.update(otherUser);

//   res.send('OK')
// })

// router.delete('/:userId/followings/:otherUserId', async (req, res) => {
//   const { userId, otherUserId } = req.params;

//   const user      = await userDatabase.find(userId);
//   const otherUser = await userDatabase.find(otherUserId);
  
//   user.unfollow(otherUser);

//   await userDatabase.update(user);
//   await userDatabase.update(otherUser);

//   res.send('OK') 
// })

// router.post('/:userId/retweets/:retweetId', async (req, res) => {
//   const { userId, retweetId } = req.params;
//   const { content }           = req.body;

//   const user          = await userDatabase.find(userId);
//   const users         = await userDatabase.load();
//   const originalTweet = users.flatMap(u => u.tweets).find(t => t.id === retweetId);

//   user.retweet(originalTweet, content);

//   await userDatabase.update(user);

//   res.send('OK');
// })

// router.delete('/:userId/retweets/:retweetId', async (req, res) => { // Will be changed!
//   const { userId, retweetId } = req.params;

//   const users   = await userDatabase.load();
//   const user    = await userDatabase.find(userId);
//   const retweet = user.tweets(t => t.id === retweetId);

//   if ( !retweet ) {
//     res.status(404).send('Cannot find tweet');
//   }

//   user.unretweet(retweet);

//   await userDatabase.update(user);
// })

module.exports = router;