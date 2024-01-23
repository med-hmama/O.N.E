const mongoose = require('mongoose');

const postSchema = new mongoose.Schema(
    {
        posterId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: "User",
            required: true
        },

        title: {
            type: String,
            required: true,
            min: 2,
            max: 30
        },

        message: {
            type: String,
            required: true,
            min: 2,
            max: 9999
        },

        type: {
            type: String,
            required: false,
            default: ""
        },

        image: {
            type: String
        },

        video: {
            type: String
        },

        comments: {
            type: [
                {
                    commenterId: {
                        type: mongoose.Schema.Types.ObjectId,
                        ref: "User"
                    },
                    text: String,
                    timestamp: Number
                }
            ],
            required: false,
        }

    },
    {
        timestamps: true,
    }
);

module.exports = mongoose.model('post', postSchema);