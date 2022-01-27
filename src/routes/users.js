const router  = require('express').Router();
const {
  getUser
}             = require('../controllers');

router.route('/:username')
  .get(
    getUser
  )

module.exports = router;