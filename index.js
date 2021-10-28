const express   = require('express');
const app       = express();

app.get('/', (req, res) => {
  // console.log('req => ', req)
  res.send('Home page')
})

app.get('/users', (req, res) => {
  // console.log('req => ', req)
  res.send('Passengers')
})

app.listen(3000, () => {
  console.log('started listening on 3000');
})
