import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { ThemeProvider } from './context/ThemeContext'

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

