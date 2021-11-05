const { userService }  = require('./service');
const { 
  getUsers,
  printUsernames,
  printTweets 
}                       = require('./lib');

(async function init() {
  const users = await getUsers();
  printUsernames(users);

  const kalender = await userService.findByUsername('toptaskalender');
  printTweets(kalender);
})()