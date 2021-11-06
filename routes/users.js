const router          = require('express').Router();
const { 
  userService,
  tweetService
}                     = require('../services');

router.get('/', async function (_, res) {
  const users = await userService.load();

  res.render('users', { users } );
})

router.post('/', async function (req, res) {
  try {
    const user = await userService.insert(req.body);
    res.send(user);
  } catch (error) {
    res.send(error.message);    
  }
})


router.get('/:userId', async function (req, res) {
  const { userId } = req.params;

  const user = await userService.findById(userId);

  if ( !user ) {
    res.status(404).send('Cannot find user');
  }
  
  res.render('user', { user });
  // res.send(user);
})

router.delete('/:userId', async function (req, res) {
  const { userId } = req.params;

  await userService.deleteById(userId);

  res.send('OK');
})

router.patch('/:userId', async function (req, res) {
  const { userId }  = req.params;
  const object      = req.body;

  const user = await userService.update(userId, object);

  res.send(user);
})



router.post('/:userId/tweets', async function (req, res) {
  const { userId }  = req.params;
  const { body }    = req.body;

  const tweet = await tweetService.tweet(userId, body);

  res.send(tweet);
})

router.get('/:userId/tweets/:tweetId', async function (req, res) {
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

router.delete('/:userId/followings/:otherUserId', async function (req, res) {
  const { userId, otherUserId } = req.params;

  await userService.unfollow(userId, otherUserId);

  res.send('OK');
})


router.post('/:userId/likes/:tweetId', async function (req, res) {
  const { userId, tweetId } = req.params;

  await tweetService.like(userId, tweetId);

  res.send('OK');
})

router.delete('/:userId/likes/:tweetId', async function (req, res) {
  const { userId, tweetId } = req.params;

  await tweetService.unlike(userId, tweetId);

  res.send('OK')
})

router.post('/:userId/retweets', async function (req, res) {
  const { userId }                = req.params;
  const { originalTweetId, body } = req.body;

  const tweet = await tweetService.retweet(userId, originalTweetId, body);

  res.send(tweet);
})

module.exports = router;