const colors            = require('colors/safe');
const { userDatabase }  = require('../database');

function getUsers() {
  return userDatabase.load();
}

function printTweets(user){
  user.tweets.forEach(t => console.log(t.content));
};

function printUsernames(users){
  users.forEach(u => console.log(`${colors.red(u.name)}`));
}

module.exports = {
  getUsers,
  printTweets,
  printUsernames
}