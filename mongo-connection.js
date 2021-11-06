const mongoose = require('mongoose');

main().catch(err => console.log(err));

async function main() {
  await mongoose.connect('mongodb://localhost:27017/week-7');
  console.log('Connected successfully to MongoDB');
}