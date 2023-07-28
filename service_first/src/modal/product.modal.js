const mongoose = require("mongoose");

const product = mongoose.Schema({
  id: {
    type: String,
    required: true,
  },
  title: {
    type: String,
  },
  imgSrc: {
    type: String,
  },
  unitPrice: {
    type: String,
  },
});

module.exports = mongoose.model("products", product);
