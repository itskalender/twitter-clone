const { userDatabase }  = require('./database');
const { 
  getUsers,
  printUsernames,
  printTweets 
}                       = require('./lib');

(async function init() {
  const users = await getUsers();
  printUsernames(users);

  const kalender = await userDatabase.findByUsername('toptaskalender');
  printTweets(kalender);
})()