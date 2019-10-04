const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
        createdAt: {type: Date, default: Date.now}, 
        modifiedAt: {type: Date, default: Date.now},
        fullName: String,
        phoneNumber: String,
        email: String,
        password: String,
        role: String
    }
);

module.exports = mongoose.model('User', userSchema);