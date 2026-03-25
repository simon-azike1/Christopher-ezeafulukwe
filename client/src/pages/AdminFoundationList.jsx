import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../util/api'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'

export default function AdminFoundationList() {
  const [foundation, setFoundation] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchFoundation()
  }, [])

  const fetchFoundation = async () => {
    try {
      const res = await api.get('/api/content/foundation')
      setFoundation(res.data.data || [])
    } catch (err) {
      setError('Failed to load foundation entries')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this entry?')) return
    try {
      await api.delete(`/api/content/foundation/${id}`)
      setFoundation(foundation.filter(f => f._id !== id))
    } catch (err) {
      alert('Failed to delete entry')
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="w-8 h-8 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
      </div>
    )
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <p className="font-sans text-gold text-xs tracking-[0.4em] uppercase mb-2">Content</p>
          <h1 className="font-display text-cream text-4xl font-light">Foundation</h1>
          <div className="w-10 h-px bg-gold/40 mt-4" />
        </div>
        <Link to="/admin/foundation/new"
          className="flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold hover:bg-gold/20 transition-colors">
          <FiPlus size={16} />
          <span className="font-sans text-sm">Add Foundation</span>
        </Link>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500/30 text-red-400 p-4 mb-6">
          {error}
        </div>
      )}

      {/* Foundation List */}
      {foundation.length === 0 ? (
        <div className="text-cream/50 text-center py-12">
          No foundation entries yet. Click "Add Foundation" to create one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {foundation.map((item, i) => (
            <motion.div
              key={item._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-navy border border-cream/5 hover:border-gold/20 overflow-hidden group"
            >
              {/* Image */}
              <div className="h-48 bg-cream/5 relative overflow-hidden">
                {item.image ? (
                  <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-cream/20">
                    No Image
                  </div>
                )}
              </div>

              {/* Content */}
              <div className="p-6">
                <div className="flex items-center gap-3 mb-3">
                  {item.category && (
                    <span className="px-2 py-0.5 bg-gold/10 text-gold/70 text-xs">{item.category}</span>
                  )}
                </div>
                <h3 className="font-display text-cream text-xl mb-2">{item.title}</h3>
                <p className="font-sans text-cream/50 text-sm line-clamp-3 mb-4">{item.description}</p>
                
                {item.link && (
                  <a href={item.link} target="_blank" rel="noreferrer"
                    className="text-gold text-sm hover:underline">
                    Learn more →
                  </a>
                )}

                {/* Actions */}
                <div className="flex items-center gap-2 pt-4 mt-4 border-t border-cream/5">
                  <Link to={`/admin/foundation/edit/${item._id}`}
                    className="p-2 text-cream/50 hover:text-gold transition-colors">
                    <FiEdit2 size={16} />
                  </Link>
                  <button onClick={() => handleDelete(item._id)}
                    className="p-2 text-cream/50 hover:text-red-400 transition-colors">
                    <FiTrash2 size={16} />
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}