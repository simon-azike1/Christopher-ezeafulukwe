const express = require('express')
const router = express.Router()
const { submitContact, getContacts } = require('../controllers/contactController')

// Public
router.post('/', submitContact)

// Admin (protect with auth middleware in production)
router.get('/', getContacts)

module.exports = router
