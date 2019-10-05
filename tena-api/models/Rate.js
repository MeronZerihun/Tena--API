const mongoose = require('mongoose');

var Schema = mongoose.Schema;

let rateSchema = new Schema({
    requestId: {type: Schema.Types.ObjectId, ref: 'FundRequest',required: true},
    userId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('Rate',rateSchema);