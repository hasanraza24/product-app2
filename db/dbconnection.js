const config = require('../config/config');
var mongoose = require('mongoose');

// console.log('Mongo U', mongoUrl);

mongoose.connect(config.mongoUrl, { useNewUrlParser: true }, (err) => {
  console.log('error', err);
  console.log('Database connected');
});

mongoose.Promise = global.Promise;

module.exports = mongoose;