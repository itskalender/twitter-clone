const express     = require('express');
const helmet      = require('helmet');
const {
  authRouter
}                 = require('./routes');
const {
  invalidEndpointHandler,
  errorHandler
}                 = require('./middlewares');

const app = express();

app.use(helmet());
app.use(express.json());

app.use('/', authRouter);

app.all('*', invalidEndpointHandler);
app.use(errorHandler);

module.exports = app;