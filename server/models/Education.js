const mongoose = require('mongoose')

const educationSchema = new mongoose.Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  field: { type: String },
  startYear: { type: String }, // e.g., "2015"
  endYear: { type: String },   // e.g., "2019" or "Present"
  description: { type: String },
  achievements: [{ type: String }],
  image: { type: String }, // URL to image
  type: { type: String, default: 'degree' }, // 'degree' or 'executive'
  order: { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Education', educationSchema)