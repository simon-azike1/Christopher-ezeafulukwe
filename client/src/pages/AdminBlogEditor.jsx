import { useState, useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { motion } from 'framer-motion'
import api from '../util/api'
import { wordCount, estimatedReadTime } from '../util/formatters.js'
import { FiSave, FiArrowLeft, FiEye } from 'react-icons/fi'
import ImageUpload from '../components/ui/ImageUpload'

const CATEGORIES = [
  'Energy Policy', 'Leadership', 'Africa', 'Corporate Governance',
  'Renewable Energy', 'Law & Regulation', 'Economic Development'
]

const emptyForm = {
  title: '', category: 'Leadership', excerpt: '',
  content: '', readTime: '5 min read', published: false, coverImage: '',
}

export default function AdminBlogEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [form, setForm] = useState(emptyForm)
  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [saved, setSaved] = useState(false)
  const [error, setError] = useState('')
  const [preview, setPreview] = useState(false)

  useEffect(() => {
    if (!isEdit) return
    const fetchPost = async () => {
      try {
        const res = await api.get(`/api/blog/by-id/${id}`)
        const p = res.data.data
        setForm({
          title: p.title, category: p.category, excerpt: p.excerpt,
          content: p.content, readTime: p.readTime, published: p.published,
          coverImage: p.coverImage || '',
        })
      } catch {
        setError('Post not found.')
      } finally {
        setLoading(false)
      }
    }
    fetchPost()
  }, [id, isEdit])

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target
    setForm(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }))
  }

  const handleSave = async (publishOverride) => {
    setSaving(true)
    setError('')
    const payload = { ...form }
    if (publishOverride !== undefined) payload.published = publishOverride

    try {
      if (isEdit) {
        await api.put(`/api/blog/${id}`, payload)
      } else {
        const res = await api.post('/api/blog', payload)
        navigate(`/admin/blog/edit/${res.data.data._id}`, { replace: true })
      }
      setSaved(true)
      setForm(prev => ({ ...prev, ...payload }))
      setTimeout(() => setSaved(false), 3000)
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save post.')
    } finally {
      setSaving(false)
    }
  }

  const count = wordCount(form.content)
  const estimatedRead = estimatedReadTime(form.content)

  if (loading) return (
    <div className="p-8 text-cream/40 font-sans text-sm">Loading post...</div>
  )

  return (
    <div className="min-h-screen bg-[#0a0f1a]">
      {/* Top bar */}
      <div className="sticky top-0 z-10 bg-navy/90 backdrop-blur border-b border-cream/5 px-8 py-3
                      flex items-center justify-between">
        <div className="flex items-center gap-4">
          <button onClick={() => navigate('/admin/blog')}
            className="flex items-center gap-2 text-cream/40 hover:text-cream font-sans text-xs transition-colors">
            <FiArrowLeft size={14} /> Back
          </button>
          <span className="text-cream/10">|</span>
          <span className="font-sans text-cream/40 text-xs">
            {isEdit ? 'Editing post' : 'New post'} · {count} words · ~{estimatedRead} min read
          </span>
        </div>

        <div className="flex items-center gap-3">
          {saved && (
            <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="font-sans text-green-400 text-xs">
              ✓ Saved
            </motion.span>
          )}
          {error && <span className="font-sans text-red-400 text-xs">{error}</span>}

          <button onClick={() => setPreview(!preview)}
            className="flex items-center gap-1.5 border border-cream/10 hover:border-cream/20
                       text-cream/50 hover:text-cream font-sans text-xs px-3 py-1.5 transition-colors">
            <FiEye size={12} />
            {preview ? 'Edit' : 'Preview'}
          </button>

          <button onClick={() => handleSave(false)} disabled={saving}
            className="flex items-center gap-1.5 border border-gold/30 hover:border-gold text-gold
                       font-sans text-xs px-3 py-1.5 transition-colors disabled:opacity-40">
            <FiSave size={12} />
            Save Draft
          </button>

          <button onClick={() => handleSave(true)} disabled={saving}
            className="flex items-center gap-1.5 bg-gold hover:bg-gold-dark text-navy
                       font-sans text-xs font-semibold px-4 py-1.5 transition-colors disabled:opacity-40">
            {saving ? 'Publishing...' : form.published ? 'Update & Publish' : 'Publish'}
          </button>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-8 py-10">
        {preview ? (
          /* ── Preview Mode ── */
          <div className="bg-[#111827] border border-cream/5 p-10">
            <p className="font-sans text-gold text-xs tracking-widest uppercase mb-3">{form.category}</p>
            <h1 className="font-display text-cream text-5xl font-light leading-tight mb-6">{form.title || 'Untitled'}</h1>
            <div className="w-12 h-px bg-gold mb-6" />
            <p className="font-body text-cream/60 text-lg leading-relaxed mb-8">{form.excerpt}</p>
            <div className="font-body text-cream/80 leading-relaxed whitespace-pre-wrap text-base">
              {form.content || <span className="text-cream/20 italic">No content yet...</span>}
            </div>
          </div>
        ) : (
          /* ── Editor Mode ── */
          <div className="space-y-6">
            {/* Title */}
            <div>
              <input type="text" name="title" value={form.title} onChange={handleChange}
                placeholder="Article title..."
                className="w-full bg-transparent border-b border-cream/10 focus:border-gold pb-3
                           font-display text-cream text-4xl font-light placeholder-cream/20
                           outline-none transition-colors" />
            </div>

            {/* Meta row */}
            <div className="grid grid-cols-4 gap-4">
              <div>
                <label className="font-sans text-xs uppercase tracking-widest text-cream/30 block mb-2">
                  Featured Image
                </label>
                <ImageUpload
                  label=""
                  value={form.coverImage}
                  onChange={(url) => setForm(prev => ({ ...prev, coverImage: url }))}
                />
              </div>
              <div>
                <label className="font-sans text-xs uppercase tracking-widest text-cream/30 block mb-2">
                  Category
                </label>
                <select name="category" value={form.category} onChange={handleChange}
                  className="w-full bg-navy border border-cream/10 focus:border-gold px-3 py-2
                             font-sans text-sm text-cream outline-none transition-colors">
                  {CATEGORIES.map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
              <div>
                <label className="font-sans text-xs uppercase tracking-widest text-cream/30 block mb-2">
                  Read Time
                </label>
                <input type="text" name="readTime" value={form.readTime} onChange={handleChange}
                  className="w-full bg-navy border border-cream/10 focus:border-gold px-3 py-2
                             font-sans text-sm text-cream outline-none transition-colors" />
              </div>
              <div className="flex items-end">
                <label className="flex items-center gap-3 cursor-pointer pb-2">
                  <div className="relative">
                    <input type="checkbox" name="published" checked={form.published}
                      onChange={handleChange} className="sr-only" />
                    <div className={`w-10 h-5 rounded-full transition-colors ${form.published ? 'bg-gold' : 'bg-cream/10'}`} />
                    <div className={`absolute top-0.5 w-4 h-4 rounded-full bg-white transition-transform
                      ${form.published ? 'translate-x-5' : 'translate-x-0.5'}`} />
                  </div>
                  <span className="font-sans text-sm text-cream/60">
                    {form.published ? 'Published' : 'Draft'}
                  </span>
                </label>
              </div>
            </div>

            {/* Excerpt */}
            <div>
              <label className="font-sans text-xs uppercase tracking-widest text-cream/30 block mb-2">
                Excerpt / Summary
              </label>
              <textarea name="excerpt" value={form.excerpt} onChange={handleChange}
                rows={3} placeholder="A compelling one-paragraph summary visible in the blog list..."
                className="w-full bg-navy border border-cream/10 focus:border-gold px-4 py-3
                           font-body text-cream/80 text-sm leading-relaxed
                           placeholder-cream/20 outline-none transition-colors resize-none" />
            </div>

            {/* Content */}
            <div>
              <label className="font-sans text-xs uppercase tracking-widest text-cream/30 block mb-2">
                Content
              </label>
              <textarea name="content" value={form.content} onChange={handleChange}
                rows={24} placeholder="Write your article here. Use plain paragraphs — Markdown rendering coming soon..."
                className="w-full bg-navy border border-cream/10 focus:border-gold px-4 py-4
                           font-body text-cream/80 text-sm leading-relaxed
                           placeholder-cream/20 outline-none transition-colors resize-y" />
            </div>
          </div>
        )}
      </div>
    </div>
  )
}