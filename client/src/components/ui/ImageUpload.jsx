import { useState, useRef } from 'react'
import { FiUpload, FiX, FiImage } from 'react-icons/fi'
import api from '../../util/api'

export default function ImageUpload({ value, onChange, label = 'Image' }) {
  const [uploading, setUploading] = useState(false)
  const [error, setError] = useState(null)
  const fileInputRef = useRef(null)

  const handleFileSelect = async (e) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith('image/')) {
      setError('Please select an image file')
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError('Image must be less than 5MB')
      return
    }

    setError(null)
    setUploading(true)

    try {
      const formData = new FormData()
      formData.append('image', file)

      const response = await api.post('/api/upload', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })

      if (response.data.success) {
        onChange(response.data.data.url)
      } else {
        setError(response.data.message || 'Upload failed')
      }
    } catch (err) {
      setError('Failed to upload image')
      console.error('Upload error:', err)
    } finally {
      setUploading(false)
    }
  }

  const handleClear = () => {
    onChange('')
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  return (
    <div>
      <label className="block font-sans text-cream/70 text-sm mb-2">{label}</label>
      
      {value ? (
        <div className="relative inline-block group">
          <img 
            src={value}
            alt="Preview"
            className="w-32 h-32 object-cover rounded-lg border border-cream/10"
          />
          <div className="absolute inset-0 bg-navy/80 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="p-2 bg-gold/20 text-gold hover:bg-gold/30 rounded-full"
            >
              <FiUpload size={16} />
            </button>
            <button
              type="button"
              onClick={handleClear}
              className="p-2 bg-red-500/20 text-red-400 hover:bg-red-500/30 rounded-full"
            >
              <FiX size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={() => fileInputRef.current?.click()}
          className="w-32 h-32 border-2 border-dashed border-cream/20 rounded-lg flex flex-col items-center justify-center cursor-pointer hover:border-gold/50 hover:bg-gold/5 transition-colors"
        >
          {uploading ? (
            <div className="w-6 h-6 border-2 border-gold/30 border-t-gold rounded-full animate-spin" />
          ) : (
            <>
              <FiImage className="text-cream/40 mb-2" size={24} />
              <span className="text-cream/40 text-xs font-sans">Upload</span>
            </>
          )}
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        accept="image/*"
        onChange={handleFileSelect}
        className="hidden"
      />

      {error && (
        <p className="text-red-400 text-xs mt-2">{error}</p>
      )}
    </div>
  )
}