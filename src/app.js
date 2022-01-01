const express         = require('express');
const helmet          = require('helmet');
const { authRouter }  = require('./routes');

const app = express();

app.use(helmet());
app.use(express.json());

app.use('/', authRouter);

module.exports = app;