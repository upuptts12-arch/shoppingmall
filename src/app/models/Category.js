// models/Category.js
const mongoose = require('mongoose')

const CategorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    // 다른 필드 (예: description, slug 등)
  },
  { timestamps: true }
)

module.exports = mongoose.model('Category', CategorySchema)
