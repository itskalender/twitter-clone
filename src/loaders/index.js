const connectDB = require('./connect-db');

module.exports = function load() {
  connectDB();
}