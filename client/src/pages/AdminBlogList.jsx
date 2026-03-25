import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../util/api'
import { FiPlus, FiEdit2, FiTrash2, FiEye, FiEyeOff } from 'react-icons/fi'

export default function AdminBlogList() {
  const [posts, setPosts] = useState([])
  const [loading, setLoading] = useState(true)
  const [deleting, setDeleting] = useState(null)

  const fetchPosts = async () => {
    try {
      // Fetch all posts including unpublished for admin
      const res = await api.get('/api/blog/admin/all')
      setPosts(res.data.data || [])
    } catch {
      // fallback to public endpoint
      try {
        const res = await api.get('/api/blog?limit=50')
        setPosts(res.data.data || [])
      } catch {}
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => { fetchPosts() }, [])

  const togglePublish = async (post) => {
    try {
      await api.put(`/api/blog/${post._id}`, { published: !post.published })
      setPosts(prev => prev.map(p => p._id === post._id ? { ...p, published: !p.published } : p))
    } catch (err) {
      alert('Failed to update post.')
    }
  }

  const deletePost = async (id) => {
    if (!window.confirm('Delete this post permanently?')) return
    setDeleting(id)
    try {
      await api.delete(`/api/blog/${id}`)
      setPosts(prev => prev.filter(p => p._id !== id))
    } catch {
      alert('Failed to delete post.')
    } finally {
      setDeleting(null)
    }
  }

  return (
    <div className="p-8">
      {/* Header */}
      <div className="flex items-end justify-between mb-10">
        <div>
          <p className="font-sans text-gold text-xs tracking-[0.4em] uppercase mb-2">Content</p>
          <h1 className="font-display text-cream text-4xl font-light">Blog Posts</h1>
          <div className="w-10 h-px bg-gold/40 mt-4" />
        </div>
        <Link to="/admin/blog/new"
          className="flex items-center gap-2 bg-gold hover:bg-gold-dark text-navy
                     font-sans text-xs font-semibold tracking-widest uppercase px-5 py-2.5 transition-colors">
          <FiPlus size={14} /> New Post
        </Link>
      </div>

      {/* Table */}
      {loading ? (
        <p className="font-sans text-cream/30 text-sm">Loading posts...</p>
      ) : posts.length === 0 ? (
        <div className="bg-navy border border-cream/5 p-12 text-center">
          <p className="font-display text-cream text-2xl font-light mb-3">No posts yet</p>
          <p className="font-sans text-cream/40 text-sm mb-6">Create your first thought leadership article.</p>
          <Link to="/admin/blog/new" className="btn-primary text-sm">Write First Post</Link>
        </div>
      ) : (
        <div className="space-y-2">
          {/* Column headers */}
          <div className="grid grid-cols-12 gap-4 px-4 pb-2 border-b border-cream/5">
            <span className="col-span-6 font-sans text-cream/30 text-xs uppercase tracking-widest">Title</span>
            <span className="col-span-2 font-sans text-cream/30 text-xs uppercase tracking-widest">Category</span>
            <span className="col-span-2 font-sans text-cream/30 text-xs uppercase tracking-widest">Status</span>
            <span className="col-span-2 font-sans text-cream/30 text-xs uppercase tracking-widest text-right">Actions</span>
          </div>

          {posts.map((post, i) => (
            <motion.div key={post._id} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 }}
              className="grid grid-cols-12 gap-4 items-center bg-navy border border-cream/5
                         hover:border-cream/10 px-4 py-4 transition-colors group">

              {/* Title */}
              <div className="col-span-6">
                <p className="font-sans text-cream text-sm font-medium truncate">{post.title}</p>
                <p className="font-sans text-cream/30 text-xs mt-0.5 truncate">{post.excerpt}</p>
              </div>

              {/* Category */}
              <div className="col-span-2">
                <span className="font-sans text-xs text-gold/70 bg-gold/5 px-2 py-0.5">
                  {post.category}
                </span>
              </div>

              {/* Status */}
              <div className="col-span-2">
                <span className={`font-sans text-xs tracking-wide px-2 py-0.5
                  ${post.published ? 'text-green-400 bg-green-400/10' : 'text-cream/30 bg-cream/5'}`}>
                  {post.published ? 'Published' : 'Draft'}
                </span>
              </div>

              {/* Actions */}
              <div className="col-span-2 flex items-center justify-end gap-2">
                <button onClick={() => togglePublish(post)} title={post.published ? 'Unpublish' : 'Publish'}
                  className="p-1.5 text-cream/30 hover:text-gold transition-colors">
                  {post.published ? <FiEyeOff size={14} /> : <FiEye size={14} />}
                </button>
                <Link to={`/admin/blog/edit/${post._id}`} title="Edit"
                  className="p-1.5 text-cream/30 hover:text-cream transition-colors">
                  <FiEdit2 size={14} />
                </Link>
                <button onClick={() => deletePost(post._id)} disabled={deleting === post._id}
                  title="Delete"
                  className="p-1.5 text-cream/30 hover:text-red-400 transition-colors disabled:opacity-40">
                  <FiTrash2 size={14} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  )
}