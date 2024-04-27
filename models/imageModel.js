const mongoose = require("mongoose");

const imageSchema = new mongoose.Schema({
  filename: String,
  path: String,
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Product",
  },
});

const Image = mongoose.model("Image", imageSchema);

module.exports = { Image };
