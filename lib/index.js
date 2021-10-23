const colors            = require('colors/safe');
const { userDatabase }  = require('../database');

async function getUsers() {
  return (await userDatabase.load());
}

function printTweets(user){
  let tweets = '';
  user.tweets.forEach((t, i, arr) => tweets += `"${colors.cyan(t.content)}"${i === arr.length - 1 ? '.' : ', '}`);
  console.log(`${user.name}'s tweets are: ${tweets}'`)
};

function printUsernames(users){
  users.forEach(u => console.log(`${colors.red(u.name)}`));
}

module.exports = {
  getUsers,
  printTweets,
  printUsernames
}