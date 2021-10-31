const express         = require('express');
const bodyParser      = require('body-parser');
const usersRouter     = require('./routes/users');
const indexRouter     = require('./routes/index');

const app             = express();

app.set('view engine', 'pug');
app.use(bodyParser.json());
app.use('/users', usersRouter);
app.use('/', indexRouter);

app.listen(3000, () => {
  console.log('started listening on 3000');
})
