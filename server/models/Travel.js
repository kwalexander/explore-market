const { Schema } = require('mongoose');

// This is a subdocument schema, it won't become its own model but we'll use it as the schema for the User's `savedtravels` array in User.js
const travelSchema = new Schema({
  leavingFrom: {
    type: String,
    required: true,
  },
  goingTo: {
    type: String,
    required: true,
  },
  airWays: {
    type: String,
  },
  link: {
    type: String,
  },
  duration: {
    type: String,
  },
});

module.exports = travelSchema;
