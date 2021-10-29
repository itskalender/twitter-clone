const express         = require('express');
const bodyParser      = require('body-parser');
const { userDatabase} = require('./database');

const app             = express();

app.set('view engine', 'pug');
app.use(bodyParser.json());

app.get('/', async  (_, res) => {
  const users = await userDatabase.load();
  res.render('index', { users });
})

app.get('/users', async (_, res) => {
  const users = await userDatabase.load();

  res.render('users', { users } );
})

app.post('/users', async (req, res) => {
  const user = await userDatabase.insert(req.body);

  res.send(user);
})

app.get('/users/:userId', async (req, res) => {
  const user = await userDatabase.findBy('id', req.params.userId);

  if ( !user ) {
    res.status(404).send('Cannot find user');
  }
  
  res.render('user', { user } );
})

app.delete('/users/:userId', async (req, res) => {
  const user = await userDatabase.find(req.params.userId);
  await userDatabase.remove(user);

  res.send(`${user.name} with the id of (${user.id}) was deleted.`) // This will be the data property of the response.
})

app.listen(3000, () => {
  console.log('started listening on 3000');
})
