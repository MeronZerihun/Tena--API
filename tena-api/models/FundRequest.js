const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let requestSchema = new Schema({
    requestedAt: Date,
    age: Number,
    maritalStatus: String,
    description: String,
    photo: {data: Buffer, contentType: String},
    verificationFile: {data: Buffer, contentType: String},
    status: String,
    progress: Number,
    rateAmount: Number,
    patientId: {type: Schema.Types.ObjectId, ref: 'User'}
});

module.exports = mongoose.model('FundRequest', requestSchema);