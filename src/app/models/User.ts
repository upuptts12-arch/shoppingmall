import mongoose, { Schema, model, models } from 'mongoose'

const userSchema = new Schema({
  userId: String,
  email: String,
  name: String,
  password: String,
  phone: String,
  address: {
    zipcode: String,
    address1: String,
    address2: String,
  },
  bank: {
    holder: String,
    account: String,
  },
})

export default models.User || model('User', userSchema)
