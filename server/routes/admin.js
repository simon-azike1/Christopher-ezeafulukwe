const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken')
const adminAuth = require('../middleware/adminAuth')
const BlogPost = require('../models/BlogPost')
const Contact = require('../models/Contact')

const JWT_SECRET = process.env.JWT_SECRET || 'ce_admin_secret_change_in_production'
const ADMIN_PASSWORD = process.env.ADMIN_PASSWORD || 'changeme123'

// POST /api/admin/login
router.post('/login', (req, res) => {
  const { password } = req.body
  if (!password || password !== ADMIN_PASSWORD) {
    return res.status(401).json({ success: false, message: 'Invalid credentials.' })
  }
  const token = jwt.sign({ role: 'admin' }, JWT_SECRET, { expiresIn: '7d' })
  res.json({ success: true, token })
})

// GET /api/admin/blog/all — all posts including drafts
router.get('/blog/all', adminAuth, async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 })
    res.json({ success: true, data: posts })
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

// GET /api/blog/by-id/:id — get post by ID for editor
router.get('/blog/by-id/:id', adminAuth, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id)
    if (!post) return res.status(404).json({ success: false, message: 'Not found.' })
    res.json({ success: true, data: post })
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

module.exports = router
