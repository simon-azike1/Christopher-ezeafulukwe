import { motion, useScroll, useTransform } from 'framer-motion'
import PageWrapper from '../components/ui/PageWrapper'
import SectionHeader from '../components/ui/SectionHeader'
import Portrait from '../components/ui/Portrait'
import { Link } from 'react-router-dom'
import { FaLinkedin, FaGraduationCap, FaGavel, FaBolt, FaQuoteLeft } from 'react-icons/fa'

export default function About() {
  const { scrollYProgress } = useScroll()
  const portraitY = useTransform(scrollYProgress, [0, 1], [0, 30])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.12, delayChildren: 0.2 }
    }
  }

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 12 }
    }
  }

  const bioItems = [
    {
      title: 'Energy Executive',
      desc: 'Leading Transcorp Energy Limited with a vision for Africa\'s sustainable power future.',
      icon: <FaBolt className="text-gold" />
    },
    {
      title: 'Legal Scholar',
      desc: 'LL.M in Energy Law from University of Houston, bridging law and commerce.',
      icon: <FaGavel className="text-gold" />
    },
    {
      title: 'Global Perspective',
      desc: 'International training applied to Africa\'s unique energy challenges.',
      icon: <FaGraduationCap className="text-gold" />
    }
  ]

  return (
    <PageWrapper>
      {/* ── Hero Header ───────────────────────────────────────── */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-navy pt-64 md:pt-72 pb-20 section-padding relative overflow-hidden"
      >
        <div
          className="absolute inset-0 opacity-[0.02]"
          style={{
            backgroundImage: 'radial-gradient(#C9922A 1px, transparent 1px)',
            backgroundSize: '32px 32px'
          }}
        />

        <div className="max-w-7xl mx-auto relative z-10 text-center mt-15">
          <motion.p
            initial={{ opacity: 0, letterSpacing: '0.2em' }}
            animate={{ opacity: 1, letterSpacing: '0.4em' }}
            transition={{ duration: 0.8 }}
            className="font-sans text-gold text-xs tracking-[0.4em] uppercase mb-4"
          >
            Who He Is
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.7 }}
            className="font-display text-cream text-5xl md:text-7xl font-light mb-6"
          >
            About
          </motion.h1>

          <motion.div
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="w-20 h-0.5 mx-auto"
            style={{ background: 'linear-gradient(to right, transparent, var(--color-gold), transparent)' }}
          />
        </div>
      </motion.div>

      {/* ── Main Content ──────────────────────────────────────── */}
      <section className="section-padding page-bg px-6 md:px-12">
        {/* 🔁 Increased gap for more space between columns */}
        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-20 lg:gap-40">

          {/* ── Left Column ── */}
          <motion.div
            style={{ y: portraitY }}
            className="lg:col-span-1 flex flex-col items-center lg:items-start gap-8 sticky top-24 self-start"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6 }}
              className="relative"
            >
              <div
                className="absolute -inset-3 blur-sm opacity-50"
                style={{ border: '2px solid rgba(201,146,42,0.3)' }}
              />
              <Portrait variant="about" size="lg" dark={false} className="relative z-10 drop-shadow-xl rounded-none" />
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2 }}
              className="w-full p-6 backdrop-blur-sm rounded-none"
              style={{
                backgroundColor: 'var(--bg-card)',
                border: '1px solid var(--border-subtle)',
                boxShadow: '0 4px 24px rgba(11,31,58,0.06)'
              }}
            >
              <h4 className="font-sans text-xs tracking-widest uppercase mb-5 flex items-center gap-2 justify-center lg:justify-start"
                style={{ color: 'var(--color-gold)' }}>
                <span className="w-1.5 h-1.5 rounded-full bg-gold" />
                At a Glance
              </h4>

              <div className="space-y-3">
                {[
                  { label: 'Title',       value: 'MD/CEO, Transcorp Energy',      icon: '💼' },
                  { label: 'Nationality', value: 'Nigerian',                      icon: '🇳🇬' },
                  { label: 'Expertise',   value: 'Energy Law & Governance',       icon: '⚖️' },
                  { label: 'Education',   value: 'University of Houston LL.M',    icon: '🎓' },
                  { label: 'LinkedIn',    value: '@christopher-ezeafulukwe',      icon: '🔗',
                    link: 'https://www.linkedin.com/in/christopher-ezeafulukwe-121450ba/' },
                ].map(({ label, value, icon, link }) => (
                  <motion.div
                    key={label}
                    whileHover={{ x: 4 }}
                    className="flex items-start justify-between py-2.5 transition-all"
                    style={{ borderBottom: '1px solid var(--border-subtle)' }}
                  >
                    <span className="font-sans text-[11px] uppercase tracking-wider flex items-center gap-2"
                      style={{ color: 'var(--text-muted)' }}>
                      <span className="text-lg">{icon}</span>
                      {label}
                    </span>
                    {link ? (
                      <a href={link} target="_blank" rel="noopener noreferrer"
                        className="font-sans text-sm font-medium text-right max-w-[65%] hover:text-gold transition-colors"
                        style={{ color: 'var(--text-primary)' }}>
                        {value}
                      </a>
                    ) : (
                      <span className="font-sans text-sm font-medium text-right max-w-[65%]"
                        style={{ color: 'var(--text-primary)' }}>
                        {value}
                      </span>
                    )}
                  </motion.div>
                ))}
              </div>

              {/* 🔁 Fixed CSS variable typo & cleaned URL */}
              <a
                href="https://www.linkedin.com/in/christopher-ezeafulukwe-121450ba/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-6 inline-flex items-center gap-2 text-sm font-medium hover:text-gold-light transition-colors"
                style={{ color: 'var(--color-gold)' }}
              >
                <FaLinkedin className="text-lg" />
                Connect on LinkedIn
              </a>
            </motion.div>
          </motion.div>

          {/* ── Right Column: Biography ── */}
          {/* 🔁 Added pl-0 lg:pl-12 for extra separation on large screens */}
         < motion.div
  variants={containerVariants}
  initial="hidden"
  whileInView="visible"
  viewport={{ once: true, margin: '-100px' }}
  className="lg:col-span-2 pl-0 lg:pl-12"
