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
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location                = useLocation()
  const { dark, toggle }        = useTheme()

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [location])

  return (
    <>
      <nav
        style={{
          backgroundColor: 'var(--navbar-bg)',
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          width: '100%',
          zIndex: 50,
          backdropFilter: 'blur(8px)',
          boxShadow: scrolled ? '0 4px 24px rgba(0,0,0,0.2)' : 'none',
          padding: scrolled ? '0.75rem 0' : '1.25rem 0',
          transition: 'all 0.5s ease',
        }}
      >
        <div style={{
          maxWidth: '80rem',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}>

          {/* Logo */}
          <Link to="/" style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, textDecoration: 'none' }}>
            <span style={{
              fontFamily: 'var(--font-display)',
              color: 'var(--color-gold)',
              fontSize: '1.25rem',
              fontWeight: 600,
              letterSpacing: '0.05em',
            }}>
              Christopher
            </span>
            <span style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '0.7rem',
              letterSpacing: '0.3em',
              textTransform: 'uppercase',
              color: 'rgba(245,240,232,0.6)',
            }}>
              Ezeafulukwe
            </span>
          </Link>

          {/* Desktop links — hidden below 1024px */}
          <div className="desktop-nav" style={{
            display: 'flex',
            alignItems: 'center',
            gap: '2rem',
          }}>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontFamily: 'var(--font-sans)',
                  fontSize: '0.8rem',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  textDecoration: 'none',
                  color: location.pathname === link.path
                    ? 'var(--color-gold)'
                    : 'rgba(245,240,232,0.8)',
                  transition: 'color 0.3s ease',
                }}
                onMouseEnter={e => e.target.style.color = 'var(--color-gold)'}
                onMouseLeave={e => e.target.style.color = location.pathname === link.path
                  ? 'var(--color-gold)'
                  : 'rgba(245,240,232,0.8)'}
              >
                {link.label}
              </Link>
            ))}

            {/* Dark mode toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              style={{
                width: '2.25rem',
                height: '2.25rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(201,146,42,0.3)',
                background: 'transparent',
                color: 'var(--color-gold)',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                flexShrink: 0,
              }}
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={dark ? 'sun' : 'moon'}
                  initial={{ opacity: 0, rotate: -30, scale: 0.7 }}
                  animate={{ opacity: 1, rotate: 0,   scale: 1   }}
                  exit={{    opacity: 0, rotate:  30, scale: 0.7 }}
                  transition={{ duration: 0.2 }}
                  style={{ display: 'flex' }}
                >
                  {dark ? <HiOutlineSun size={16} /> : <HiOutlineMoon size={16} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>

          {/* Mobile controls */}
          <div className="mobile-nav" style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <button
              onClick={toggle}
              aria-label="Toggle dark mode"
              style={{
                width: '2rem',
                height: '2rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                border: '1px solid rgba(201,146,42,0.3)',
                background: 'transparent',
                color: 'var(--color-gold)',
                cursor: 'pointer',
              }}
            >
              {dark ? <HiOutlineSun size={14} /> : <HiOutlineMoon size={14} />}
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              style={{
                background: 'transparent',
                border: 'none',
                color: 'var(--color-cream)',
                fontSize: '1.5rem',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
              }}
            >
              {menuOpen ? <HiX /> : <HiMenu />}
            </button>
          </div>
        </div>
      </nav>

      {/* Responsive styles */}
      <style>{`
        .desktop-nav { display: flex !important; }
        .mobile-nav  { display: none  !important; }

        @media (max-width: 1023px) {
          .desktop-nav { display: none  !important; }
          .mobile-nav  { display: flex  !important; }
        }
      `}</style>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{    opacity: 0, x: '100%' }}
            transition={{ duration: 0.3 }}
            style={{
              position: 'fixed',
              inset: 0,
              zIndex: 40,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '2rem',
              backgroundColor: 'var(--navbar-bg)',
            }}
          >
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  fontFamily: 'var(--font-display)',
                  fontSize: '1.875rem',
                  fontWeight: 300,
                  textDecoration: 'none',
                  color: location.pathname === link.path ? 'var(--color-gold)' : 'var(--color-cream)',
                  transition: 'color 0.3s ease',
                }}
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