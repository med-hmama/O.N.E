const mongoose = require('mongoose');


const entrepriseSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },

    commercialName: {
        type: String,
        required: true,
        trim: true,
        uppercase: true,
        unique: true
    },

    image: {
        type: String,
        required: false,
    },

    telephone: {
        type: Number,
        required: true,
        min: 10000000,
        max: 99999999,
        unique: true
    },

    fax: {
        type: Number,
        required: false,
        min: 10000000,
        max: 99999999,
        unique: true
    },

    webSite: {
        type: String,
        required: false,
        unique: true
    },

    city: {
        type: String,
        required: true
    },

    address: {
        type: String,
        required: true,
    },

    type: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },

    category: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },

    subCategory: {
        type: String,
        required: true,
        min: 2,
        max: 255
    },

    description: {
        type: String,
        required: false
    }
},

    {
        timestamps: true,
    });

module.exports = mongoose.model("Entreprise", entrepriseSchema);