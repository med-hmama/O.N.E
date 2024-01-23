const mongoose = require('mongoose');

const eventSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 20
    },

    city: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true
    },

    entrepriseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Entreprise",
        required: true
    },

    date: {
        type: Date,
        required: true
    },

    description: {
        type: String,
        required: false
    },
},

    {
        timestamps: true,
    });

module.exports = mongoose.model("Event", eventSchema); 