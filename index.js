const { userDatabase } = require('./database');

const kalender  = userDatabase.findByName('Kalender');
const ozden     = userDatabase.findBy('username', 'kaynarcaozden') 
