const router          = require('express').Router();
const { userService } = require('../services');

router.get('', async  (_, res) => {
  const users = await userService.load();

  res.render('index', { users });
})

module.exports = router;