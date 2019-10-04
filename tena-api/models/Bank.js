const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let bankSchema = new Schema({
    type: String,
    accountNumber: {type: String, unique: true},
    deposit: Number
});

module.exports = mongoose.model('Bank', bankSchema);