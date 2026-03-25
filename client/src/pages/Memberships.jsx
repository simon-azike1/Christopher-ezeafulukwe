import PageWrapper from '../components/ui/PageWrapper'
import SectionHeader from '../components/ui/SectionHeader'
import { motion } from 'framer-motion'

const memberships = [
  { name: 'Nigerian Bar Association', abbr: 'NBA', desc: 'Member of the foremost association of legal practitioners in Nigeria, upholding standards of the legal profession.' },
  { name: 'Institute of Chartered Secretaries & Administrators of Nigeria', abbr: 'ICSAN', desc: 'Professional member committed to best-in-class corporate governance and company secretarial practice.' },
  { name: 'Association of International Petroleum Negotiators', abbr: 'AIPN', desc: 'Member of the global professional association for international energy contract specialists.' },
  { name: 'Institute of Directors Nigeria', abbr: 'IoD', desc: 'Board-level professional network promoting excellence in directorship and corporate leadership.' },
]

export default function Memberships() {
  return (
    <PageWrapper>
      {/* ── Hero Header ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-navy pt-64 md:pt-72 pb-20 px-6 md:px-12 section-padding relative overflow-hidden"
      >
        {/* Decorative dot pattern */}
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(#C9922A 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 mt-15">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ duration: 0.8 }}
            className="font-sans text-gold text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4"
          >
            Professional Network
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-cream text-4xl md:text-7xl font-light mb-6 leading-tight"
          >
            Memberships
          </motion.h1>
          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-16 md:w-20 h-0.5"
            style={{ background: 'linear-gradient(to right, var(--color-gold), transparent)' }}
          />
        </div>
      </motion.div>

      {/* ── Main Content ──────────────────────────────────────── */}
      <section className="section-padding page-bg px-6 md:px-12">
        <div className="max-w-5xl mx-auto">
          <SectionHeader 
            eyebrow="Affiliations" 
            title="Professional Bodies & Associations"
            subtitle="Active membership in leading professional associations that shape governance, law, and energy in Nigeria and beyond." 
            className="mb-12 md:mb-16 text-left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {memberships.map((m, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }}
                className="p-8 transition-all group rounded-none"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: '0 4px 24px rgba(11,31,58,0.04)'
                }}
              >
                <div className="w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors rounded-none"
                  style={{ backgroundColor: 'rgba(201,146,42,0.05)' }}>
                  <span className="font-sans text-xs font-bold text-gold tracking-wider">{m.abbr}</span>
                </div>
                <h3 className="font-display text-xl font-semibold mb-3" style={{ color: 'var(--text-primary)' }}>
                  {m.name}
                </h3>
                <div className="w-8 h-0.5 bg-gold mb-4 opacity-50 group-hover:w-12 transition-all" />
                <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {m.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
