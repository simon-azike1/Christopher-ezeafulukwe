import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../util/api'
import { useTheme } from '../context/ThemeContext'
import { FiPlus, FiEdit2, FiTrash2 } from 'react-icons/fi'

export default function AdminEducationList() {
  const { dark } = useTheme()
  const [education, setEducation] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchEducation()
  }, [])

  const fetchEducation = async () => {
    try {
      const res = await api.get('/api/content/education')
      setEducation(res.data.data || [])
    } catch (err) {
      setError('Failed to load education')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this education entry?')) return
    try {
      await api.delete(`/api/content/education/${id}`)
      setEducation(education.filter(e => e._id !== id))
    } catch (err) {
      alert('Failed to delete education')
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
          <h1 className="font-display text-cream text-4xl font-light">Education</h1>
          <div className="w-10 h-px bg-gold/40 mt-4" />
        </div>
        <Link to="/admin/education/new"
          className="flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold hover:bg-gold/20 transition-colors">
          <FiPlus size={16} />
          <span className="font-sans text-sm">Add Education</span>
        </Link>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500/30 text-red-400 p-4 mb-6">
          {error}
        </div>
      )}

      {/* Education List */}
      {education.length === 0 ? (
        <div className="text-cream/50 text-center py-12">
          No education entries yet. Click "Add Education" to create one.
        </div>
      ) : (
        <div className="space-y-4">
          {education.map((edu, i) => (
            <motion.div
              key={edu._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-navy border border-cream/5 hover:border-gold/20 p-6 transition-colors"
            >
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center gap-3 mb-2">
                    <h3 className="font-display text-cream text-xl">{edu.institution}</h3>
                    <span className="px-2 py-0.5 bg-gold/10 text-gold/70 text-sm">
                      {edu.startYear} - {edu.endYear}
                    </span>
                  </div>
                  <p className="font-sans text-gold text-lg mb-1">{edu.degree}</p>
                  {edu.field && <p className="font-sans text-cream/50">{edu.field}</p>}
                  {edu.description && (
                    <p className="font-sans text-cream/50 mt-3 max-w-2xl">{edu.description}</p>
                  )}
                  {edu.achievements?.length > 0 && (
                    <ul className="mt-3 space-y-1">
                      {edu.achievements.map((ach, idx) => (
                        <li key={idx} className="font-sans text-cream/50 text-sm flex items-center gap-2">
                          <span className="w-1 h-1 bg-gold rounded-full" />
                          {ach}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
                <div className="flex items-center gap-2 ml-4">
                  <Link to={`/admin/education/edit/${edu._id}`}
                    className="p-2 text-cream/50 hover:text-gold transition-colors">
                    <FiEdit2 size={18} />
                  </Link>
                  <button onClick={() => handleDelete(edu._id)}
                    className="p-2 text-cream/50 hover:text-red-400 transition-colors">
                    <FiTrash2 size={18} />
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