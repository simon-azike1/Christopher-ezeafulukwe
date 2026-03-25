import { useState, useEffect } from 'react'
import PageWrapper from '../components/ui/PageWrapper'
import SectionHeader from '../components/ui/SectionHeader'
import { motion } from 'framer-motion'
import { FaArrowRight } from 'react-icons/fa'
import api from '../util/api'

const emptyProjects = [
  {
    category: 'Energy Infrastructure',
    title: 'Power Generation Expansion',
    description: 'Driving Transcorp Energy\'s capacity expansion initiatives across thermal and renewable energy assets, aiming to close Nigeria\'s energy gap.',
    status: 'Ongoing',
    tags: ['Generation', 'Infrastructure', 'Nigeria'],
  },
  {
    category: 'Renewable Energy',
    title: 'Clean Energy Transition',
    description: 'Championing Nigeria\'s pathway to renewable energy integration within Transcorp\'s portfolio — solar, gas-to-power, and hybrid solutions.',
    status: 'In Planning',
    tags: ['Renewables', 'Sustainability', 'Africa'],
  },
  {
    category: 'Policy & Advocacy',
    title: 'Energy Sector Reform',
    description: 'Active engagement with government and regulators on the reform of Nigeria\'s electricity market, tariff structures, and private sector participation.',
    status: 'Active',
    tags: ['Policy', 'Regulation', 'Reform'],
  },
  {
    category: 'Social Impact',
    title: 'The Ezeafulukwe Foundation',
    description: 'A forthcoming initiative to drive educational access, youth empowerment, and sustainable community development across Africa.',
    status: 'Coming Soon',
    tags: ['Education', 'Youth', 'Africa'],
    link: '/foundation',
  },
]

export default function Projects() {
  const [projects, setProjects] = useState(emptyProjects)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/content/projects')
      .then(res => {
        if (res.data.success && res.data.data.length > 0) {
          setProjects(res.data.data)
        }
      })
      .catch(console.error)
      .finally(() => setLoading(false))
  }, [])
  return (
    <PageWrapper>
      {/* ── Video Hero ── */}
      <section className="min-h-[70vh] relative flex items-center overflow-hidden pt-32 md:pt-40">
        {/* Video background */}
        <video 
          autoPlay 
          loop 
          muted 
          playsInline 
          className="absolute inset-0 w-full h-full object-cover"
        >
          {/* <source src="/projects-bg.mp4" type="video/mp4" /> */}
        </video>
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-navy/90" />
        {/* Grid texture */}
        <div className="absolute inset-0 opacity-[0.03]" style={{ backgroundImage: 'repeating-linear-gradient(45deg,#C9922A 0,#C9922A 1px,transparent 0,transparent 50%)', backgroundSize: '20px 20px' }} />
        {/* Gold accent bar */}
        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold to-transparent" />

        <div className="max-w-7xl mx-auto px-6 md:px-12 lg:px-24 relative z-10 text-center">
          <motion.p 
            initial={{ opacity:0,y:20 }} 
            animate={{ opacity:1,y:0 }} 
            className="font-sans text-gold text-[10px] md:text-xs tracking-[0.4em] uppercase mb-6"
          >
            Vision & Initiatives
          </motion.p>
          <motion.h1 
            initial={{ opacity:0,y:30 }} 
            animate={{ opacity:1,y:0 }} 
            className="font-display text-cream text-5xl md:text-7xl lg:text-8xl font-light mb-4 leading-tight"
          >
            Projects
          </motion.h1>
          <motion.div 
            initial={{ opacity:0 }} 
            animate={{ opacity:1 }} 
            className="w-16 md:w-20 h-0.5 bg-gold mx-auto mb-12" 
          />
        </div>
      </section>

      {/* ── Main Content ── */}
      <section className="section-padding page-bg px-6 md:px-12">
        <div className="max-w-6xl mx-auto">
          <SectionHeader 
            eyebrow="Initiatives" 
            title="Building Tomorrow's Africa, Today"
            subtitle="Projects and ventures that reflect Christopher's commitment to energy access, institutional reform, and African development." 
            className="mb-12 md:mb-16 text-left"
          />

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {loading ? (
              <div className="col-span-2 text-center py-12 text-cream/40 font-sans">Loading projects...</div>
            ) : projects.map((p, i) => (
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
                {p.image && (
                  <div className="w-full h-96 mb-6 overflow-hidden rounded-none">
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
                )}
                <div className="flex justify-between items-start mb-6">
                  <span className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-gold font-semibold">{p.category}</span>
                  <span 
                    className="font-sans text-[10px] md:text-xs px-3 py-1 tracking-wide rounded-none"
                    style={{ 
                      backgroundColor: p.status === 'Ongoing' || p.status === 'Active' ? 'rgba(201,146,42,0.1)' : 'rgba(11,31,58,0.2)',
                      color: p.status === 'Ongoing' || p.status === 'Active' ? 'var(--color-gold)' : 'var(--text-muted)'
                    }}
                  >
                    {p.status}
                  </span>
                </div>
                <h3 className="font-display text-xl md:text-2xl font-semibold mb-3 group-hover:text-gold transition-colors"
                  style={{ color: 'var(--text-primary)' }}>
                  {p.title}
                </h3>
                <div className="w-8 h-0.5 bg-gold mb-4 opacity-50 group-hover:w-12 transition-all" />
                <p className="font-body text-sm md:text-base leading-relaxed mb-6" style={{ color: 'var(--text-muted)' }}>
                  {p.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-8">
                  {(p.technologies || p.tags || []).map(t => (
                    <span 
                      key={t} 
                      className="font-sans text-[10px] px-2 py-1 rounded-none"
                      style={{ 
                        color: 'var(--text-muted)', 
                        border: '1px solid var(--border-subtle)',
                        opacity: 0.7
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
                {p.link && (
                  <a 
                    href={p.link} 
                    className="font-sans text-[10px] md:text-xs text-gold tracking-widest uppercase flex items-center gap-2 group-hover:gap-3 transition-all font-bold"
                  >
                    Learn More <FaArrowRight />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </PageWrapper>
  )
}
