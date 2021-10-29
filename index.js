const express         = require('express');
const app             = express();

const { userDatabase} = require('./database')

app.set('view engine', 'pug');

app.get('/', async  (req, res) => {
  const users = await userDatabase.load();
  res.render('index', { users });
})

app.get('/users', async (req, res) => {
  const users = await userDatabase.load();

  res.render('users', { users } )
})

app.get('/users/:userId', async (req, res) => {
  const user = await userDatabase.findBy('id', req.params.userId);

  if ( !user ) {
    res.status(404).send('Cannot find user');
  }
  
  res.render('user', { user } );
})

app.listen(3000, () => {
  console.log('started listening on 3000');
})
