import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import api from '../util/api'
import { FiMail, FiX, FiChevronDown } from 'react-icons/fi'

export default function AdminMessages() {
  const [messages, setMessages] = useState([])
  const [loading, setLoading] = useState(true)
  const [selected, setSelected] = useState(null)

  useEffect(() => {
    const fetch = async () => {
      try {
        const res = await api.get('/api/contact')
        setMessages(res.data.data || [])
      } catch {
        // fallback
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  const formatDate = (d) => new Date(d).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit'
  })

  return (
    <div className="p-8">
      <div className="mb-10">
        <p className="font-sans text-gold text-xs tracking-[0.4em] uppercase mb-2">Inbox</p>
        <h1 className="font-display text-cream text-4xl font-light">Messages</h1>
        <div className="w-10 h-px bg-gold/40 mt-4" />
      </div>

      {loading ? (
        <p className="font-sans text-cream/30 text-sm">Loading messages...</p>
      ) : messages.length === 0 ? (
        <div className="bg-navy border border-cream/5 p-12 text-center">
          <FiMail size={24} className="text-cream/20 mx-auto mb-4" />
          <p className="font-display text-cream text-2xl font-light mb-2">No messages yet</p>
          <p className="font-sans text-cream/40 text-sm">Contact form submissions will appear here.</p>
        </div>
      ) : (
        <div className="space-y-2">
          {messages.map((msg, i) => (
            <motion.div key={msg._id || i} initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}>
              {/* Message row */}
              <button onClick={() => setSelected(selected?._id === msg._id ? null : msg)}
                className={`w-full text-left bg-navy border transition-colors px-5 py-4
                  ${selected?._id === msg._id ? 'border-gold/30' : 'border-cream/5 hover:border-cream/10'}`}>
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-4">
                    <div className="w-8 h-8 bg-gold/10 flex items-center justify-center shrink-0">
                      <span className="font-display text-gold text-sm font-semibold">
                        {msg.name?.charAt(0)?.toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="font-sans text-cream text-sm font-medium">{msg.name}</p>
                      <p className="font-sans text-cream/40 text-xs">{msg.email}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-6">
                    <p className="font-sans text-cream/60 text-sm hidden md:block">{msg.subject}</p>
                    <p className="font-sans text-cream/30 text-xs shrink-0">{formatDate(msg.createdAt)}</p>
                    <FiChevronDown size={14} className={`text-cream/30 transition-transform ${selected?._id === msg._id ? 'rotate-180' : ''}`} />
                  </div>
                </div>
              </button>

              {/* Expanded message */}
              <AnimatePresence>
                {selected?._id === msg._id && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }} transition={{ duration: 0.2 }}
                    className="overflow-hidden bg-navy border border-t-0 border-gold/20 px-5 py-5">
                    <div className="flex justify-between items-start mb-3">
                      <p className="font-sans text-gold text-xs tracking-widest uppercase">{msg.subject}</p>
                      <a href={`mailto:${msg.email}?subject=Re: ${msg.subject}`}
                        className="font-sans text-xs text-blue-400 hover:text-blue-300 transition-colors">
                        Reply via email ↗
                      </a>
                    </div>
                    <div className="w-8 h-px bg-gold/30 mb-4" />
                    <p className="font-body text-cream/70 text-sm leading-relaxed whitespace-pre-wrap">
                      {msg.message}
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}