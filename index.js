const express         = require('express');
const bodyParser      = require('body-parser');
const { userDatabase} = require('./database');
const { Tweet }       = require('./models');

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

  res.send('OK') // This will be the data property of the response.
})

app.post('/users/:userId/tweets', async (req, res) => {
  const { userId }  = req.params;
  const { content } = req.body;

  const user        = await userDatabase.find(userId);

  const tweet       = new Tweet(user, content);
  user.tweet(tweet);

  await userDatabase.update(user);

  res.send('OK');
})

app.listen(3000, () => {
  console.log('started listening on 3000');
})
