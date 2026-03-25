// Simple in-memory rate limiter for contact form
// In production, replace with express-rate-limit + Redis
const requestCounts = new Map()

const rateLimiter = (maxRequests = 50, windowMs = 15 * 60 * 1000) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress
    const now = Date.now()
    const windowStart = now - windowMs

    // Clean old entries
    if (requestCounts.has(ip)) {
      const timestamps = requestCounts.get(ip).filter(t => t > windowStart)
      requestCounts.set(ip, timestamps)
    } else {
      requestCounts.set(ip, [])
    }

    const timestamps = requestCounts.get(ip)

    if (timestamps.length >= maxRequests) {
      return res.status(429).json({
        success: false,
        message: 'Too many requests. Please try again later.',
      })
    }

    timestamps.push(now)
    requestCounts.set(ip, timestamps)
    next()
  }
}

module.exports = rateLimiter
