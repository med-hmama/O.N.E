const mongoose = require('mongoose');

const paymentSchema = new mongoose.Schema({
    entreprise: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Entreprise",
        required: true,
    },

    method: {
        type: String,
        required: true,
        min: 2,
        max: 20
    },

    duration: {
        type: String,
        required: true,

    },

    amount: {
        type: Number,
        required: true,
    },

    paymentDate: {
        type: Date,
        default: Date.now,
    },

    checkNumber: {
        type: Number
    },

    checkDate: {
        type: Date
    },
},

    {
        timestamps: true,
    });

module.exports = mongoose.model("Payment", paymentSchema);