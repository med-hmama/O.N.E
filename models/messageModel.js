const mongoose = require('mongoose');
const { isEmail } = require('validator');

const messageSchema = new mongoose.Schema({
    senderName: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },

    telephone: {
        type: Number,
        required: true,
        min: 10000000,
        max: 99999999,
    },

    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        validate: [isEmail],
    },

    message: {
        type: String,
        required: true,
        min: 2,
        max: 9999
    },
},

    {
        timestamps: true,
    });

module.exports = mongoose.model("Message", messageSchema); 