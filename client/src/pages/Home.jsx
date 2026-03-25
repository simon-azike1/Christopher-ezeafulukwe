import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageWrapper from '../components/ui/PageWrapper'
import Portrait from '../components/ui/Portrait'
import { FaLinkedin, FaChevronDown } from 'react-icons/fa'
import { useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Home() {
  const { dark } = useTheme()
  const { scrollY } = useScroll()
  const containerRef = useRef(null)
  
  // ── Parallax Transforms ─────────────────────────────
  const videoY = useTransform(scrollY, [0, 500], [0, 150])
  const textY = useTransform(scrollY, [0, 300], [0, -50])
  const portraitScale = useTransform(scrollY, [0, 400], [1, 0.95])
  const overlayOpacity = useTransform(scrollY, [0, 200], [0.7, 0.9])
  const gridOpacity = useTransform(scrollY, [0, 300], [0.03, 0.01])
  
  // Smooth spring physics for natural motion
  const smoothVideoY = useSpring(videoY, { stiffness: 100, damping: 30 })
  const smoothTextY = useSpring(textY, { stiffness: 80, damping: 25 })

  // ── YouTube Config ─────────────────────────────
  const YOUTUBE_ID = '42myxeio3ik'
  const youtubeParams = new URLSearchParams({
    autoplay: '1',
    mute: '1',
    loop: '1',
    playlist: YOUTUBE_ID,
    controls: '0',
    showinfo: '0',
    rel: '0',
    modestbranding: '1',
    playsinline: '1',
    iv_load_policy: '3',
    disablekb: '1',
  }).toString()

  return (
    <PageWrapper>
      {/* ── Video Hero Section ─────────────────────────────────────────── */}
      <section 
        ref={containerRef}
        className={`relative min-h-screen flex items-center overflow-hidden ${dark ? 'bg-navy' : 'bg-cream'}`}
      >
        {/* YouTube Background with Parallax */}
        <motion.div 
          style={{ y: smoothVideoY }}
          className="absolute inset-0 w-full h-full pointer-events-none"
        >
          <div className="relative w-full h-full">
            {/* <iframe
              src={`https://www.youtube.com/embed/${YOUTUBE_ID}?${youtubeParams}`}
              className="absolute inset-0 w-[177.78vh] min-w-full min-h-full max-w-none 
                        left-1/2 -translate-x-1/2 object-cover"
              style={{ 
                aspectRatio: '16/9',
                filter: 'brightness(0.7) contrast(1.1)',
                transition: 'filter 0.5s ease'
              }}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              title="Background Video"
              loading="lazy"
            /> */}
            {/* Fallback poster image */}
            <div 
              className={`absolute inset-0 bg-cover bg-center ${dark ? 'bg-navy/90' : 'bg-cream'}`}
              style={{ backgroundImage: dark ? 'url("/images/hero-poster.jpg")' : 'none' }}
            />
          </div>
        </motion.div>
        
        {/* Dark Overlay for Text Readability */}
        <motion.div 
          style={{ opacity: overlayOpacity }}
          className={`absolute inset-0 transition-colors duration-300 ${dark ? 'bg-gradient-to-br from-navy/95 via-navy/80 to-navy/60' : 'bg-cream/30'}`}
        />
        
        {/* Subtle Animated Grid Texture */}
        <motion.div 
          className="absolute inset-0"
          style={{ 
            opacity: gridOpacity,
            backgroundImage: `repeating-linear-gradient(45deg, #C9922A 0, #C9922A 1px, transparent 1px, transparent 24px)`,
            backgroundSize: '24px 24px'
          }} 
        />

        {/* Left Gold Accent Bar with Parallax */}
        <motion.div 
          style={{ y: useTransform(scrollY, [0, 300], [0, -20]) }}
          className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold to-transparent opacity-80 ${dark ? '' : 'hidden'}`}
        />

        {/* Content Container */}
        <div className="relative z-10 max-w-7xl mx-auto px-6 md:px-12 lg:px-24 pt-32 pb-24 grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center w-full">
          
          {/* ── Text Content with Parallax ── */}
          <motion.div
            style={{ y: smoothTextY }}
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8"
          >
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-4 py-2 rounded-full bg-gold/10 border border-gold/30 backdrop-blur-sm"
            >
              <span className="w-2 h-2 rounded-full bg-gold animate-pulse" />
              <p className="font-sans text-gold text-xs tracking-[0.35em] uppercase">
                MD/CEO — Transcorp Energy Limited
              </p>
            </motion.div>

            <div className="space-y-2">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className={`font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.95] ${dark ? 'text-cream' : 'text-navy'}`}
              >
                Christopher
              </motion.h1>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-gold leading-[0.95]"
              >
                Ezeafulukwe
              </motion.h1>
            </div>

            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="w-24 h-0.5 bg-gradient-to-r from-gold to-transparent origin-left" 
            />

            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={`font-body text-lg md:text-xl leading-relaxed max-w-xl ${dark ? 'text-cream/90' : 'text-navy/80'}`}
            >
              Energy executive, legal scholar, and corporate governance leader with over two decades 
              shaping Africa's power sector through innovation, integrity, and impact.
            </motion.p>

            {/* Action Buttons */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="flex flex-wrap items-center gap-4"
            >
              <Link 
                to="/about" 
                className={`group inline-flex items-center gap-2 px-6 py-3.5 bg-gold font-medium rounded-lg hover:bg-gold-light transition-all duration-300 shadow-lg ${dark ? 'shadow-gold/20 hover:shadow-gold/40 text-navy' : 'shadow-gold/30 text-navy'}`}
              >
                Discover His Story
                <motion.span animate={{ x: [0, 4, 0] }} transition={{ repeat: Infinity, duration: 1.5 }}>→</motion.span>
              </Link>
              
              <Link 
                to="/career" 
                className={`inline-flex items-center gap-2 px-6 py-3.5 border font-medium rounded-lg transition-all duration-300 backdrop-blur-sm ${dark ? 'border-cream/40 text-cream hover:bg-cream/10' : 'border-navy/40 text-navy hover:bg-navy/5'}`}
              >
                View Career
              </Link>
              
              <a 
                href="https://www.linkedin.com/in/christopher-ezeafulukwe-121450ba/"
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-3 transition-colors duration-300 rounded-full hover:bg-white/10 ${dark ? 'text-cream/70 hover:text-gold' : 'text-navy/70 hover:text-gold'}`}
                aria-label="Connect on LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </motion.div>
          </motion.div>

          {/* ── Portrait Image with Parallax Scale ── */}
          <motion.div 
            style={{ scale: portraitScale }}
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5, duration: 0.8, ease: "easeOut" }}
            className="hidden lg:flex justify-center items-end relative"
          >
            {/* Decorative glow behind portrait */}
            <div className="absolute -inset-4 bg-gold/20 rounded-full blur-3xl opacity-30 animate-pulse" />
            <Portrait variant="hero" size="lg" dark={true} className="relative z-10 drop-shadow-2xl" />
          </motion.div>
        </div>

        {/* Scroll Indicator with Parallax Fade */}
        <motion.div 
          style={{ 
            opacity: useTransform(scrollY, [0, 150, 300], [1, 0.7, 0]),
            y: useTransform(scrollY, [0, 200], [0, 30])
          }}
          className={`absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 ${dark ? 'text-cream/50' : 'text-navy/50'}`}
        >
          <span className="font-sans text-[10px] tracking-[0.3em] uppercase">Explore</span>
          <motion.div 
            animate={{ y: [0, 10, 0] }} 
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="p-2 rounded-full border border-cream/30 hover:border-gold/60 transition-colors"
          >
            <FaChevronDown className="text-lg" />
          </motion.div>
        </motion.div>
      </section>

      {/* ── Stats Strip ─────────────────────────────────── */}
      <section className="relative bg-gold py-14 overflow-hidden">
        <div className="absolute inset-0 opacity-10" 
          style={{ 
            backgroundImage: 'radial-gradient(#1a1a2e 1px, transparent 1px)', 
            backgroundSize: '24px 24px' 
          }} 
        />
        
        <div className="relative max-w-7xl mx-auto px-6 md:px-12 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          {[
            { value: '20+', label: 'Years of Experience' },
            { value: '3', label: 'CEO Appointments' },
            { value: 'LL.M', label: 'Energy Law, Houston' },
            { value: 'Nigeria', label: 'Power Sector Leader' },
          ].map(({ value, label }, index) => (
            <motion.div 
              key={label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="group"
            >
              <p className="font-display text-navy dark:text-cream text-4xl md:text-5xl font-semibold group-hover:text-gold-dark transition-colors">
                {value}
              </p>
              <p className="font-sans text-navy/70 dark:text-navy/70 text-[11px] tracking-widest uppercase mt-2 group-hover:text-navy transition-colors">
                {label}
              </p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── Intro Quote Section ─────────────────────────────────── */}
      <section className="section-padding bg-cream dark:bg-navy/95">
        <div className="max-w-4xl mx-auto text-center px-6">
          <motion.p 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-sans text-gold text-xs tracking-[0.4em] uppercase mb-8"
          >
            The Man Behind the Mission
          </motion.p>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="font-display text-navy dark:text-cream text-3xl md:text-4xl lg:text-5xl font-light leading-snug mb-8"
          >
            A career built on energy, law, and the relentless pursuit of{' '}
            <em className="text-gold italic font-medium">African excellence.</em>
          </motion.h2>
          
          <div className="w-20 h-0.5 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto my-10" />
          
          <motion.p 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2 }}
            className="font-body text-charcoal/80 dark:text-cream/80 text-lg leading-relaxed mb-12 max-w-3xl mx-auto"
          >
            From the courtrooms of Lagos to the boardrooms of Abuja, Christopher Ezeafulukwe has dedicated his career
            to energising Nigeria — and by extension, Africa. His unique intersection of law, business, and energy
            expertise makes him one of the continent's most consequential executives.
          </motion.p>
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Link to="/about" className="btn-primary">Read Full Bio</Link>
            <Link to="/foundation" className="btn-outline">The Foundation</Link>
          </motion.div>
        </div>
      </section>
    </PageWrapper>
  )
}