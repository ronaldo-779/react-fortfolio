import { motion } from 'framer-motion';
import { Code2, Palette, Database, Cloud, Smartphone, BarChart3, Terminal, Globe, Layers } from 'lucide-react';
import type { Service } from '../types/portfolio';
import { SectionHeading } from '../components/SectionHeading';

interface ServicesProps {
  services: Service[];
  loading: boolean;
}

function getServiceIcon(iconName: string) {
  const name = (iconName ?? '').toLowerCase();
  if (name.includes('code') || name.includes('dev')) return <Code2 className="w-6 h-6" />;
  if (name.includes('design') || name.includes('ui') || name.includes('palette')) return <Palette className="w-6 h-6" />;
  if (name.includes('data') || name.includes('db') || name.includes('database')) return <Database className="w-6 h-6" />;
  if (name.includes('cloud') || name.includes('devops')) return <Cloud className="w-6 h-6" />;
  if (name.includes('mobile') || name.includes('app')) return <Smartphone className="w-6 h-6" />;
  if (name.includes('analytics') || name.includes('chart')) return <BarChart3 className="w-6 h-6" />;
  if (name.includes('terminal') || name.includes('script')) return <Terminal className="w-6 h-6" />;
  if (name.includes('web') || name.includes('globe')) return <Globe className="w-6 h-6" />;
  if (/\p{Emoji}/u.test(iconName)) return <span className="text-2xl">{iconName}</span>;
  return <Layers className="w-6 h-6" />;
}

export function Services({ services, loading }: ServicesProps) {
  if (!loading && services.length === 0) return null;

  return (
    <section id="services" className="section-padding bg-[var(--bg-secondary)] relative border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="SOLUTIONS OFFERED"
          title="Engineering Services"
          subtitle="Specialized capabilities in full-stack architecture, high-performance UI engineering, and API development"
        />

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-9 h-9 border-3 border-purple-500/30 border-t-purple-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, i) => (
              <motion.div
                key={service.service_id ?? i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -6 }}
                className="glass-card rounded-2xl p-7 hover:border-purple-500/40 transition-all duration-300 group flex flex-col"
              >
                <div className="mb-5 inline-flex self-start p-3.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-purple-600 dark:text-purple-400 group-hover:bg-purple-500/10 group-hover:border-purple-500/40 group-hover:shadow-[0_0_20px_rgba(168,85,247,0.3)] transition-all">
                  {getServiceIcon(service.icon)}
                </div>

                <h3 className="text-[var(--text-primary)] font-bold text-xl mb-3 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                  {service.service_title}
                </h3>

                <p className="text-[var(--text-muted)] text-sm leading-relaxed font-light flex-1">
                  {service.description}
                </p>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
