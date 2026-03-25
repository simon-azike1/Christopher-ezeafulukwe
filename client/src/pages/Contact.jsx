import { useState } from 'react'
import PageWrapper from '../components/ui/PageWrapper'
import { motion } from 'framer-motion'
import { FaLinkedin, FaEnvelope, FaBuilding } from 'react-icons/fa'
import api from '../util/api'
import { isValidEmail, validateForm } from '../util/validators'

export default function Contact() {
  const [form, setForm] = useState({ name: '', email: '', subject: '', message: '' })
  const [status, setStatus] = useState(null)
  const [loading, setLoading] = useState(false)

  const handleChange = e => setForm({ ...form, [e.target.name]: e.target.value })

  const handleSubmit = async e => {
    e.preventDefault()
    setLoading(true)
    try {
      await api.post('/api/contact', form)
      setStatus('success')
      setForm({ name: '', email: '', subject: '', message: '' })
    } catch {
      setStatus('error')
    } finally {
      setLoading(false)
    }
  }

  return (
    <PageWrapper>
      {/* ── Hero Header ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-navy pt-64 md:pt-72 pb-20 px-6 md:px-12 section-padding relative overflow-hidden"
      >
        {/* Decorative dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(#C9922A 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 mt-15">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ duration: 0.8 }}
            className="font-sans text-gold text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4"
          >
            Reach Out
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-cream text-4xl md:text-7xl font-light mb-6 leading-tight"
          >
            Contact
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-16 md:w-20 h-0.5"
            style={{ background: 'linear-gradient(to right, var(--color-gold), transparent)' }}
          />
        </div>
      </motion.div>

      {/* ── Main Content ──────────────────────────────────────── */}
      <section className="section-padding page-bg px-6 md:px-12">
        <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-16">
          {/* Info Section */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <p className="font-sans text-gold text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4 font-bold">Let's Connect</p>
            <h2 className="font-display text-3xl md:text-5xl font-light mb-6" style={{ color: 'var(--text-primary)' }}>Get in Touch</h2>
            <div className="w-16 h-0.5 bg-gold mb-8 opacity-50" />
            <p className="font-body text-sm md:text-base leading-relaxed mb-10" style={{ color: 'var(--text-muted)' }}>
              Whether you're interested in collaboration, media enquiries, speaking engagements, or foundation partnerships — Christopher welcomes meaningful conversations.
            </p>
            
            <div className="space-y-6">
              <div className="flex items-center gap-4">
                <div className="w-10 h-10 flex items-center justify-center rounded-none" style={{ backgroundColor: 'rgba(201,146,42,0.05)' }}>
                  <FaBuilding className="text-gold" />
                </div>
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>Organisation</p>
                  <p className="font-sans text-sm font-medium" style={{ color: 'var(--text-primary)' }}>Transcorp Energy Limited, Abuja, Nigeria</p>
                </div>
              </div>
              
              <a href="https://www.linkedin.com/in/christopher-ezeafulukwe-121450ba/" target="_blank" rel="noreferrer"
                className="flex items-center gap-4 group">
                <div className="w-10 h-10 flex items-center justify-center group-hover:bg-gold/10 transition-colors rounded-none" 
                  style={{ backgroundColor: 'rgba(201,146,42,0.05 )' }}>
                  <FaLinkedin className="text-gold" />
                </div>
                <div>
                  <p className="font-sans text-[10px] uppercase tracking-wider" style={{ color: 'var(--text-muted)', opacity: 0.5 }}>LinkedIn</p>
                  <p className="font-sans text-sm font-medium group-hover:text-gold transition-colors" style={{ color: 'var(--text-primary)' }}>@christopher-ezeafulukwe</p>
                </div>
              </a>
            </div>
          </motion.div>

          {/* Form Section */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }} 
            whileInView={{ opacity: 1, x: 0 }} 
            viewport={{ once: true }} 
            transition={{ delay: 0.3 }}
            className="p-8 md:p-10 rounded-none"
            style={{
              backgroundColor: 'var(--bg-card)',
              border: '1px solid var(--border-subtle)',
              boxShadow: '0 4px 24px rgba(11,31,58,0.04)'
            }}
          >
            <h3 className="font-display text-xl md:text-2xl font-semibold mb-8" style={{ color: 'var(--text-primary)' }}>Send a Message</h3>
            
            {status === 'success' && (
              <div className="bg-gold/10 border border-gold/30 text-gold font-sans text-xs md:text-sm p-4 mb-6 rounded-none">
                Thank you. Your message has been received.
              </div>
            )}
            {status === 'error' && (
              <div className="bg-red-900/20 border border-red-500/30 text-red-400 font-sans text-xs md:text-sm p-4 mb-6 rounded-none">
                Something went wrong. Please try again.
              </div>
            )}
            
            <form onSubmit={handleSubmit} className="space-y-5">
              {[
                ['name', 'Full Name', 'text'], 
                ['email', 'Email Address', 'email'], 
                ['subject', 'Subject', 'text']
              ].map(([name, label, type]) => (
                <div key={name}>
                  <label className="font-sans text-[10px] uppercase tracking-widest block mb-2 font-bold" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>{label}</label>
                  <input 
                    type={type} 
                    name={name} 
                    value={form[name]} 
                    onChange={handleChange} 
                    required
                    className="w-full px-4 py-3 font-sans text-sm focus:outline-none focus:border-gold transition-colors rounded-none" 
                    style={{ 
                      backgroundColor: 'rgba(11,31,58,0.2)', 
                      border: '1px solid var(--border-subtle)',
                      color: 'var(--text-primary)'
                    }}
                  />
                </div>
              ))}
              <div>
                <label className="font-sans text-[10px] uppercase tracking-widest block mb-2 font-bold" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>Message</label>
                <textarea 
                  name="message" 
                  rows="5" 
                  value={form.message} 
                  onChange={handleChange} 
                  required
                  className="w-full px-4 py-3 font-sans text-sm focus:outline-none focus:border-gold transition-colors rounded-none resize-none" 
                  style={{ 
                    backgroundColor: 'rgba(11,31,58,0.2)', 
                    border: '1px solid var(--border-subtle)',
                    color: 'var(--text-primary)'
                  }}
                />
              </div>
              <button 
                type="submit" 
                disabled={loading}
                className="w-full py-4 text-center disabled:opacity-60 font-sans text-xs md:text-sm font-bold tracking-widest uppercase transition-all rounded-none"
                style={{
                  backgroundColor: 'var(--color-gold)',
                  color: 'var(--color-navy)',
                  boxShadow: '0 4px 15px rgba(201,146,42,0.2)'
                }}
              >
                {loading ? 'Sending...' : 'Send Message'}
              </button>
            </form>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
