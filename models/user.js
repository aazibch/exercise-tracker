const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    username: {
        type: String,
        minlength: 3,
        maxlength: 100,
        required: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = User;