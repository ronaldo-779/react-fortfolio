import { motion } from 'framer-motion';

interface SectionHeadingProps {
  title: string;
  subtitle?: string;
  align?: 'left' | 'center';
  badge?: string;
}

export function SectionHeading({ title, subtitle, align = 'center', badge }: SectionHeadingProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`mb-14 ${align === 'center' ? 'text-center' : 'text-left'}`}
    >
      {badge && (
        <span className="inline-block px-3.5 py-1 mb-3 rounded-full text-xs font-mono font-semibold tracking-widest text-purple-600 dark:text-purple-400 bg-purple-500/10 border border-purple-500/25 uppercase shadow-[0_0_12px_rgba(168,85,247,0.15)]">
          {badge}
        </span>
      )}
      <h2 className="text-3xl md:text-4xl lg:text-5xl font-extrabold text-[var(--text-primary)] tracking-tight mb-3">
        {title}
      </h2>
      {subtitle && (
        <p className="text-[var(--text-muted)] text-base md:text-lg max-w-2xl mx-auto font-light leading-relaxed">
          {subtitle}
        </p>
      )}
      <div
        className={`mt-4 h-1 w-20 rounded-full bg-gradient-to-r from-purple-600 via-fuchsia-500 to-transparent shadow-[0_0_12px_rgba(168,85,247,0.5)] ${
          align === 'center' ? 'mx-auto' : ''
        }`}
      />
    </motion.div>
  );
}
