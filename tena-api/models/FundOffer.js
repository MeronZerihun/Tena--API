const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let fundOfferSchema = new Schema({
    offeredAt: {type: Date, default: Date.now()},
    accountNumber: {type: String, required: true},
    paymentOption: {type: String, required: true},
    fundAmount: {type: Number, required: true},
    providerId: {type: Schema.Types.ObjectId, ref: 'User', required: true},
    requestId: {type: Schema.Types.ObjectId, ref: 'FundRequest', required: true}
    
});

module.exports = mongoose.model('FundOffer', fundOfferSchema);

