const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let requestSchema = new Schema({
    requestedAt: {type: Date, default: Date.now},
    age: {type: String, required: true},
    gender : {type: String, required: true},
    maritalStatus: {type: String, required: true},
    description: {type: String, required: true},
    photo: {data: Buffer, contentType: String, required: true},
    verificationFile: {data: Buffer, contentType: String, required: true},
    status: {type: String, default: 'accepted'},
    progress: {type: Number, default: 0},
    rateAmount: {type: Number, default: 0},
    patientId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('FundRequest', requestSchema);