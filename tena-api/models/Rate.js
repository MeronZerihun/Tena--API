const mongoose = require('mongoose');

var Schema = mongoose.Schema;

let rateSchema = new Schema({
    requestId: {type: Schema.Types.ObjectId, ref: 'FundRequest'},
    userId: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('Rate',rateSchema);