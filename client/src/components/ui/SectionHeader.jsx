export default function SectionHeader({ eyebrow, title, subtitle, light = false, className = '' }) {
    return (
      <div className={`mb-14 mt-8 md:mt-12 ${className}`}>
        {eyebrow && (
          <p className="font-sans text-xs tracking-[0.35em] uppercase mb-3" style={{ color: 'var(--color-gold)' }}>
            {eyebrow}
          </p>
        )}
        <h2 
          className="font-display text-5xl md:text-6xl font-light leading-tight"
          style={{ color: 'var(--text-primary)' }}
        >
          {title}
        </h2>
        <div className="w-16 h-0.5 bg-gold my-6" />
        {subtitle && (
          <p className="font-sans text-base leading-relaxed max-w-2xl" style={{ color: 'var(--text-muted)' }}>
            {subtitle}
          </p>
        )}
      </div>
    )
  }