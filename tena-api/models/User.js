const mongoose = require('mongoose');

let Schema = mongoose.Schema;

let userSchema = new Schema({
        fullName: {type: String, required: true},
        phoneNo: {type: String, required: true},
        email: {type: String, required: true, unique: true},
        password: {type: String, required: true},
        role: {type: String, required: true},
        status: {type: String, default: 'Active'}
    },  {
	timestamps: {createdAt: 'created_at', modifiedAt: 'modified_at'}
});

module.exports = mongoose.model('User', userSchema);