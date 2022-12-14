const mongoose = require("mongoose");

const productSchema = mongoose.Schema({
  product_seller:{
    type: String,
    required: true
  },

  name: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    default: "",
  },

  image: {
    type: String,
    default: "",
  },

  images: [{
      type: String,
  }],

  brand: {
    type: String,
    default: "",
  },

  price: {
    type: Number,
    default: 0,
  },

  category: {
    // need to pass the id always
    type: mongoose.Schema.Types.ObjectId,
    // To connect it to category schema
    ref: "Category",
    required: true,
  },

  stock_quantity: {
    type: Number,
    required: true,
    min: 0,
    max: 255,
  },

  isFeatured: {
    // to show in the homepage as feature home products
    type: Boolean,
    default: false,
  },

  dateCreated: {
    type: Date,
    default: Date.now(),
  },
});

exports.Product = mongoose.model("Product", productSchema);