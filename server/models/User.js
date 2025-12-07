const mongoose = require('mongoose')

const userSchema = new mongoose.Schema(
  {
    userId: { type: String, required: true, unique: true },
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { type: String, required: true },

    phone: { type: String },
    address: {
      zipcode: String,
      address1: String,
      address2: String,
    },
    bank: {
      holder: String,
      account: String,
    },
  },
  { timestamps: true }
)

module.exports = mongoose.model('User', userSchema)
