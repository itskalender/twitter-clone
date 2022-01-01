const mongoose  = require('mongoose');

async function connectDB() {
  const { DB_PROTOCOL, DB_HOST, DB_PORT, DB_NAME } = process.env;

  try {
    await mongoose.connect(`${DB_PROTOCOL}://${DB_HOST}:${DB_PORT}/${DB_NAME}`);
    console.log(`Database connected on port: ${DB_PORT}  ✅`);
  } 
  catch (e) {
    console.error(e);
  }
}

module.exports = connectDB;