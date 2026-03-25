const mongoose = require('mongoose')

const foundationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // URL to image
  category: { type: String }, // e.g., "Outreach", "Education", "Community"
  link: { type: String }, // Link to foundation website or more info
  order: { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Foundation', foundationSchema)