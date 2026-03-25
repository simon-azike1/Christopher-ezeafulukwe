const mongoose = require('mongoose')

const projectSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  image: { type: String }, // URL to image
  technologies: [{ type: String }], // displayed as tags
  category: { type: String }, // e.g., "Energy", "Social Impact"
  status: { type: String, default: 'Active' }, // e.g., "Ongoing", "Active", "Completed"
  link: { type: String }, // Project link or more info
  featured: { type: Boolean, default: false },
  order: { type: Number, default: 0 },
}, { timestamps: true })

module.exports = mongoose.model('Project', projectSchema)