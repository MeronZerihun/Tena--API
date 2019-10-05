const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let bankSchema = new Schema({
    type: {type: String, required: true},
    accountNumber: {type: String, unique: true, required: true},
    deposit: {type: Number, required: true}
});

module.exports = mongoose.model('Bank', bankSchema);