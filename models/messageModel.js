const mongoose = require("mongoose");

const messageSchema = new mongoose.Schema(
  {
    senderName: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },

    phoneNumber: {
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
    },

    message: {
      type: String,
      required: true,
      min: 2,
      max: 9999,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Message", messageSchema);
