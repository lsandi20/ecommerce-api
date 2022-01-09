const mongoose = require('mongoose')
let Comment = require('./comment')
let Image = require('./image')

const reviewSchema = new mongoose.Schema({
  user_id: String,
  product_id: String,
  rates: Number,
  comments: [Comment],
  images: [Image]
}, { timestamps: true })

module.exports = mongoose.model('Review', reviewSchema)