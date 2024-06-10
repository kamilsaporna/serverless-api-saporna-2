const mongoose = require("mongoose");
const { Schema } = mongoose;

const authorSchema = new Schema({
  productType: {
    type: String,
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
  unit: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  }
});

module.exports = authorSchema;