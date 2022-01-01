const configure = require('./config');
const load      = require('./loaders');
const app       = require('./app');

configure();
load();

app.listen(process.env.APP_PORT, function startHandler() {
  console.log(`Server listening on port: ${process.env.APP_PORT}     ✅`);
});
