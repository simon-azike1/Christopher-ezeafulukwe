import { useEffect } from 'react'
import { motion, useScroll, useTransform, useSpring } from 'framer-motion'
import { Link } from 'react-router-dom'
import PageWrapper from '../components/ui/PageWrapper'
import { FaLinkedin } from 'react-icons/fa'
import { useRef } from 'react'
import { useTheme } from '../context/ThemeContext'

export default function Home() {
  const { dark } = useTheme()
  const { scrollY } = useScroll()
  const containerRef = useRef(null)
   
  const heroDark = dark
   
// ── Parallax Transforms ─────────────────
   const videoY = useTransform(scrollY, [0, 500], [0, 150])
   const textY = useTransform(scrollY, [0, 300], [0, -50])
   const overlayOpacity = useTransform(scrollY, [0, 200], [0.6, 0.8])
   
  // Smooth spring physics for natural motion
  const smoothVideoY = useSpring(videoY, { stiffness: 100, damping: 30 })
  const smoothTextY = useSpring(textY, { stiffness: 80, damping: 25 })
   
   
  return (
    <PageWrapper>
      {/* ── Video Hero Section ─────────────────────────────────────────── */}
      <section 
        ref={containerRef}
        className="relative min-h-screen flex items-center justify-center overflow-hidden mt-15"
      >
{/* Video Background with Parallax */}
         <motion.div 
           style={{ y: smoothVideoY }}
           className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden"
         >
           <div className="relative w-full h-full overflow-hidden">
             <video 
               autoPlay 
               muted 
               loop
                 playsInline
                 className="absolute inset-0 w-full h-full"
                 style={{ 
                   objectFit: 'cover',
                   objectPosition: 'center center',
                   filter: 'brightness(0.9) contrast(1.0)',
                   backgroundColor: '#000',
                 }}
               >
                 <source src="https://res.cloudinary.com/djizgbimn/video/upload/v1784740471/videoplayback_ncnukx.mp4" type="video/mp4" />
                 Your browser does not support the video tag.
               </video>
           </div>
         </motion.div>
         
{/* Dark Overlay for Text Readability */}
         <motion.div 
           style={{ opacity: overlayOpacity }}
           className={`absolute inset-0 transition-colors duration-300 ${heroDark ? 'bg-navy/90' : 'bg-black/90'}`}
         />
         
        {/* Left Gold Accent Bar */}
        <div 
          className={`absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-transparent via-gold to-transparent opacity-80 ${heroDark ? '' : 'hidden'}`}
        />
   
        {/* Content Container - Centered, Single Column */}
        <div className="relative z-10 max-w-4xl mx-auto px-6 md:px-12 lg:px-24 pt-10 pb-20 w-full">
         
          {/* ── Text Content - Centered ── */}
          <motion.div
            style={{ y: smoothTextY }}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="space-y-8 text-center"
          >
            
   
            <div className="space-y-2">
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                className={`font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-light leading-[0.95] ${heroDark ? 'text-cream' : 'text-white'}`}
              >
                Christopher
              </motion.h1>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="font-display text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-semibold text-white leading-[0.95]"
              >
                Ezeafulukwe
              </motion.h1>
            </div>
   
            <motion.div 
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="w-24 h-0.5 bg-gradient-to-r from-gold to-transparent origin-center mx-auto" 
            />
   
            <motion.p 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className={`font-body text-lg md:text-xl leading-relaxed max-w-2xl mx-auto ${heroDark ? 'text-cream/90' : 'text-white/90'}`}
            >
              Energy executive, legal scholar, and corporate governance leader with over two decades 
              shaping Africa's power sector through innovation, integrity, and impact.
            </motion.p>
   
            {/* Action Buttons - Centered */}
            <motion.div 
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.85 }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4"
            >
              <Link 
                to="/about" 
                className={`group inline-flex items-center justify-center gap-2 px-6 py-3.5 bg-gold font-medium rounded-lg hover:bg-gold-light transition-all duration-300 shadow-lg hover:shadow-xl hover:-translate-y-0.5 ${heroDark ? 'shadow-gold/20 hover:shadow-gold/40 text-navy' : 'shadow-gold/30 text-white'}`}
              >
                Discover His Story
                <motion.span animate={{ x: [0, 4, 0], transition: { repeat: Infinity, duration: 1.5 } }} className="text-lg">→</motion.span>
              </Link>
               
              <Link 
                to="/career" 
                className={`inline-flex items-center justify-center gap-2 px-6 py-3.5 border-2 font-medium rounded-lg transition-all duration-300 hover:-translate-y-0.5 ${heroDark ? 'border-cream/50 text-cream hover:bg-cream/10 hover:border-cream' : 'border-white/50 text-white hover:bg-white/10 hover:border-white'}`}
              >
                View Career
              </Link>
               
              <a 
                href="https://www.linkedin.com/in/christopher-ezeafulukwe-121450ba/"
                target="_blank" 
                rel="noopener noreferrer"
                className={`p-3.5 transition-all duration-300 rounded-full border-2 hover:-translate-y-0.5 ${heroDark ? 'text-cream/70 hover:text-gold border-cream/30 hover:border-gold hover:bg-gold/10' : 'text-white/70 hover:text-white border-white/30 hover:border-white hover:bg-white/10'}`}
                aria-label="Connect on LinkedIn"
              >
                <FaLinkedin className="text-xl" />
              </a>
            </motion.div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2 text-white/60"
          >
            <span className="text-[10px] tracking-[0.3em] uppercase">Scroll</span>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 5v14M5 12l7 7 7-7" />
            </svg>
          </motion.div>
        </motion.div>
      </section>
    
  )


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
            transaction={{ delay: 0.2 }}
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
  );
}