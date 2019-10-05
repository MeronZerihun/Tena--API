const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
        createdAt: {type: Date, default: Date.now}, 
        modifiedAt: {type: Date, default: Date.now},
        fullName: {type: String, required: true},
        phoneNumber: {type: String, required: true},
        email: {type: String, required: true},
        password: {type: String, required: true},
        role: {type: String, required: true}
    }
);

module.exports = mongoose.model('User', userSchema);