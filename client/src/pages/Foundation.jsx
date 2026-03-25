import { useState, useEffect } from 'react'
import PageWrapper from '../components/ui/PageWrapper'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { FaGraduationCap, FaBolt, FaUsers, FaBalanceScale } from 'react-icons/fa'
import api from '../util/api'
import { useTheme } from '../context/ThemeContext'

const emptyPillars = [
  { 
    icon: <FaGraduationCap />, 
    title: 'Education Access', 
    desc: 'Providing scholarships, learning materials, and infrastructure to underserved communities across Africa.' 
  },
  { 
    icon: <FaBolt />, 
    title: 'Energy for Communities', 
    desc: 'Championing off-grid and renewable energy solutions to power schools, clinics, and homes in rural Africa.' 
  },
  { 
    icon: <FaUsers />, 
    title: 'Youth Empowerment', 
    desc: 'Mentorship, skills development, and entrepreneurship programs to equip Africa\'s next generation of leaders.' 
  },
  { 
    icon: <FaBalanceScale />, 
    title: 'Governance & Institutions', 
    desc: 'Supporting initiatives that strengthen public institutions and accountability across the continent.' 
  },
]

export default function Foundation() {
  const { dark } = useTheme()
  const [pillars, setPillars] = useState(emptyPillars)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/content/foundation')
      .then(res => {
        if (res.data.success && res.data.data.length > 0) {
          const iconMap = {
            'Education Access': <FaGraduationCap />,
            'Energy for Communities': <FaBolt />,
            'Youth Empowerment': <FaUsers />,
            'Governance & Institutions': <FaBalanceScale />,
          }
          const mapped = res.data.data.map(p => ({
            ...p,
            desc: p.description,
            icon: iconMap[p.title] || <FaGraduationCap />,
          }))
          setPillars(mapped)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])
  return (
    <PageWrapper>
      {/* Full-screen hero */}
      <section className={`min-h-screen relative flex items-center overflow-hidden ${dark ? 'bg-navy' : 'bg-cream'}`}>
        <div className="absolute inset-0 opacity-5"
          style={{ backgroundImage: 'repeating-linear-gradient(-45deg, #C9922A 0, #C9922A 1px, transparent 0, transparent 50%)', backgroundSize: '30px 30px' }} />
        <div className={`absolute right-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold to-transparent ${dark ? '' : 'hidden'}`} />

        <div className="max-w-5xl mx-auto px-6 md:px-12 lg:px-24 pt-40 md:pt-48 pb-20 text-center relative z-10">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }} 
            animate={{ opacity: 1, scale: 1 }} 
            transition={{ duration: 0.8 }}
            className="w-24 h-24 border border-gold/40 flex items-center justify-center mx-auto mb-10 rounded-none"
          >
            <span className="font-display text-gold text-3xl font-semibold">EF</span>
          </motion.div>
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.2 }}
            className="font-sans text-gold text-[10px] md:text-xs tracking-[0.5em] uppercase mb-6"
          >
            A Vision for Africa
          </motion.p>
          <motion.h1 
            initial={{ opacity: 0, y: 30 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.3 }}
            className={`font-display text-4xl md:text-7xl font-light leading-tight mb-6 ${dark ? 'text-cream' : 'text-navy'}`}
          >
            The Ezeafulukwe  
<em className="text-gold italic font-semibold">Foundation</em>
          </motion.h1>
          <motion.div 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.5 }}
            className="w-16 md:w-20 h-0.5 bg-gold mx-auto my-8" 
          />
          <motion.p 
            initial={{ opacity: 0, y: 20 }} 
            animate={{ opacity: 1, y: 0 }} 
            transition={{ delay: 0.6 }}
            className={`font-body text-lg md:text-xl leading-relaxed max-w-3xl mx-auto mb-10 ${dark ? 'text-cream/70' : 'text-navy/70'}`}
          >
            A forthcoming initiative dedicated to education, energy access, and the empowerment of Africa's youth — because a continent's greatest asset is always its people.
          </motion.p>
          <motion.span 
            initial={{ opacity: 0 }} 
            animate={{ opacity: 1 }} 
            transition={{ delay: 0.8 }}
            className="inline-block font-sans text-[10px] md:text-xs tracking-widest uppercase bg-gold/10 text-gold border border-gold/30 px-6 py-3 rounded-none font-bold"
          >
            Launching Soon
          </motion.span>
        </div>
      </section>

      {/* Pillars */}
      <section className="section-padding page-bg px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <p className="font-sans text-gold text-[10px] md:text-xs tracking-[0.4em] uppercase mb-4">Our Pillars</p>
            <h2 className="font-display text-3xl md:text-5xl font-light" style={{ color: 'var(--text-primary)' }}>Areas of Impact</h2>
            <div className="w-16 h-0.5 bg-gold mx-auto mt-6" />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pillars.map((p, i) => (
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
                {p.image ? (
                  <div className="w-full h-40 mb-6 overflow-hidden rounded-none">
                    <motion.img 
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.5 }}
                      src={p.image} 
                      alt={p.title} 
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                    />
                  </div>
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center mb-6 group-hover:bg-gold/10 transition-colors rounded-none"
                    style={{ backgroundColor: 'rgba(201,146,42,0.05)' }}>
                    <span className="text-gold text-2xl">{p.icon}</span>
                  </div>
                )}
                <h3 className="font-display text-xl md:text-2xl font-semibold mb-3 group-hover:text-gold transition-colors"
                  style={{ color: 'var(--text-primary)' }}>
                  {p.title}
                </h3>
                <div className="w-8 h-0.5 bg-gold mb-4 opacity-50 group-hover:w-12 transition-all" />
                <p className="font-body text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {p.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-navy section-padding text-center px-6 md:px-12">
        <div className="max-w-3xl mx-auto">
          <h2 className={`font-display text-3xl md:text-5xl font-light mb-6 leading-tight ${dark ? 'text-cream' : 'text-navy'}`}>
            Be Part of the <em className="text-gold italic">Change</em>
          </h2>
          <p className={`font-body text-sm md:text-base mb-10 leading-relaxed ${dark ? 'text-cream/60' : 'text-navy/60'}`}>
            The Foundation is in its founding phase. If you share this vision for Africa's transformation, we'd love to connect with you.
          </p>
          <Link 
            to="/contact" 
            className="inline-flex items-center gap-2 px-8 py-4 font-medium rounded-none transition-all duration-300"
            style={{
              backgroundColor: 'var(--color-gold)',
              color: 'var(--color-navy)',
              boxShadow: '0 4px 15px rgba(201,146,42,0.2)'
            }}
          >
            Express Your Interest
          </Link>
        </div>
      </section>
    </PageWrapper>
  )
}