>
  <SectionHeader
    eyebrow="Biography"
    title="A Life in Service of Energy & Nation"
    className="mb-10 text-left"
    // The SectionHeader will now render with var(--text-primary) for the title
  />


            <motion.div variants={containerVariants} className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
              {bioItems.map((item, idx) => (
                <motion.div
                  key={idx}
                  variants={itemVariants}
                  className="p-4 transition-colors rounded-none"
                  style={{
                    backgroundColor: 'var(--bg-card-alt)',
                    border: '1px solid var(--border-subtle)',
                  }}
                  whileHover={{ borderColor: 'rgba(201,146,42,0.3)' }}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-none" style={{ backgroundColor: 'rgba(201,146,42,0.1)' }}>
                      {item.icon}
                    </div>
                    <h4 className="font-sans text-sm font-semibold" style={{ color: 'var(--text-primary)' }}>
                      {item.title}
                    </h4>
                  </div>
                  <p className="font-body text-xs leading-relaxed" style={{ color: 'var(--text-primary)' }}>
                    {item.desc}
                  </p>
                </motion.div>
              ))}
            </motion.div>


            <motion.div variants={containerVariants} className="space-y-6 font-body leading-relaxed text-base text-left">
              {[
                "Christopher Ezeafulukwe is one of Nigeria's foremost energy executives, currently serving as the Managing Director and Chief Executive Officer of Transcorp Energy Limited — a subsidiary of Transnational Corporation of Nigeria Plc (Transcorp), one of Africa's largest diversified conglomerates.",
                "His career is a remarkable convergence of law, finance, and energy. A trained lawyer with advanced degrees from both Nigerian and American institutions, he has navigated the complex regulatory, commercial, and strategic terrains of Nigeria's power sector for over two decades.",
                "Prior to his current role, he served as MD/CEO of Transcorp Power Limited — where under his leadership, Transcorp Power became the first successor power company from the 2013 privatisation programme to be discharged from post-privatisation monitoring by the National Council on Privatization, having surpassed all expectations. He also led the Abuja Electricity Distribution Company (AEDC) as MD/CEO following Transcorp's acquisition of a 60% stake.",
                "Beyond his executive responsibilities, Christopher is a passionate advocate for corporate governance, institutional reform, and sustainable energy access in Africa. His vision extends far beyond balance sheets — he believes reliable, affordable energy is the foundation upon which Africa's next chapter will be written.",
                "A member of the Nigerian Bar Association, the Institute of Chartered Secretaries & Administrators of Nigeria, and the Association of International Petroleum Negotiators, he brings both legal precision and boardroom acumen to every endeavour. His international training — including an LL.M in Energy, Environmental & Natural Resources Law from the University of Houston — provides a globally-informed perspective on Africa's unique energy challenges."
              ].map((para, idx) => (
                <motion.p
                  key={idx}
                  variants={itemVariants}
                  style={{ color: 'var(--text-primary)' }}
                >
                  {para}
                </motion.p>
              ))}
            </motion.div>


            <motion.blockquote
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="relative pl-8 my-12 py-6 rounded-none"
              style={{
                borderLeft: '4px solid var(--color-gold)',
                background: 'linear-gradient(to right, rgba(201,146,42,0.05), transparent)'
              }}
            >
              <FaQuoteLeft
                className="absolute -top-3 -left-4 text-3xl"
                style={{ color: 'rgba(201,146,42,0.3)' }}
              />
              <p className="font-display text-2xl md:text-3xl font-light italic leading-snug relative z-10"
                style={{ color: 'var(--text-primary)' }}>
                "Chris is an invaluable member of the Transcorp team. His insights, drive and commitment
                to business execution are exemplary."
              </p>
              <footer className="font-sans text-xs tracking-widest uppercase mt-5 flex items-center gap-2"
                style={{ color: 'var(--color-gold)' }}>
                <span className="w-8 h-px" style={{ backgroundColor: 'rgba(201,146,42,0.5)' }} />
                — Tony O. Elumelu, Chairman, Transcorp
              </footer>
            </motion.blockquote>

            <motion.div
              initial={{ opacity: 0, y: 15 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 }}
              className="flex flex-wrap gap-4 pt-4"
            >
              <Link
                to="/career"
                className="group inline-flex items-center gap-2 px-6 py-3.5 font-medium rounded-none transition-all duration-300"
                style={{
                  backgroundColor: 'var(--color-gold)',
                  color: 'var(--color-navy)',
                  boxShadow: '0 4px 15px rgba(201,146,42,0.2)'
                }}
              >
                Career Timeline
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>
                  →
                </motion.span>
              </Link>
              <Link
                to="/education"
                className="inline-flex items-center gap-2 px-6 py-3.5 font-medium rounded-none transition-all duration-300"
                style={{
                  border: '1px solid var(--border-medium)',
                  color: 'var(--text-primary)',
                  backgroundColor: 'transparent'
                }}
              >
                Education
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}