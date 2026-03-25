const express = require('express')
const router = express.Router()
const adminAuth = require('../middleware/adminAuth')
const {
  getPosts,
  getPostBySlug,
  createPost,
  updatePost,
  deletePost,
} = require('../controllers/blogController')
const BlogPost = require('../models/BlogPost')

// ── Public ─────────────────────────────────────────
router.get('/',        getPosts)
router.get('/:slug',   getPostBySlug)

// ── Admin — require JWT ─────────────────────────────
router.post('/',          adminAuth, createPost)
router.put('/:id',        adminAuth, updatePost)
router.delete('/:id',     adminAuth, deletePost)

// Admin: get all posts including drafts
router.get('/admin/all',  adminAuth, async (req, res) => {
  try {
    const posts = await BlogPost.find().sort({ createdAt: -1 }).select('-content')
    res.json({ success: true, data: posts })
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

// Admin: get post by MongoDB _id for editor
router.get('/by-id/:id',  adminAuth, async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id)
    if (!post) return res.status(404).json({ success: false, message: 'Not found.' })
    res.json({ success: true, data: post })
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

module.exports = router
