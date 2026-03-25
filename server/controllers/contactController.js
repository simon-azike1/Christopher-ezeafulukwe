const Contact = require('../models/Contact')
const nodemailer = require('nodemailer')

// POST /api/contact
const submitContact = async (req, res) => {
  try {
    const { name, email, subject, message } = req.body

    // Validate fields
    if (!name || !email || !subject || !message) {
      return res.status(400).json({ success: false, message: 'All fields are required.' })
    }

    // Email format check
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return res.status(400).json({ success: false, message: 'Invalid email address.' })
    }

    // Save to DB
    const contact = await Contact.create({ name, email, subject, message })

    // Send email notification (optional — only fires if SMTP env vars are set)
    if (process.env.SMTP_HOST && process.env.SMTP_USER && process.env.SMTP_PASS) {
      const transporter = nodemailer.createTransport({
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT || 587,
        secure: false,
        auth: { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS },
      })

      await transporter.sendMail({
        from: `"CE Website" <${process.env.SMTP_USER}>`,
        to: process.env.NOTIFY_EMAIL || process.env.SMTP_USER,
        subject: `New Contact: ${subject}`,
        html: `
          <h2>New message from ${name}</h2>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Subject:</strong> ${subject}</p>
          <p><strong>Message:</strong><br/>${message.replace(/\n/g, '<br/>')}</p>
        `,
      })
    }

    res.status(201).json({
      success: true,
      message: 'Your message has been received. Thank you.',
      data: { id: contact._id },
    })
  } catch (err) {
    console.error('Contact error:', err)
    res.status(500).json({ success: false, message: 'Server error. Please try again later.' })
  }
}

// GET /api/contact  (admin — list all messages)
const getContacts = async (req, res) => {
  try {
    const contacts = await Contact.find().sort({ createdAt: -1 })
    res.json({ success: true, count: contacts.length, data: contacts })
  } catch (err) {
    res.status(500).json({ success: false, message: 'Server error.' })
  }
}

module.exports = { submitContact, getContacts }
