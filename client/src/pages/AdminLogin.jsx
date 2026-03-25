import { useState } from 'react'
import { useAuth } from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import { motion } from 'framer-motion'

export default function AdminLogin() {
  const { login } = useAuth()
  const navigate = useNavigate()
  const [password, setPassword] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setLoading(true)
    try {
      await login(password)
      navigate('/admin')
    } catch {
      setError('Invalid credentials. Access denied.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-navy flex items-center justify-center px-6"
      style={{ backgroundImage: 'repeating-linear-gradient(45deg,rgba(201,146,42,0.03) 0,rgba(201,146,42,0.03) 1px,transparent 0,transparent 50%)', backgroundSize: '20px 20px' }}>

      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }}
        className="w-full max-w-sm">

        {/* Logo */}
        <div className="text-center mb-12">
          <div className="w-16 h-16 border border-gold/30 flex items-center justify-center mx-auto mb-6">
            <span className="font-display text-gold text-2xl font-semibold">CE</span>
          </div>
          <p className="font-sans text-gold text-xs tracking-[0.4em] uppercase mb-1">Admin Portal</p>
          <h1 className="font-display text-cream text-3xl font-light">Secure Access</h1>
          <div className="w-10 h-px bg-gold/40 mx-auto mt-4" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-red-900/20 border border-red-500/30 text-red-400 font-sans text-sm p-3 text-center">
              {error}
            </motion.div>
          )}

          <div>
            <label className="font-sans text-xs uppercase tracking-widest text-cream/40 block mb-2">
              Admin Password
            </label>
            <input
              type="password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoFocus
              className="w-full bg-navy-light border border-cream/10 focus:border-gold px-4 py-3
                         font-sans text-sm text-cream placeholder-cream/20 outline-none transition-colors"
              placeholder="Enter password"
            />
          </div>

          <button type="submit" disabled={loading}
            className="w-full bg-gold hover:bg-gold-dark text-navy font-sans font-semibold
                       text-sm tracking-widest uppercase py-3 transition-colors disabled:opacity-50 mt-2">
            {loading ? 'Verifying...' : 'Enter Admin'}
          </button>
        </form>

        <p className="font-sans text-cream/20 text-xs text-center mt-8 tracking-wide">
          Restricted access — authorised personnel only
        </p>
      </motion.div>
    </div>
  )
}