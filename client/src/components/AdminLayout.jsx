import { NavLink, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { FiGrid, FiFileText, FiMail, FiLogOut, FiPlus, FiExternalLink, FiBriefcase, FiAward, FiHeart } from 'react-icons/fi'

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
  const navigate = useNavigate()

  const handleLogout = () => {
    logout()
    navigate('/admin/login')
  }

  return (
    <div className="min-h-screen bg-[#0a0f1a] flex">

      {/* ── Sidebar ── */}
      <aside className="w-56 bg-navy border-r border-cream/5 flex flex-col shrink-0">
        {/* Brand */}
        <div className="px-6 py-6 border-b border-cream/5">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 border border-gold/40 flex items-center justify-center shrink-0">
              <span className="font-display text-gold text-sm font-semibold">CE</span>
            </div>
            <div>
              <p className="font-sans text-cream text-xs font-medium leading-none">Admin Panel</p>
              <p className="font-sans text-cream/30 text-xs mt-0.5">Christopher Ezeafulukwe</p>
            </div>
          </div>
        </div>

        {/* Nav */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(({ icon: Icon, label, path }) => (
            <NavLink key={path} to={path} end={path === '/admin'}
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 font-sans text-xs tracking-wide transition-colors
                 ${isActive
                   ? 'bg-gold/10 text-gold border-l-2 border-gold'
                   : 'text-cream/50 hover:text-cream hover:bg-cream/5 border-l-2 border-transparent'}`
              }>
              <Icon size={14} />
              {label}
            </NavLink>
          ))}
        </nav>

        {/* Footer actions */}
        <div className="px-3 py-4 border-t border-cream/5 space-y-1">
          <a href="/" target="_blank" rel="noreferrer"
            className="flex items-center gap-3 px-3 py-2.5 font-sans text-xs text-cream/40
                       hover:text-cream/70 transition-colors tracking-wide">
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