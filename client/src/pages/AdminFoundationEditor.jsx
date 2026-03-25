import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../util/api'
import { FiArrowLeft, FiSave } from 'react-icons/fi'
import ImageUpload from '../components/ui/ImageUpload'

export default function AdminFoundationEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    title: '',
    description: '',
    image: '',
    category: '',
    link: '',
    order: 0
  })

  useEffect(() => {
    if (isEdit) {
      fetchFoundation()
    }
  }, [id])

  const fetchFoundation = async () => {
    try {
      const res = await api.get(`/api/content/foundation/${id}`)
      const item = res.data.data
      setForm({
        title: item.title || '',
        description: item.description || '',
        image: item.image || '',
        category: item.category || '',
        link: item.link || '',
        order: item.order || 0
      })
    } catch (err) {
      setError('Failed to load entry')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    try {
      if (isEdit) {
        await api.put(`/api/content/foundation/${id}`, form)
      } else {
        await api.post('/api/content/foundation', form)
      }
      navigate('/admin/foundation')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save')
      setSaving(false)
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
    <div className="p-8 max-w-3xl">
      {/* Header */}
      <div className="flex items-center gap-4 mb-8">
        <Link to="/admin/foundation" className="p-2 text-cream/50 hover:text-gold transition-colors">
          <FiArrowLeft size={20} />
        </Link>
        <div>
          <p className="font-sans text-gold text-xs tracking-[0.4em] uppercase mb-2">Foundation</p>
          <h1 className="font-display text-cream text-3xl font-light">
            {isEdit ? 'Edit Foundation' : 'New Foundation'}
          </h1>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500/30 text-red-400 p-4 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Title */}
        <div>
          <label className="block font-sans text-cream/70 text-sm mb-2">Title *</label>
          <input
            type="text"
            value={form.title}
            onChange={e => setForm({ ...form, title: e.target.value })}
            required
            className="w-full px-4 py-3 bg-navy border border-cream/10 text-cream focus:border-gold/50 focus:outline-none"
            placeholder="Foundation name"
          />
        </div>

        {/* Description */}
        <div>
          <label className="block font-sans text-cream/70 text-sm mb-2">Description *</label>
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            required
            rows={5}
            className="w-full px-4 py-3 bg-navy border border-cream/10 text-cream focus:border-gold/50 focus:outline-none resize-none"
            placeholder="Describe the foundation and its mission"
          />
        </div>

        {/* Image Upload */}
        <ImageUpload
          label="Foundation Image"
          value={form.image}
          onChange={(url) => setForm({ ...form, image: url })}
        />

        {/* Category & Link */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-sans text-cream/70 text-sm mb-2">Category</label>
            <input
              type="text"
              value={form.category}
              onChange={e => setForm({ ...form, category: e.target.value })}
              className="w-full px-4 py-3 bg-navy border border-cream/10 text-cream focus:border-gold/50 focus:outline-none"
              placeholder="Community, Education, etc."
            />
          </div>
          <div>
            <label className="block font-sans text-cream/70 text-sm mb-2">Website Link</label>
            <input
              type="url"
              value={form.link}
              onChange={e => setForm({ ...form, link: e.target.value })}
              className="w-full px-4 py-3 bg-navy border border-cream/10 text-cream focus:border-gold/50 focus:outline-none"
              placeholder="https://foundation.org"
            />
          </div>
        </div>

        {/* Order */}
        <div>
          <label className="block font-sans text-cream/70 text-sm mb-2">Display Order</label>
          <input
            type="number"
            value={form.order}
            onChange={e => setForm({ ...form, order: parseInt(e.target.value) || 0 })}
            className="w-32 px-4 py-3 bg-navy border border-cream/10 text-cream focus:border-gold/50 focus:outline-none"
          />
        </div>

        {/* Submit */}
        <div className="flex justify-end pt-4">
          <button
            type="submit"
            disabled={saving}
            className="flex items-center gap-2 px-6 py-3 bg-gold/10 text-gold hover:bg-gold/20 disabled:opacity-50 transition-colors"
          >
            {saving ? (
              <div className="w-4 h-4 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
            ) : (
              <FiSave size={18} />
            )}
            <span className="font-sans">{saving ? 'Saving...' : 'Save Foundation'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}