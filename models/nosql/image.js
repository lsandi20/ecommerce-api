const mongoose = require('mongoose')

const imageSchema = new mongoose.Schema({
  name: String,
  type: String,
  url: String,
}, { timestamps: true })

module.exports = mongoose.model('Image', imageSchema)