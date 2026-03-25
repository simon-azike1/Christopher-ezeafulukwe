import { useState, useEffect } from 'react'
import PageWrapper from '../components/ui/PageWrapper'
import SectionHeader from '../components/ui/SectionHeader'
import { motion } from 'framer-motion'
import { FaGraduationCap } from 'react-icons/fa'
import api from '../util/api'

const emptyDegrees = [
  { degree: 'LL.M — Energy Law', school: 'University of Houston Law Center', location: 'Houston, Texas, USA', detail: 'Specialisation in international energy law, oil & gas transactions, and regulatory frameworks.', flag: '🇺🇸' },
  { degree: 'LL.M — Corporate & Commercial Law', school: 'University of Lagos', location: 'Lagos, Nigeria', detail: 'Advanced studies in commercial law, company law, and corporate governance.', flag: '🇳🇬' },
  { degree: 'B.L — Barrister at Law', school: 'Nigerian Law School', location: 'Abuja, Nigeria', detail: 'Professional qualification for legal practice in Nigeria.', flag: '🇳🇬' },
  { degree: 'LL.B — Bachelor of Laws', school: 'University of Lagos', location: 'Lagos, Nigeria', detail: 'Foundation in Nigerian law, jurisprudence, and legal theory.', flag: '🇳🇬' },
]

const emptyExecutive = [
  { program: 'Executive Education', school: 'IESE Business School', location: 'Barcelona, Spain', flag: '🇪🇸' },
  { program: 'Executive Education', school: 'Lagos Business School', location: 'Lagos, Nigeria', flag: '🇳🇬' },
]

export default function Education() {
  const [degrees, setDegrees] = useState(emptyDegrees)
  const [executive, setExecutive] = useState(emptyExecutive)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/content/education')
      .then(res => {
        if (res.data.success && res.data.data.length > 0) {
          const items = res.data.data
          // Map database fields to UI fields
          const degreeItems = items
            .filter(e => e.type !== 'executive')
            .map(e => ({
              degree: e.degree,
              school: e.institution,
              location: e.field ? `${e.field} • ${e.startYear || ''} - ${e.endYear || ''}` : (e.startYear ? `${e.startYear} - ${e.endYear}` : ''),
              detail: e.description || e.achievements?.join(' • ') || '',
              flag: '🎓'
            }))
          const execItems = items
            .filter(e => e.type === 'executive')
            .map(e => ({
              program: e.degree,
              school: e.institution,
              location: e.field ? `${e.field} • ${e.startYear || ''} - ${e.endYear || ''}` : (e.startYear ? `${e.startYear} - ${e.endYear}` : ''),
              flag: '🎓'
            }))
          if (degreeItems.length > 0) setDegrees(degreeItems)
          if (execItems.length > 0) setExecutive(execItems)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])
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
            Academic Foundation
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-cream text-4xl md:text-7xl font-light mb-6 leading-tight"
          >
            Education
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
            eyebrow="Credentials" 
            title="Scholarship Across Two Continents"
            subtitle="An academic journey spanning Nigerian law, corporate governance, and international energy law — culminating in world-class executive education." 
            className="mb-12 md:mb-16 text-left"
          />

          <h3 className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-gold mb-8 font-bold">Academic Degrees</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
            {degrees.map((d, i) => (
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
                <div className="flex items-start justify-between mb-6">
                  <div className="p-3 rounded-none" style={{ backgroundColor: 'rgba(201,146,42,0.1)' }}>
                    <FaGraduationCap className="text-gold text-2xl" />
                  </div>
                  <span className="text-2xl filter grayscale group-hover:grayscale-0 transition-all">{d.flag}</span>
                </div>
                <h4 className="font-display text-xl font-semibold mb-2" style={{ color: 'var(--text-primary)' }}>{d.degree}</h4>
                <p className="font-sans text-gold text-sm font-medium mb-1">{d.school}</p>
                <p className="font-sans text-xs tracking-wide mb-4" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>{d.location}</p>
                <p className="font-body text-sm leading-relaxed" style={{ color: 'var(--text-muted)' }}>{d.detail}</p>
              </motion.div>
            ))}
          </div>

          <h3 className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-gold mb-8 font-bold">Executive Education</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {executive.map((e, i) => (
              <motion.div 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }}
                className="p-8 border rounded-none transition-all"
                style={{
                  backgroundColor: 'var(--color-navy)',
                  borderColor: 'var(--color-gold)',
                  boxShadow: '0 4px 20px rgba(201,146,42,0.1)'
                }}
              >
                <span className="text-2xl mb-6 block">{e.flag}</span>
                <h4 className="font-display text-cream text-xl font-semibold mb-2">{e.program}</h4>
                <p className="font-sans text-gold text-sm font-medium mb-1">{e.school}</p>
                <p className="font-sans text-xs tracking-wide" style={{ color: 'rgba(255,255,255,0.4)' }}>{e.location}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
