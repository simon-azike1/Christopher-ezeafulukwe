const BlogPost = require('../models/BlogPost')

// GET /api/blog  — all published posts
const getPosts = async (req, res) => {
  try {
    const { category, limit = 10, page = 1 } = req.query
    const filter = { published: true }
    if (category) filter.category = category

    const skip = (parseInt(page) - 1) * parseInt(limit)
    const total = await BlogPost.countDocuments(filter)
    const posts = await BlogPost.find(filter)
      .sort({ publishedAt: -1 })
      .skip(skip)
      .limit(parseInt(limit))
      .select('-content') // Exclude full content from list view

    res.json({
      success: true,
      total,
      page: parseInt(page),
      pages: Math.ceil(total / parseInt(limit)),
      data: posts,
    })
  } catch (err) {
    console.error('Blog list error:', err)
    res.status(500).json({ success: false, message: 'Server error.' })
  }
}

// GET /api/blog/:slug  — single post by slug
const getPostBySlug = async (req, res) => {
  try {
    const post = await BlogPost.findOne({ slug: req.params.slug, published: true })
    if (!post) return res.status(404).json({ success: false, message: 'Post not found.' })
    res.json({ success: true, data: post })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
}

// POST /api/blog  — create a new post (admin)
const createPost = async (req, res) => {
  try {
    const { title, category, excerpt, content, coverImage, readTime, published } = req.body
    console.log('=== CREATE POST DEBUG ===')
    console.log('Title:', title)
    console.log('Category:', category)
    console.log('Excerpt length:', excerpt?.length)
    console.log('Content length:', content?.length)
    console.log('Published:', published)
    console.log('========================')
    
    if (!title || !category || !excerpt || !content) {
      return res.status(400).json({ success: false, message: 'title, category, excerpt and content are required.' })
    }
    
    // Create post manually to avoid any pre-save hook issues
    const postData = { 
      title, 
      category, 
      excerpt, 
      content, 
      coverImage: coverImage || '', 
      readTime: readTime || '5 min read', 
      published: published || false,
      slug: title.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
    }
    
    console.log('Creating with data:', postData)
    const post = await BlogPost.create(postData)
    console.log('Post created, id:', post._id)
    res.status(201).json({ success: true, data: post })
  } catch (err) {
    console.error('=== CREATE POST ERROR ===')
    console.error(err)
    console.error('=========================')
    if (err.code === 11000) {
      return res.status(400).json({ success: false, message: 'A post with this title already exists.' })
    }
    res.status(500).json({ success: false, message: err.message || 'Server error.' })
  }
}

// PUT /api/blog/:id  — update post (admin)
const updatePost = async (req, res) => {
  try {
    const post = await BlogPost.findById(req.params.id)
    if (!post) return res.status(404).json({ success: false, message: 'Post not found.' })

    const fields = ['title', 'category', 'excerpt', 'content', 'coverImage', 'readTime', 'published']
    fields.forEach(f => { if (req.body[f] !== undefined) post[f] = req.body[f] })

    await post.save()
    res.json({ success: true, data: post })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
}

// DELETE /api/blog/:id  — delete post (admin)
const deletePost = async (req, res) => {
  try {
    const post = await BlogPost.findByIdAndDelete(req.params.id)
    if (!post) return res.status(404).json({ success: false, message: 'Post not found.' })
    res.json({ success: true, message: 'Post deleted.' })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
}

module.exports = { getPosts, getPostBySlug, createPost, updatePost, deletePost }
