const express         = require('express');
const app             = express();

const { userDatabase} = require('./database')

app.set('view engine', 'pug');

app.get('/', async  (req, res) => {
  const users = await userDatabase.load();
  res.render('index', { users });
})

app.get('/users', (req, res) => {
  // console.log('req => ', req)
  res.send('Passengers');
})

app.listen(3000, () => {
  console.log('started listening on 3000');
})
