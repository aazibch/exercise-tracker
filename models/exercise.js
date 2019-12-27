const mongoose = require('mongoose');

const exerciseSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    description: {
        type: String,
        minlength: 2,
        maxlength: 255,
        required: true
    },
    duration: {
        type: Number,
        min: 0.1,
        max: 500,
        required: true
    },
    date: {
        type: Date,
        default: () => {
            const date = new Date();
            date.setUTCHours(0, 0, 0, 0);
            return date;
        }
    }
});

const Exercise = mongoose.model('Exercise', exerciseSchema);

module.exports = Exercise;