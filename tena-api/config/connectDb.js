const mongoose = require('mongoose');
const values = require('../config/values');


mongoose.connect(values.MONGO_URL, {useNewUrlParser: true, useUnifiedTopology: true});
var db = mongoose.connection;



db.on('err', () => console.error.bind(console, 'Connection Error!'));
db.once('open', () => console.log('Connected to database'));



module.exports = db;