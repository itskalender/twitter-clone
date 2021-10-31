const router          = require('express').Router();
const { userDatabase} = require('../database');

router.get('', async  (_, res) => {
  const users = await userDatabase.load();

  res.render('index', { users });
})

module.exports = router;