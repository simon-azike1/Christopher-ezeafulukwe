import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useTheme } from '../context/ThemeContext'
import { FiGrid, FiFileText, FiMail, FiLogOut, FiPlus, FiExternalLink, FiBriefcase, FiAward, FiHeart, FiSun, FiMoon } from 'react-icons/fi'

const navItems = [
  { icon: FiGrid,     label: 'Dashboard',  path: '/admin' },
  { icon: FiBriefcase,label: 'Projects',   path: '/admin/projects' },
  { icon: FiAward,    label: 'Education',  path: '/admin/education' },
  { icon: FiHeart,   label: 'Foundation',path: '/admin/foundation' },
  { icon: FiFileText, label: 'Blog Posts',  path: '/admin/blog' },
  { icon: FiMail,     label: 'Messages',   path: '/admin/messages' },
]

export default function AdminLayout({ children }) {
  const { logout } = useAuth()
  const { dark, toggle } = useTheme()
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className={`min-h-screen flex ${dark ? 'bg-[#0a0f1a]' : 'bg-cream'}`}>

      {/* ── Sidebar ── */}
      <aside className={`w-56 border-r flex flex-col shrink-0 ${dark ? 'bg-navy border-cream/5' : 'bg-white border-navy/10'}`}>
        {/* Brand */}
        <div className="px-6 py-6 border-b border-cream/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-gold/40 flex items-center justify-center shrink-0">
              <span className="font-display text-gold text-sm font-semibold">CE</span>
            </div>
            <div>
              <p className={`font-sans text-xs font-medium leading-none ${dark ? 'text-cream' : 'text-navy'}`}>Admin Panel</p>
              <p className={`font-sans text-xs mt-0.5 ${dark ? 'text-cream/30' : 'text-navy/40'}`}>Christopher Ezeafulukwe</p>
            </div>
          </div>
        </div>

        {/* Theme Toggle */}
        <div className={`px-4 py-3 border-b ${dark ? 'border-cream/5' : 'border-navy/10'}`}>
          <button 
            onClick={toggle}
            className={`w-full flex items-center justify-between px-3 py-2 transition-colors ${dark ? 'bg-cream/5 hover:bg-cream/10' : 'bg-navy/5 hover:bg-navy/10'}`}
          >
            <span className={`font-sans text-xs ${dark ? 'text-cream/60' : 'text-navy/60'}`}>{dark ? 'Dark Mode' : 'Light Mode'}</span>
            {dark ? <FiMoon size={14} className="text-gold" /> : <FiSun size={14} className="text-gold" />}
          </button>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ icon: Icon, label, path }) => (
            <NavLink key={path} to={path} end={path === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 font-sans text-xs tracking-wide transition-colors
                 ${isActive
                   ? 'bg-gold/10 text-gold border-l-2 border-gold'
                   : `${dark ? 'text-cream/50 hover:text-cream hover:bg-cream/5' : 'text-navy/50 hover:text-navy hover:bg-navy/5'} border-l-2 border-transparent`}`
              }>
              <Icon size={14} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer actions */}
        <div className={`px-3 py-4 border-t space-y-1 ${dark ? 'border-cream/5' : 'border-navy/10'}`}>
          <a href="/" target="_blank" rel="noreferrer"
            className={`flex items-center gap-3 px-3 py-2.5 font-sans text-xs transition-colors tracking-wide ${dark ? 'text-cream/40 hover:text-cream/70' : 'text-navy/40 hover:text-navy/70'}`}>
            <FiExternalLink size={14} />
            View Site
          </a>
          <button onClick={handleLogout}
            className="w-full flex items-center gap-3 px-3 py-2.5 font-sans text-xs
                       text-red-400/60 hover:text-red-400 transition-colors tracking-wide">
            <FiLogOut size={14} />
            Sign Out
          </button>
        </div>
      </aside>

      {/* ── Main Content ── */}
      <main className="flex-1 overflow-auto">
        {children}
      </main>
    </div>
  )
}