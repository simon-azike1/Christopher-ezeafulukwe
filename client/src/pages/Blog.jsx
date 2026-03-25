import { useState, useEffect } from 'react'
import PageWrapper from '../components/ui/PageWrapper'
import SectionHeader from '../components/ui/SectionHeader'
import { motion } from 'framer-motion'
import api from '../util/api'

const emptyPosts = [
  {
    date: 'March 2025',
    category: 'Energy Policy',
    title: 'Rethinking Nigeria\'s Electricity Tariff Architecture',
    excerpt: 'A frank assessment of why tariff reform is not just an economic necessity but a social imperative for Nigeria\'s power sector sustainability.',
    readTime: '7 min read',
  },
  {
    date: 'January 2025',
    category: 'Leadership',
    title: 'The Anatomy of Transformative CEO Leadership in Africa',
    excerpt: 'Drawing from two decades in executive roles, reflections on what it truly takes to lead large organisations through disruption in emerging markets.',
    readTime: '6 min read',
  },
  {
    date: 'November 2024',
    category: 'Africa',
    title: 'Energy as the Cornerstone of African Economic Sovereignty',
    excerpt: 'Without reliable, affordable energy, Africa\'s ambitious development goals will remain aspirational. Here\'s a roadmap for what must change.',
    readTime: '9 min read',
  },
  {
    date: 'September 2024',
    category: 'Corporate Governance',
    title: 'Why Board Governance Must Evolve for the African Context',
    excerpt: 'Western governance frameworks, while instructive, require thoughtful adaptation to reflect African market realities, stakeholder dynamics, and cultural contexts.',
    readTime: '5 min read',
  },
]

export default function Blog() {
  const [posts, setPosts] = useState(emptyPosts)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    api.get('/api/blog')
      .then(res => {
        if (res.data.success && res.data.data.length > 0) {
          const mapped = res.data.data.map(p => ({
            ...p,
            date: p.publishedAt ? new Date(p.publishedAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }) : new Date(p.createdAt).toLocaleDateString('en-US', { month: 'long', year: 'numeric' }),
            readTime: p.readTime || '5 min read',
          }))
          setPosts(mapped)
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
            Thought Leadership
          </motion.p>
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-cream text-4xl md:text-7xl font-light mb-6 leading-tight"
          >
            Insights
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
            eyebrow="Blog" 
            title="Perspectives on Energy, Leadership & Africa"
            subtitle="Original thinking on the issues that matter most — from energy policy to executive leadership to Africa's sustainable future." 
            className="mb-12 md:mb-16 text-left"
          />

          <div className="space-y-6 md:space-y-8">
            {posts.map((p, i) => (
              <motion.article 
                key={i} 
                initial={{ opacity: 0, y: 20 }} 
                whileInView={{ opacity: 1, y: 0 }} 
                viewport={{ once: true }} 
                transition={{ delay: i * 0.1 }}
                className="p-6 md:p-8 transition-all cursor-pointer group rounded-none"
                style={{
                  backgroundColor: 'var(--bg-card)',
                  border: '1px solid var(--border-subtle)',
                  boxShadow: '0 4px 24px rgba(11,31,58,0.04)'
                }}
              >
                <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 mb-4">
                  <span className="font-sans text-[10px] md:text-xs tracking-widest uppercase text-gold font-semibold">{p.category}</span>
                  <div className="hidden sm:block w-1 h-1 rounded-full bg-gold/30" />
                  <span className="font-sans text-[10px] md:text-xs" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>{p.date}</span>
                  <span className="font-sans text-[10px] md:text-xs sm:ml-auto" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>{p.readTime}</span>
                </div>
                <h2 className="font-display text-xl md:text-3xl font-semibold mb-3 group-hover:text-gold transition-colors leading-snug"
                  style={{ color: 'var(--text-primary)' }}>
                  {p.title}
                </h2>
                <div className="w-8 h-0.5 bg-gold mb-4 opacity-50 group-hover:w-12 transition-all" />
                <p className="font-body text-sm md:text-base leading-relaxed" style={{ color: 'var(--text-muted)' }}>
                  {p.excerpt}
                </p>
                <p className="font-sans text-[10px] md:text-xs text-gold tracking-widest uppercase mt-6 flex items-center gap-2 font-bold">
                  Read Article 
                  <span className="group-hover:translate-x-1 transition-transform">→</span>
                </p>
              </motion.article>
            ))}
          </div>

          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="mt-16 text-center p-8 md:p-12 rounded-none"
            style={{
              backgroundColor: 'var(--bg-card-alt)',
              border: '1px solid var(--border-subtle)'
            }}
          >
            <p className="font-sans text-[10px] md:text-xs tracking-widest uppercase mb-3" style={{ color: 'var(--text-muted)', opacity: 0.6 }}>
              More articles coming soon
            </p>
            <p className="font-display text-xl md:text-2xl mb-8" style={{ color: 'var(--text-primary)' }}>
              Connect to stay updated
            </p>
            <a 
              href="/contact" 
              className="inline-flex items-center gap-2 px-6 md:px-8 py-3 md:py-4 text-sm md:text-base font-medium rounded-none transition-all duration-300"
              style={{
                backgroundColor: 'var(--color-gold)',
                color: 'var(--color-navy)',
                boxShadow: '0 4px 15px rgba(201,146,42,0.2)'
              }}
            >
              Get in Touch
            </a>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}
