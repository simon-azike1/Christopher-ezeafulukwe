import { motion } from 'framer-motion'

export default function Portrait({ variant = 'about', size = 'md', dark = false }) {
  const portraits = {
    hero: '/Transcorp-Christopher-905x613.png',
    about: '/Transcorp-Christopher-905x613.png', // Updated to match hero
  }

  const imageSrc = portraits[variant] || portraits.about

  const sizeClasses = {
    lg: 'w-64 h-64 md:w-80 md:h-80 lg:w-96 lg:h-96',
    md: 'w-64 h-64 md:w-80 md:h-80',
  }

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9 }} 
      whileInView={{ opacity: 1, scale: 1 }} 
      transition={{ duration: 0.6 }}
      className={`relative rounded-full overflow-hidden shadow-2xl ${sizeClasses[size] || sizeClasses.md} ${dark ? 'ring-4 ring-navy/20' : 'ring-4 ring-cream/20'}`}
    >
      <img 
        src={imageSrc} 
        alt="Christopher Ezeafulukwe" 
        className="w-full h-full object-cover"
      />
    </motion.div>
  )
}

