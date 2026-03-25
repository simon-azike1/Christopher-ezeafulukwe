import { useState, useEffect } from 'react'
import { useParams, useNavigate, Link } from 'react-router-dom'
import api from '../util/api'
import { FiArrowLeft, FiSave } from 'react-icons/fi'
import ImageUpload from '../components/ui/ImageUpload'

export default function AdminEducationEditor() {
  const { id } = useParams()
  const navigate = useNavigate()
  const isEdit = Boolean(id)

  const [loading, setLoading] = useState(isEdit)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const [form, setForm] = useState({
    institution: '',
    degree: '',
    field: '',
    startYear: '',
    endYear: '',
    description: '',
    achievements: '',
    image: '',
    order: 0
  })

  useEffect(() => {
    if (isEdit) {
      fetchEducation()
    }
  }, [id])

  const fetchEducation = async () => {
    try {
      const res = await api.get(`/api/content/education/${id}`)
      const edu = res.data.data
      setForm({
        institution: edu.institution || '',
        degree: edu.degree || '',
        field: edu.field || '',
        startYear: edu.startYear || '',
        endYear: edu.endYear || '',
        description: edu.description || '',
        achievements: edu.achievements?.join('\n') || '',
        image: edu.image || '',
        order: edu.order || 0
      })
    } catch (err) {
      setError('Failed to load education')
    } finally {
      setLoading(false)
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setError('')
    setSaving(true)

    const data = {
      ...form,
      achievements: form.achievements.split('\n').map(a => a.trim()).filter(Boolean)
    }

    try {
      if (isEdit) {
        await api.put(`/api/content/education/${id}`, data)
      } else {
        await api.post('/api/content/education', data)
      }
      navigate('/admin/education')
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to save education')
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
        <Link to="/admin/education" className="p-2 text-cream/50 hover:text-gold transition-colors">
          <FiArrowLeft size={20} />
        </Link>
        <div>
          <p className="font-sans text-gold text-xs tracking-[0.4em] uppercase mb-2">Education</p>
          <h1 className="font-display text-cream text-3xl font-light">
            {isEdit ? 'Edit Education' : 'New Education'}
          </h1>
        </div>
      </div>

      {error && (
        <div className="bg-red-900/20 border border-red-500/30 text-red-400 p-4 mb-6">
          {error}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Institution */}
        <div>
          <label className="block font-sans text-cream/70 text-sm mb-2">Institution *</label>
          <input
            type="text"
            value={form.institution}
            onChange={e => setForm({ ...form, institution: e.target.value })}
            required
            className="w-full px-4 py-3 bg-navy border border-cream/10 text-cream focus:border-gold/50 focus:outline-none"
            placeholder="University name"
          />
        </div>

        {/* Degree & Field */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-sans text-cream/70 text-sm mb-2">Degree *</label>
            <input
              type="text"
              value={form.degree}
              onChange={e => setForm({ ...form, degree: e.target.value })}
              required
              className="w-full px-4 py-3 bg-navy border border-cream/10 text-cream focus:border-gold/50 focus:outline-none"
              placeholder="Bachelor of Science"
            />
          </div>
          <div>
            <label className="block font-sans text-cream/70 text-sm mb-2">Field of Study</label>
            <input
              type="text"
              value={form.field}
              onChange={e => setForm({ ...form, field: e.target.value })}
              className="w-full px-4 py-3 bg-navy border border-cream/10 text-cream focus:border-gold/50 focus:outline-none"
              placeholder="Computer Science"
            />
          </div>
        </div>

        {/* Years */}
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block font-sans text-cream/70 text-sm mb-2">Start Year</label>
            <input
              type="text"
              value={form.startYear}
              onChange={e => setForm({ ...form, startYear: e.target.value })}
              className="w-full px-4 py-3 bg-navy border border-cream/10 text-cream focus:border-gold/50 focus:outline-none"
              placeholder="2015"
            />
          </div>
          <div>
            <label className="block font-sans text-cream/70 text-sm mb-2">End Year</label>
            <input
              type="text"
              value={form.endYear}
              onChange={e => setForm({ ...form, endYear: e.target.value })}
              className="w-full px-4 py-3 bg-navy border border-cream/10 text-cream focus:border-gold/50 focus:outline-none"
              placeholder="2019 or Present"
            />
          </div>
        </div>

        {/* Image Upload */}
        <ImageUpload
          label="Institution Image"
          value={form.image}
          onChange={(url) => setForm({ ...form, image: url })}
        />

        {/* Description */}
        <div>
          <label className="block font-sans text-cream/70 text-sm mb-2">Description</label>
          <textarea
            value={form.description}
            onChange={e => setForm({ ...form, description: e.target.value })}
            rows={3}
            className="w-full px-4 py-3 bg-navy border border-cream/10 text-cream focus:border-gold/50 focus:outline-none resize-none"
            placeholder="Brief description of your studies"
          />
        </div>

        {/* Achievements */}
        <div>
          <label className="block font-sans text-cream/70 text-sm mb-2">Achievements (one per line)</label>
          <textarea
            value={form.achievements}
            onChange={e => setForm({ ...form, achievements: e.target.value })}
            rows={4}
            className="w-full px-4 py-3 bg-navy border border-cream/10 text-cream focus:border-gold/50 focus:outline-none resize-none"
            placeholder="Dean's List&#10;Research Assistant&#10;Thesis Award"
          />
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
            <span className="font-sans">{saving ? 'Saving...' : 'Save Education'}</span>
          </button>
        </div>
      </form>
    </div>
  )
}