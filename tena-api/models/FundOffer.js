const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let fundOfferSchema = new Schema({
    offeredAt: Date,
    accountNumber: String,
    paymentOption: String,
    fundAmount: Number,
    providerId: {type: Schema.Types.ObjectId, ref: 'User'},
    requestId: {type: Schema.Types.ObjectId, ref: 'FundRequest'}
    
});

module.exports = mongoose.model('FundOffer', fundOfferSchema);

