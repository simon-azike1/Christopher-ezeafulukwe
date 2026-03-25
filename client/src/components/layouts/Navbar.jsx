import { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { HiMenu, HiX } from 'react-icons/hi'
import { HiOutlineSun, HiOutlineMoon } from 'react-icons/hi2'
import { useTheme } from '../../context/ThemeContext'

const navLinks = [
  { label: 'Home',        path: '/' },
  { label: 'About',       path: '/about' },
  { label: 'Career',      path: '/career' },
  { label: 'Education',   path: '/education' },
  { label: 'Memberships', path: '/memberships' },
  { label: 'Projects',    path: '/projects' },
  { label: 'Blog',        path: '/blog' },
  { label: 'Foundation',  path: '/foundation' },
  { label: 'Contact',     path: '/contact' },
]

export default function Navbar() {
  const [scrolled, setScrolled]   = useState(false)
  const [menuOpen, setMenuOpen]   = useState(false)
  const location                  = useLocation()
  const { dark, toggle }          = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <>
      <nav
        style={{ backgroundColor: 'var(--navbar-bg)' }}
        className={`fixed w-full z-50 transition-all duration-500 backdrop-blur-sm
          ${scrolled ? 'shadow-lg py-3' : 'py-5'}`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-12 flex justify-between items-center">

          {/* Logo */}
          <Link to="/" className="flex flex-col leading-none">
            <span className="font-display text-gold text-xl font-semibold tracking-wider">
              Christopher
            </span>
            <span className="font-sans text-xs tracking-[0.3em] uppercase"
              style={{ color: 'rgba(245,240,232,0.6)' }}>
              Ezeafulukwe
            </span>
          </Link>

          {/* Desktop links + toggle */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`nav-link ${location.pathname === link.path ? '!text-gold' : ''}`}
              >
                {link.label}
              </Link>
            ))}

            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="w-9 h-9 flex items-center justify-center border border-gold/30
                         hover:border-gold text-gold hover:bg-gold/10 transition-all duration-300"
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={dark ? 'moon' : 'sun'}
                  initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                  exit={{    opacity: 0, rotate:  30, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                >
                  {dark ? <HiOutlineSun size={16} /> : <HiOutlineMoon size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile: toggle + hamburger */}
          <div className="lg:hidden flex items-center gap-3">
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              className="w-8 h-8 flex items-center justify-center border border-gold/30 text-gold"
            >
              {dark ? <HiOutlineSun size={14} /> : <HiOutlineMoon size={14} />}
            </button>
            <button
              className="text-cream text-2xl"
              onClick={() => setMenuOpen(!menuOpen)}
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{    opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
            style={{ backgroundColor: 'var(--navbar-bg)' }}
          >
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                className={`font-display text-3xl font-light transition-colors hover:text-gold
                  ${location.pathname === link.path ? 'text-gold' : 'text-cream'}`}
              >
                {link.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}