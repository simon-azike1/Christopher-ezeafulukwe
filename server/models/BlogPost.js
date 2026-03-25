const mongoose = require('mongoose')
const slugify = require('slugify')

const blogPostSchema = new mongoose.Schema({
  title:      { type: String, required: true, trim: true },
  slug:       { type: String, unique: true },
  category:   { type: String, required: true, trim: true },
  excerpt:    { type: String, required: true, trim: true },
  content:    { type: String, required: true },
  coverImage: { type: String, default: '' },
  readTime:   { type: String, default: '5 min read' },
  published:  { type: Boolean, default: false },
  publishedAt:{ type: Date },
  createdAt:  { type: Date, default: Date.now },
  updatedAt:  { type: Date, default: Date.now },
})

// Auto-generate slug from title before saving
blogPostSchema.pre('save', async function () {
  if (this.isModified('title') && !this.slug) {
    this.slug = slugify(this.title, { lower: true, strict: true })
  }
  if (this.isModified()) {
    this.updatedAt = new Date()
  }
  if (this.published && !this.publishedAt) {
    this.publishedAt = new Date()
  }
})

module.exports = mongoose.model('BlogPost', blogPostSchema)
