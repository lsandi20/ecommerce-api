const mongoose = require('mongoose')

const commentSchema = new mongoose.Schema({
  user_id: String,
  message: String,
  comment_replies: [commentSchema]
}, { timestamps: true })

module.exports = mongoose.model('Comment', commentSchema)