const { Schema, model } = require('mongoose');
const bcrypt = require('bcrypt');

// import schema from product.js
const productSchema = require('./Product');
const travelSchema = require('./Travel');

const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [/.+@.+\..+/, 'Must use a valid email address'],
    },
    password: {
      type: String,
      required: true,
    },
    // set savedproducts to be an array of data that adheres to the productSchema
    savedProduct: [productSchema],
     // set savedtravels to be an array of data that adheres to the travelSchema
    savedTravel: [travelSchema],
  },
  // set this to use virtual below
  {
    toJSON: {
      virtuals: true,
    },
  }
);

// hash user password
userSchema.pre('save', async function (next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// custom method to compare and validate password for logging in
userSchema.methods.isCorrectPassword = async function (password) {
  return bcrypt.compare(password, this.password);
};

// when we query a user, we'll also get another field called `productCount` with the number of saved products we have
userSchema.virtual('productCount').get(function () {
  return this.savedProducts.length;
});

// when we query a user, we'll also get another field called `productCount` with the number of saved products we have
userSchema.virtual('travelCount').get(function () {
  return this.savedTravels.length;
});

const User = model('User', userSchema);

module.exports = User;
