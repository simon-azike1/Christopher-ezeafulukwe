const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const dotenv = require('dotenv')
const path = require('path')
const multer = require('multer')
const rateLimiter = require('./middleware/rateLimiter')

// Cloudinary setup
const cloudinary = require('cloudinary').v2
const { CloudinaryStorage } = require('multer-storage-cloudinary')

dotenv.config()

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

const app = express()
const PORT = process.env.PORT || 5000

// ─── Multer Setup for Image Uploads (Cloudinary) ───────────────────
// Use Cloudinary storage if credentials are provided, otherwise use local storage
let upload

if (process.env.CLOUDINARY_CLOUD_NAME && process.env.CLOUDINARY_API_KEY && process.env.CLOUDINARY_API_SECRET) {
  const cloudinaryStorage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {
      folder: 'ce-website',
      allowed_formats: ['jpg', 'jpeg', 'png', 'gif', 'webp'],
      transformation: [{ width: 1200, height: 1200, crop: 'limit' }]
    }
  })
  upload = multer({ 
    storage: cloudinaryStorage,
    limits: { fileSize: 5 * 1024 * 1024 } // 5MB limit
  })
} else {
  // Fallback to local storage if Cloudinary is not configured
  const storage = multer.diskStorage({
    destination: (req, file, cb) => {
      cb(null, path.join(__dirname, 'public', 'uploads'))
    },
    filename: (req, file, cb) => {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9)
      cb(null, uniqueSuffix + path.extname(file.originalname))
    }
  })
  upload = multer({ 
    storage,
    limits: { fileSize: 5 * 1024 * 1024 },
    fileFilter: (req, file, cb) => {
      const allowedTypes = /jpeg|jpg|png|gif|webp/
      const extname = allowedTypes.test(path.extname(file.originalname).toLowerCase())
      const mimetype = allowedTypes.test(file.mimetype)
      if (extname && mimetype) {
        return cb(null, true)
      }
      cb(new Error('Only image files are allowed!'))
    }
  })

  // Ensure upload directory exists
  const fs = require('fs')
  const uploadDir = path.join(__dirname, 'public', 'uploads')
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true })
  }
}

// ─── Middleware ────────────────────────────────────────────────
const clientURL = process.env.CLIENT_URL || 'https://christopher-ezeafulukwe.vercel.app';
app.use(cors({
  origin: [clientURL, 'http://localhost:5173', 'http://localhost:5174', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'https://christopher-ezeafulukwe.vercel.app'],
  credentials: true,
}))
app.use(express.json({ limit: '500kb' }))
app.use(express.urlencoded({ extended: true }))

// ─── Routes ───────────────────────────────────────────────────
// Upload route first to avoid conflicts
app.post('/api/upload', (req, res) => {
  upload.single('image')(req, res, (err) => {
    if (err) {
      return res.status(400).json({ success: false, message: err.message })
    }
    if (!req.file) {
      return res.status(400).json({ success: false, message: 'No file uploaded' })
    }
    
    // Determine the image URL based on storage type
    let imageUrl
    if (req.file.path) {
      // Cloudinary returns 'path' as the Cloudinary URL
      imageUrl = req.file.path
    } else {
      // Local storage returns filename, construct the URL
      const serverURL = process.env.SERVER_URL || 'https://christopher-ezeafulukwe.onrender.com';
      imageUrl = `${serverURL}/uploads/${req.file.filename}`
    }
    
    res.json({ success: true, data: { url: imageUrl } })
  })
})

app.use('/api/contact', rateLimiter(5, 15 * 60 * 1000), require('./routes/contact'))
app.use('/api/blog',    require('./routes/blog'))
app.use('/api/admin',   require('./routes/admin'))
app.use('/api/content', require('./routes/content'))

// Serve uploaded files with CORS headers
const serverURL = process.env.SERVER_URL || 'https://christopher-ezeafulukwe.onrender.com';
app.use('/uploads', (req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*')
  // Replace localhost URL with production URL in response
  const originalSend = res.send.bind(res)
  res.send = function(body) {
    if (typeof body === 'string' && body.includes('localhost:5000')) {
      body = body.replace(/http:\/\/localhost:5000/g, serverURL)
    }
    return originalSend(body)
  }
  next()
}, express.static(path.join(__dirname, 'public', 'uploads')))

// Health check
app.get('/api/health', (req, res) => {
  res.json({
    success: true,
    message: 'CE Personal Website API is running',
    timestamp: new Date().toISOString(),
  })
})

// 404 handler - only for API routes
app.use('/api', (req, res) => {
  res.status(404).json({ success: false, message: 'API route not found.' })
})

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled error:', err.stack)
  res.status(500).json({ success: false, message: 'Internal server error.' })
})

// ─── Database + Start ─────────────────────────────────────────
const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/ce_website')
    console.log('✅ MongoDB connected')

    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`)
      console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`)
    })
  } catch (err) {
    console.error('❌ Failed to connect to MongoDB:', err.message)
    process.exit(1)
  }
}

startServer()