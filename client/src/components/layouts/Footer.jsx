import { Link } from 'react-router-dom'
import { FaLinkedin, FaEnvelope } from 'react-icons/fa'

export default function Footer() {
  return (
    <footer className="bg-navy dark:bg-cream text-cream dark:text-navy border-t border-cream/10 dark:border-navy/20 mt-24">
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Brand */}
          <div>
            <h3 className="font-display text-gold text-2xl font-semibold mb-2">Christopher</h3>
            <p className="font-sans text-xs tracking-[0.3em] uppercase text-cream/40 dark:text-navy/40 mb-4">Ezeafulukwe</p>
            <p className="font-sans text-sm leading-relaxed text-cream/80 dark:text-navy/80">
              MD/CEO, Transcorp Energy Limited. Energy executive, legal scholar, and advocate for Africa's sustainable development.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase text-gold mb-6">Navigation</h4>
            <div className="grid grid-cols-2 gap-2">
              {[['About', '/about'], ['Career', '/career'], ['Education', '/education'],
                ['Projects', '/projects'], ['Blog', '/blog'], ['Foundation', '/foundation'], ['Contact', '/contact']].map(([label, path]) => (
                <Link key={path} to={path} className="font-sans text-sm hover:text-gold dark:hover:text-gold transition-colors">
                  {label}
                </Link>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-sans text-xs tracking-widest uppercase text-gold mb-6">Connect</h4>
            <div className="flex flex-col gap-3">
              <a href="https://www.linkedin.com/in/christopher-ezeafulukwe-121450ba/" target="_blank" rel="noreferrer"
                className="flex items-center gap-3 font-sans text-sm hover:text-gold transition-colors">
                <FaLinkedin /> LinkedIn Profile
              </a>
              <a href="/contact" className="flex items-center gap-3 font-sans text-sm hover:text-gold transition-colors">
                <FaEnvelope /> Send a Message
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-cream/10 dark:border-navy/20 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="font-sans text-xs tracking-wider text-cream/50 dark:text-navy/50">
            © {new Date().getFullYear()} Christopher Ezeafulukwe. All rights reserved.
          </p>
          <div className="w-16 h-px bg-gold/40" />
          <p className="font-sans text-xs text-cream/50 dark:text-navy/50">
            Built with integrity & purpose.
          </p>
        </div>
      </div>
    </footer>
  )
}
