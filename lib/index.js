function getUsers() {
  return userDatabase.load();
}

function printTweets(users){
  users.forEach(u => u.tweets.forEach(t => console.log(colors.yellow(t.content))));
};

function printUsernames(users){
  users.forEach(u => console.log(`${colors.red(u.firstName)}`));
}

module.exports = {
  getUsers,
  printTweets,
  printUsernames
}