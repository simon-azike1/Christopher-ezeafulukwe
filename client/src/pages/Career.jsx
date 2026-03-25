import PageWrapper from '../components/ui/PageWrapper'
import SectionHeader from '../components/ui/SectionHeader'
import { motion } from 'framer-motion'

const timeline = [
  {
    period: '2023 — Present',
    role: 'MD/CEO',
    company: 'Transcorp Energy Limited',
    description: 'Leading Transcorp\'s energy flagship in power generation and downstream operations. Driving expansion strategies and overseeing operational excellence across Nigeria\'s energy value chain.',
    type: 'current',
  },
  {
    period: '2019 — 2023',
    role: 'MD/CEO',
    company: 'Transcorp Power Limited',
    description: 'Headed one of Nigeria\'s largest independent power producers. Oversaw generation capacity expansion, stakeholder relations, regulatory engagements, and commercialisation strategies.',
    type: 'past',
  },
  {
    period: '2016 — 2019',
    role: 'Managing Director',
    company: 'Abuja Electricity Distribution Company (AEDC)',
    description: 'Led the distribution company serving Nigeria\'s Federal Capital Territory. Championed infrastructure modernisation, loss reduction programs, and improved customer service delivery.',
    type: 'past',
  },
  {
    period: '2013 — 2016',
    role: 'Executive Director',
    company: 'Transnational Corporation of Nigeria Plc',
    description: 'Served at the group level overseeing strategic corporate governance, investment structuring, and cross-sector business development across Transcorp\'s diversified portfolio.',
    type: 'past',
  },
  {
    period: 'Early Career',
    role: 'Legal & Financial Services',
    company: 'Various Institutions',
    description: 'Built a foundational career across legal practice and financial services, developing expertise in corporate law, commercial transactions, and regulatory compliance.',
    type: 'early',
  },
]

export default function Career() {
  return (
    <PageWrapper>
      {/* ── Hero Header ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-navy pt-40 md:pt-48 pb-20 px-6 md:px-12 section-padding relative overflow-hidden"
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
            Professional Journey
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-cream text-4xl md:text-7xl font-light mb-6 leading-tight"
          >
            Career
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
        <div className="max-w-4xl mx-auto">
          <SectionHeader
            eyebrow="Timeline"
            title="Two Decades of Executive Leadership"
            subtitle="A career defined by transformative roles at the intersection of energy, law, and corporate strategy."
            className="mb-12 md:mb-16 text-left"
          />

          <div className="relative">
            {/* Vertical line - hidden on mobile, visible on md+ */}
            <div 
              className="absolute left-6 top-0 bottom-0 w-px hidden md:block" 
              style={{ backgroundColor: 'var(--border-subtle)' }}
            />

            <div className="space-y-8 md:space-y-12">
              {timeline.map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="md:pl-20 relative"
                >
                  {/* Timeline Marker - hidden on mobile */}
                  <div 
                    className={`hidden md:flex absolute left-0 top-2 w-12 h-12 items-center justify-center z-10
                      ${item.type === 'current' ? 'bg-gold' : 'bg-navy/20 border'}`}
                    style={{ 
                      borderColor: item.type === 'current' ? 'transparent' : 'var(--border-subtle)',
                      backgroundColor: item.type === 'current' ? 'var(--color-gold)' : 'rgba(11,31,58,0.2)'
                    }}
                  >
                    <span className={`font-sans text-xs font-bold ${item.type === 'current' ? 'text-navy' : 'text-gold/40'}`}>
                      {String(i + 1).padStart(2, '0')}
                    </span>
                  </div>

                  {/* Career Card */}
                  <div 
                    className="p-6 md:p-8 rounded-none transition-all"
                    style={{ 
                      backgroundColor: item.type === 'current' ? 'var(--color-navy)' : 'var(--bg-card)',
                      border: `1px solid ${item.type === 'current' ? 'var(--color-gold)' : 'var(--border-subtle)'}`,
                      boxShadow: '0 4px 24px rgba(11,31,58,0.04)'
                    }}
                  >
                    <p className="font-sans text-[10px] md:text-xs tracking-widest uppercase mb-2 text-gold font-semibold">
                      {item.period}
                    </p>
                    <h3 className="font-display text-xl md:text-2xl font-semibold mb-1"
                      style={{ color: item.type === 'current' ? 'var(--color-cream)' : 'var(--text-primary)' }}>
                      {item.role}
                    </h3>
                    <p className="font-sans text-sm font-medium mb-4 text-gold/80">
                      {item.company}
                    </p>
                    <p className="font-body text-sm md:text-base leading-relaxed"
                      style={{ color: item.type === 'current' ? 'rgba(255,255,255,0.7)' : 'var(--text-muted)' }}>
                      {item.description}
                    </p>
                    
                    {item.type === 'current' && (
                      <div className="mt-6">
                        <span className="inline-block font-sans text-[10px] tracking-widest uppercase bg-gold text-navy px-3 py-1 font-bold rounded-none">
                          Current Role
                        </span>
                      </div>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
