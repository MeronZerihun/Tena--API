const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let requestSchema = new Schema({
    requestedAt: {type: Date, default: Date.now},
    age: {type: String, required: true},
    gender : {type: String, required: true},
    maritalStatus: {type: String, required: true},
    description: {type: String, required: true},
    photo: {type: String, required: true},
    diagnosis: {type: String, required: true},
    verificationFile: {type: String, required: true},
    recoveryCost: {type: Number, required: true},
    status: {type: String, default: 'pending'},
    progress: {type: Number, default: 0},
    progressPercent: {type: Number, default: 0},
    rateAmount: {type: Number, default: 0},
    patientId: {type: Schema.Types.ObjectId, ref: 'User', required: true}
});

module.exports = mongoose.model('FundRequest', requestSchema);