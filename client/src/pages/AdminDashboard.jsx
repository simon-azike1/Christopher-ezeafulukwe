import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../util/api'
import { FiFileText, FiMail, FiEye, FiPlus, FiGrid, FiBook, FiHeart } from 'react-icons/fi'
import { useTheme } from '../context/ThemeContext'

export default function AdminDashboard() {
  const { dark } = useTheme()
  const [stats, setStats] = useState({ 
    posts: 0, 
    messages: 0, 
    published: 0,
    projects: 0,
    education: 0,
    foundation: 0
  })
  const [recentMessages, setRecentMessages] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [postsRes, projectsRes, educationRes, foundationRes, msgRes] = await Promise.all([
          api.get('/api/blog?limit=1'),
          api.get('/api/content/projects'),
          api.get('/api/content/education'),
          api.get('/api/content/foundation'),
          api.get('/api/contact'),
        ])
        // Also get all posts for total count (including drafts)
        const allPostsRes = await api.get('/api/blog/admin/all')
        
        setStats({
          posts: allPostsRes.data.data?.length || 0,
          messages: msgRes.data.count || 0,
          published: postsRes.data.total || 0,
          projects: projectsRes.data.data?.length || 0,
          education: educationRes.data.data?.length || 0,
          foundation: foundationRes.data.data?.length || 0,
        })
        setRecentMessages((msgRes.data.data || []).slice(0, 5))
      } catch (err) {
        console.error('Dashboard stats error:', err)
      } finally {
        setLoading(false)
      }
    }
    fetchStats()
  }, [])

  const statCards = [
    { icon: FiFileText, label: 'Blog Posts', value: stats.posts, color: 'text-gold', bg: 'bg-gold/10', link: '/admin/blog' },
    { icon: FiGrid, label: 'Projects', value: stats.projects, color: 'text-emerald-400', bg: 'bg-emerald-400/10', link: '/admin/projects' },
    { icon: FiBook, label: 'Education', value: stats.education, color: 'text-purple-400', bg: 'bg-purple-400/10', link: '/admin/education' },
    { icon: FiHeart, label: 'Foundation', value: stats.foundation, color: 'text-rose-400', bg: 'bg-rose-400/10', link: '/admin/foundation' },
    { icon: FiMail, label: 'Messages', value: stats.messages, color: 'text-blue-400', bg: 'bg-blue-400/10', link: '/admin/messages' },
  ]

  return (
    <div className="p-8">
      {/* Header */}
      <div className="mb-10">
        <p className="font-sans text-gold text-xs tracking-[0.4em] uppercase mb-2">Overview</p>
        <h1 className={`font-display text-4xl font-light ${dark ? 'text-cream' : 'text-navy'}`}>Dashboard</h1>
        <div className="w-10 h-px bg-gold/40 mt-4" />
      </div>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4 mb-10">
        {statCards.map((card, i) => (
          <motion.div key={i} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.1 }}>
            <Link to={card.link}
              className="block bg-navy border border-cream/5 hover:border-gold/20 p-5 transition-colors group h-full">
              <div className="flex items-start justify-between">
                <div className={`w-10 h-10 ${card.bg} flex items-center justify-center`}>
                  <card.icon className={card.color} size={18} />
                </div>
                <FiEye size={14} className="text-cream/20 group-hover:text-cream/40 transition-colors" />
              </div>
              <p className={`font-display text-3xl font-light mt-4 ${dark ? 'text-cream' : 'text-navy'}`}>
                {loading ? '—' : card.value}
              </p>
              <p className={`font-sans text-xs tracking-widest uppercase mt-1 ${dark ? 'text-cream/40' : 'text-navy/40'}`}>{card.label}</p>
            </Link>
          </motion.div>
        ))}
      </div>

      {/* Quick Actions */}
      <div className="mb-10">
        <h2 className={`font-sans text-xs tracking-widest uppercase mb-4 ${dark ? 'text-cream/50' : 'text-navy/50'}`}>Quick Actions</h2>
        <div className="flex flex-wrap gap-3">
          <Link to="/admin/blog/new"
            className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy
                       font-sans text-xs font-semibold tracking-widest uppercase px-5 py-2.5 transition-colors">
            <FiPlus size={14} />
            New Blog Post
          </Link>
          <Link to="/admin/projects/new"
            className="flex items-center gap-2 border border-emerald-400/30 hover:border-emerald-400 text-emerald-400
                       hover:text-emerald-300 font-sans text-xs tracking-widest uppercase px-5 py-2.5 transition-colors">
            <FiGrid size={14} />
            New Project
          </Link>
          <Link to="/admin/education/new"
            className="flex items-center gap-2 border border-purple-400/30 hover:border-purple-400 text-purple-400
                       hover:text-purple-300 font-sans text-xs tracking-widest uppercase px-5 py-2.5 transition-colors">
            <FiBook size={14} />
            New Education
          </Link>
          <Link to="/admin/foundation/new"
            className="flex items-center gap-2 border border-rose-400/30 hover:border-rose-400 text-rose-400
                       hover:text-rose-300 font-sans text-xs tracking-widest uppercase px-5 py-2.5 transition-colors">
            <FiHeart size={14} />
            New Foundation
          </Link>
          <Link to="/admin/messages"
            className={`flex items-center gap-2 border transition-colors font-sans text-xs tracking-widest uppercase px-5 py-2.5 
              ${dark ? 'border-cream/10 hover:border-gold/40 text-cream/60 hover:text-cream' : 'border-navy/10 hover:border-gold/40 text-navy/60 hover:text-navy'}`}>
            <FiMail size={14} />
            View Messages
          </Link>
          <a href="/" target="_blank" rel="noreferrer"
            className={`flex items-center gap-2 border transition-colors font-sans text-xs tracking-widest uppercase px-5 py-2.5 
              ${dark ? 'border-cream/10 hover:border-gold/40 text-cream/60 hover:text-cream' : 'border-navy/10 hover:border-gold/40 text-navy/60 hover:text-navy'}`}>
            View Live Site ↗
          </a>
        </div>
      </div>

      {/* Recent Messages */}
      <div>
        <h2 className={`font-sans text-xs tracking-widest uppercase mb-4 ${dark ? 'text-cream/50' : 'text-navy/50'}`}>Recent Messages</h2>
        {loading ? (
          <p className={`font-sans text-sm ${dark ? 'text-cream/30' : 'text-navy/30'}`}>Loading...</p>
        ) : recentMessages.length === 0 ? (
          <div className={`border p-6 text-center ${dark ? 'bg-navy border-cream/5' : 'bg-white border-navy/10'}`}>
            <p className={`font-sans text-sm ${dark ? 'text-cream/30' : 'text-navy/30'}`}>No messages yet.</p>
          </div>
        ) : (
          <div className="space-y-2">
            {recentMessages.map((msg, i) => (
              <div key={i} className="bg-navy border border-cream/5 px-5 py-4 flex items-center justify-between">
                <div>
                  <p className="font-sans text-cream text-sm font-medium">{msg.name}</p>
                  <p className="font-sans text-cream/40 text-xs mt-0.5">{msg.subject}</p>
                </div>
                <p className="font-sans text-cream/30 text-xs">
                  {new Date(msg.createdAt).toLocaleDateString('en-GB', { day: 'numeric', month: 'short' })}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}