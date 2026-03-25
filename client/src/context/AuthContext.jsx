import { createContext, useContext, useState, useEffect } from 'react'
import api from '../util/api'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
  const [admin, setAdmin] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const token = localStorage.getItem('ce_admin_token')
    if (token) {
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setAdmin({ token })
    }
    setLoading(false)
  }, [])

  const login = async (password) => {
    try {
      const res = await api.post('/api/admin/login', { password })
      const { token } = res.data
      localStorage.setItem('ce_admin_token', token)
      api.defaults.headers.common['Authorization'] = `Bearer ${token}`
      setAdmin({ token })
      return true
    } catch (err) {
      throw err
    }
  }

  const logout = () => {
    localStorage.removeItem('ce_admin_token')
    delete api.defaults.headers.common['Authorization']
    setAdmin(null)
  }

  return (
    <AuthContext.Provider value={{ admin, login, logout, loading }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)