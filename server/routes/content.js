const express = require('express')
const router = express.Router()
const adminAuth = require('../middleware/adminAuth')
const Project = require('../models/Project')
const Education = require('../models/Education')
const Foundation = require('../models/Foundation')

// ─── Projects ─────────────────────────────────────────────────
// GET /api/content/projects - Get all projects (public)
router.get('/projects', async (req, res) => {
  try {
    const projects = await Project.find().sort({ order: 1, createdAt: -1 })
    res.json({ success: true, data: projects })
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

// GET /api/content/projects/:id - Get single project
router.get('/projects/:id', async (req, res) => {
  try {
    const project = await Project.findById(req.params.id)
    if (!project) return res.status(404).json({ success: false, message: 'Not found.' })
    res.json({ success: true, data: project })
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

// POST /api/content/projects - Create project (admin)
router.post('/projects', adminAuth, async (req, res) => {
  try {
    const project = new Project(req.body)
    await project.save()
    res.status(201).json({ success: true, data: project })
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

// PUT /api/content/projects/:id - Update project (admin)
router.put('/projects/:id', adminAuth, async (req, res) => {
  try {
    const project = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!project) return res.status(404).json({ success: false, message: 'Not found.' })
    res.json({ success: true, data: project })
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

// DELETE /api/content/projects/:id - Delete project (admin)
router.delete('/projects/:id', adminAuth, async (req, res) => {
  try {
    const project = await Project.findByIdAndDelete(req.params.id)
    if (!project) return res.status(404).json({ success: false, message: 'Not found.' })
    res.json({ success: true, message: 'Deleted successfully.' })
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

// ─── Education ─────────────────────────────────────────────────
// GET /api/content/education - Get all education (public)
router.get('/education', async (req, res) => {
  try {
    const education = await Education.find().sort({ order: 1, createdAt: -1 })
    res.json({ success: true, data: education })
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

// GET /api/content/education/:id - Get single education
router.get('/education/:id', async (req, res) => {
  try {
    const education = await Education.findById(req.params.id)
    if (!education) return res.status(404).json({ success: false, message: 'Not found.' })
    res.json({ success: true, data: education })
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

// POST /api/content/education - Create education (admin)
router.post('/education', adminAuth, async (req, res) => {
  try {
    const education = new Education(req.body)
    await education.save()
    res.status(201).json({ success: true, data: education })
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

// PUT /api/content/education/:id - Update education (admin)
router.put('/education/:id', adminAuth, async (req, res) => {
  try {
    const education = await Education.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!education) return res.status(404).json({ success: false, message: 'Not found.' })
    res.json({ success: true, data: education })
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

// DELETE /api/content/education/:id - Delete education (admin)
router.delete('/education/:id', adminAuth, async (req, res) => {
  try {
    const education = await Education.findByIdAndDelete(req.params.id)
    if (!education) return res.status(404).json({ success: false, message: 'Not found.' })
    res.json({ success: true, message: 'Deleted successfully.' })
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

// ─── Foundation ─────────────────────────────────────────────────
// GET /api/content/foundation - Get all foundation entries (public)
router.get('/foundation', async (req, res) => {
  try {
    const foundation = await Foundation.find().sort({ order: 1, createdAt: -1 })
    res.json({ success: true, data: foundation })
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

// GET /api/content/foundation/:id - Get single foundation entry
router.get('/foundation/:id', async (req, res) => {
  try {
    const foundation = await Foundation.findById(req.params.id)
    if (!foundation) return res.status(404).json({ success: false, message: 'Not found.' })
    res.json({ success: true, data: foundation })
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

// POST /api/content/foundation - Create foundation entry (admin)
router.post('/foundation', adminAuth, async (req, res) => {
  try {
    const foundation = new Foundation(req.body)
    await foundation.save()
    res.status(201).json({ success: true, data: foundation })
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

// PUT /api/content/foundation/:id - Update foundation entry (admin)
router.put('/foundation/:id', adminAuth, async (req, res) => {
  try {
    const foundation = await Foundation.findByIdAndUpdate(req.params.id, req.body, { new: true })
    if (!foundation) return res.status(404).json({ success: false, message: 'Not found.' })
    res.json({ success: true, data: foundation })
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

// DELETE /api/content/foundation/:id - Delete foundation entry (admin)
router.delete('/foundation/:id', adminAuth, async (req, res) => {
  try {
    const foundation = await Foundation.findByIdAndDelete(req.params.id)
    if (!foundation) return res.status(404).json({ success: false, message: 'Not found.' })
    res.json({ success: true, message: 'Deleted successfully.' })
  } catch {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
})

module.exports = router