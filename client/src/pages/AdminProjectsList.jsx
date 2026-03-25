import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../util/api'
import { FiPlus, FiEdit2, FiTrash2, FiEye } from 'react-icons/fi'

export default function AdminProjectsList() {
  const [projects, setProjects] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    fetchProjects()
  }, [])

  const fetchProjects = async () => {
    try {
      const res = await api.get('/api/content/projects')
      setProjects(res.data.data || [])
    } catch (err) {
      setError('Failed to load projects')
    } finally {
      setLoading(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Are you sure you want to delete this project?')) return
    try {
      await api.delete(`/api/content/projects/${id}`)
      setProjects(projects.filter(p => p._id !== id))
    } catch (err) {
      alert('Failed to delete project')
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
          <h1 className="font-display text-cream text-4xl font-light">Projects</h1>
          <div className="w-10 h-px bg-gold/40 mt-4" />
        </div>
        <Link to="/admin/projects/new"
          className="flex items-center gap-2 px-4 py-2 bg-gold/10 text-gold hover:bg-gold/20 transition-colors">
          <FiPlus size={16} />
          <span className="font-sans text-sm">Add Project</span>
        </Link>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500/30 text-red-400 p-4 mb-6">
          {error}
        </div>
      )}

      {/* Projects Grid */}
      {projects.length === 0 ? (
        <div className="text-cream/50 text-center py-12">
          No projects yet. Click "Add Project" to create your first one.
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, i) => (
            <motion.div
              key={project._id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.05 }}
              className="bg-navy border border-cream/5 hover:border-gold/20 transition-colors overflow-hidden group"
            >
              {/* Image */}
              <div className="h-40 bg-cream/5 relative overflow-hidden">
                {project.image ? (
                  <img src={project.image} alt={project.title} className="w-full h-full object-cover" />
                ) : (
                  <div className="w-full h-full flex items-center justify-center text-cream/20">
                    No Image
                  </div>
                )}
                {project.featured && (
                  <span className="absolute top-3 right-3 px-2 py-1 bg-gold/20 text-gold text-xs">Featured</span>
                )}
              </div>

              {/* Content */}
              <div className="p-4">
                <h3 className="font-display text-cream text-lg mb-2">{project.title}</h3>
                <p className="font-sans text-cream/50 text-sm line-clamp-2 mb-3">{project.description}</p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.category && (
                    <span className="px-2 py-0.5 bg-gold/10 text-gold/70 text-xs">{project.category}</span>
                  )}
                  {project.technologies?.slice(0, 2).map((tech, idx) => (
                    <span key={idx} className="px-2 py-0.5 bg-cream/5 text-cream/50 text-xs">{tech}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 pt-3 border-t border-cream/5">
                  <Link to={`/admin/projects/edit/${project._id}`}
                    className="p-2 text-cream/50 hover:text-gold transition-colors">
                    <FiEdit2 size={16} />
                  </Link>
                  <button onClick={() => handleDelete(project._id)}
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