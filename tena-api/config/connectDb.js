const mongoose = require('mongoose');

mongoose.connect('mongodb://localhost/Tena',{useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;

db.on('err', () => console.error.bind(console, 'Connection Error!'));
db.once('open', () => console.log('Connected to database'));

module.exports = db;