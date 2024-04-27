const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      min: 3,
      max: 255,
      unique: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      min: 6,
      max: 1024,
    },

    email: {
      type: String,
      required: true,
      min: 6,
      max: 255,
      unique: true,
    },

    firstName: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },

    lastName: {
      type: String,
      required: true,
      min: 3,
      max: 255,
    },

    isAdmin: {
      type: Boolean,
      required: true,
      default: false,
    },

    phoneNumber: {
      type: Number,
      required: true,
      min: 10000000,
      max: 99999999,
    },

    entrepriseId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Entreprise",
      // required: true,
    },

    deskId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Desk",
      // required: true,
    },
  },

  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", userSchema);
