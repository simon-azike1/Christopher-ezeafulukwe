import { BrowserRouter as Router, Routes, Route, useLocation, Link } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'
import { motion } from 'framer-motion'

// Layout
import Navbar from './components/layouts/Navbar.jsx'
import Footer from './components/layouts/Footer.jsx'
import ProtectedRoute from './components/ui/ProtectedRoute.jsx'

// Public pages
import Home from './pages/Home'
import About from './pages/About'
import Career from './pages/Career'
import Education from './pages/Education'
import Memberships from './pages/Memberships'
import Projects from './pages/Projects'
import Blog from './pages/Blog'
import Foundation from './pages/Foundation'
import Contact from './pages/Contact'

function NotFound() {
  return (
    <div style={{ 
      minHeight: '60vh', 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center',
      textAlign: 'center',
      padding: '2rem'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 style={{ fontSize: '6rem', margin: 0, color: 'var(--primary-color)' }}>404</h1>
        <h2 style={{ fontSize: '1.5rem', marginTop: '1rem' }}>Page Not Found</h2>
        <p style={{ marginTop: '1rem', color: 'var(--text-secondary)' }}>
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link 
          to="/" 
          style={{ 
            marginTop: '2rem',
            padding: '0.75rem 2rem',
            backgroundColor: 'var(--primary-color)',
            color: 'white',
            textDecoration: 'none',
            borderRadius: '4px',
            display: 'inline-block'
          }}
        >
          Go Back Home
        </Link>
      </motion.div>
    </div>
  )
}

// Admin
import { AuthProvider } from './context/AuthContext'
import AdminLogin from './pages/AdminLogin'
import AdminLayout from './components/AdminLayout.jsx'
import AdminDashboard from './pages/AdminDashboard'
import AdminBlogList from './pages/AdminBlogList'
import AdminBlogEditor from './pages/AdminBlogEditor'
import AdminMessages from './pages/AdminMessages'
import AdminProjectsList from './pages/AdminProjectsList'
import AdminProjectsEditor from './pages/AdminProjectsEditor'
import AdminEducationList from './pages/AdminEducationList'
import AdminEducationEditor from './pages/AdminEducationEditor'
import AdminFoundationList from './pages/AdminFoundationList'
import AdminFoundationEditor from './pages/AdminFoundationEditor'

function PublicRoutes() {
  const location = useLocation()
  return (
    <>
      <Navbar />
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/"            element={<Home />} />
          <Route path="/about"       element={<About />} />
          <Route path="/career"      element={<Career />} />
          <Route path="/education"   element={<Education />} />
          <Route path="/memberships" element={<Memberships />} />
          <Route path="/projects"    element={<Projects />} />
          <Route path="/blog"        element={<Blog />} />
          <Route path="/foundation"  element={<Foundation />} />
          <Route path="/contact"     element={<Contact />} />
          <Route path="*"            element={<NotFound />} />
        </Routes>
      </AnimatePresence>
      <Footer />
    </>
  )
}

function AdminRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<AdminLogin />} />
      <Route path="/" element={
        <ProtectedRoute>
          <AdminLayout><AdminDashboard /></AdminLayout>
        </ProtectedRoute>
      } />
      <Route path="/*" element={
        <ProtectedRoute>
          <AdminLayout>
            <Routes>
              <Route path="/projects"          element={<AdminProjectsList />} />
              <Route path="/projects/new"      element={<AdminProjectsEditor />} />
              <Route path="/projects/edit/:id" element={<AdminProjectsEditor />} />
              <Route path="/education"         element={<AdminEducationList />} />
              <Route path="/education/new"     element={<AdminEducationEditor />} />
              <Route path="/education/edit/:id" element={<AdminEducationEditor />} />
              <Route path="/foundation"        element={<AdminFoundationList />} />
              <Route path="/foundation/new"    element={<AdminFoundationEditor />} />
              <Route path="/foundation/edit/:id" element={<AdminFoundationEditor />} />
              <Route path="/blog"          element={<AdminBlogList />} />
              <Route path="/blog/new"      element={<AdminBlogEditor />} />
              <Route path="/blog/edit/:id" element={<AdminBlogEditor />} />
              <Route path="/messages"      element={<AdminMessages />} />
              <Route path="*"             element={<NotFound />} />
            </Routes>
          </AdminLayout>
        </ProtectedRoute>
      } />
    </Routes>
  )
}

export default function App() {
  return (
    <ThemeProvider>
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/admin/*"     element={<AdminRoutes />} />
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/*"           element={<PublicRoutes />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  )
}

