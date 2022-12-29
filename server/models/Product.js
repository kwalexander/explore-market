const { Schema } = require('mongoose')

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedproducts` array in User.js
const productSchema = new Schema({
  // saved product id from products
  productID: {
    type: String,
    required: true
  },
  title: [
    {
      type: String,
      required: true
    }
  ],
  description: {
    type: String
  },
  productUPC: {
    type: String
  },
  forSale: {
    type: String
  },
  image: {
    type: String
  },
  link: {
    type: String
  }
})

module.exports = productSchema
