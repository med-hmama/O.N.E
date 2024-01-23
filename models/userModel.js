const mongoose = require('mongoose');
const { isEmail } = require('validator');

const userSchema = new mongoose.Schema({
    pseudo: {
        type: String,
        required: true,
        min: 3,
        max: 255,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: true,
        min: 6,
        max: 1024
    },

    email: {
        type: String,
        required: true,
        min: 6,
        max: 255,
        validate: [isEmail],
        unique: true
    },

    firstName: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },

    name: {
        type: String,
        required: true,
        min: 3,
        max: 255
    },

    role: {
        type: String,
    },

    telephone: {
        type: Number,
        required: true,
        min: 10000000,
        max: 99999999
    },

    entrepriseId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Entreprise",
        required: true
    },

    deskId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Desk",
        required: true
    },

    activation: {
        type: Boolean,
        default: true

    },
},

    {
        timestamps: true,
    });

module.exports = mongoose.model("User", userSchema);