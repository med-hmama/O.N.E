const mongoose = require('mongoose'); 

const deskSchema = new mongoose.Schema({
    deskNumber: {
        type: Number,
        required: true,
        unique: true
    },

    telephone: {
        type: Number,
        required: true,
        min: 10000000,
        max: 99999999,
        unique: true
    },

    city: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    postalCode: {
        type: Number,
        required: true,
        min: 1000,
        max: 9999
    },
},

    {
        timestamps: true,
    });

module.exports = mongoose.model("Desk", deskSchema); 