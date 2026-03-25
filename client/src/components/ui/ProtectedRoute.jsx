import { Navigate } from 'react-router-dom'
import { useAuth } from '../../context/AuthContext'

export default function ProtectedRoute({ children }) {
  const { admin, loading } = useAuth()

  if (loading) {
    return (
      <div className="min-h-screen bg-navy flex items-center justify-center">
        <div className="w-8 h-8 border border-gold/30 flex items-center justify-center">
          <span className="font-display text-gold text-sm animate-pulse">CE</span>
        </div>
      </div>
    )
  }

  return admin ? children : <Navigate to="/admin/login" replace />
}