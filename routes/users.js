const router          = require('express').Router();
const { 
  userService,
  tweetService
}                     = require('../services');

router.get('/', async (_, res) => {
  const users = await userService.load();

  res.render('users', { users } );
  // res.send(users)
})

router.post('/', async (req, res) => {
  try {
    const user = await userService.insert(req.body);
    res.send(user);
  } catch (error) {
    res.send(error.message);    
  }
})


router.get('/:userId', async (req, res) => {
  const { userId } = req.params;

  const user = await userService.findById(userId);

  if ( !user ) {
    res.status(404).send('Cannot find user');
  }
  
  res.render('user', { user });
  // res.send(user);
})

router.delete('/:userId', async (req, res) => {
  const { userId } = req.params;

  await userService.deleteById(userId);

  res.send('OK');
})

router.patch('/:userId', async (req, res) => {
  const { userId }  = req.params;
  const object      = req.body;

  const user = await userService.update(userId, object);

  res.send(user);
})



router.post('/:userId/tweets', async (req, res) => {
  const { userId }  = req.params;
  const { body }    = req.body;

  const tweet = await tweetService.tweet(userId, body);

  res.send(tweet);
})

router.get('/:userId/tweets/:tweetId', async (req, res) => {
  const { tweetId } = req.params;

  const tweet = await tweetService.findById(tweetId);

  res.render('tweet', { tweet });
})

router.delete('/:userId/tweets/:tweetId', async function (req, res) {
  const { userId, tweetId } = req.params;

  await tweetService.deleteTweet(userId, tweetId);

  res.send('OK');
})


router.post('/:userId/followings/:otherUserId', async function (req, res) {
  const { userId, otherUserId } = req.params;

  await userService.follow(userId, otherUserId);

  res.send('OK');
})

// router.post('/:userId/followings/:otherUserId', async (req, res) => {
//   const { userId, otherUserId } = req.params;

//   const user      = await userService.find(userId);
//   const otherUser = await userService.find(otherUserId);
  
//   user.follow(otherUser);

//   await userService.update(user);
//   await userService.update(otherUser);

//   res.send('OK')
// })

// router.delete('/:userId/followings/:otherUserId', async (req, res) => {
//   const { userId, otherUserId } = req.params;

//   const user      = await userService.find(userId);
//   const otherUser = await userService.find(otherUserId);
  
//   user.unfollow(otherUser);

//   await userService.update(user);
//   await userService.update(otherUser);

//   res.send('OK') 
// })

// router.post('/:userId/retweets/:retweetId', async (req, res) => {
//   const { userId, retweetId } = req.params;
//   const { content }           = req.body;

//   const user          = await userService.find(userId);
//   const users         = await userService.load();
//   const originalTweet = users.flatMap(u => u.tweets).find(t => t.id === retweetId);

//   user.retweet(originalTweet, content);

//   await userService.update(user);

//   res.send('OK');
// })

// router.delete('/:userId/retweets/:retweetId', async (req, res) => { // Will be changed!
//   const { userId, retweetId } = req.params;

//   const users   = await userService.load();
//   const user    = await userService.find(userId);
//   const retweet = user.tweets(t => t.id === retweetId);

//   if ( !retweet ) {
//     res.status(404).send('Cannot find tweet');
//   }

//   user.unretweet(retweet);

//   await userService.update(user);
// })

module.exports = router;