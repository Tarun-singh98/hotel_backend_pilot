const mongoose = require("mongoose");

const menuItemSchema = new mongoose.Schema({
  name: {
    type: "string",
    required: true,
  },
  price: {
    type: String,
    required: true,
  },
  taste: {
    type: String,
    enum: ["sour", "sweet", "sour"],
  },
  is_drink: {
    type: Boolean,
    default: false,
  },
  ingredients: {
    type: [String],
    default: [],
  },
  num_sales: {
    type: Number,
    default: 0,
  },
});

const MenuItem = mongoose.model("MenuItem", menuItemSchema);
module.exports = MenuItem;
