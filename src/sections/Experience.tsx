import { motion } from 'framer-motion';
import { Briefcase, MapPin, Calendar, Building2, CheckCircle2 } from 'lucide-react';
import type { Experience } from '../types/portfolio';
import { SectionHeading } from '../components/SectionHeading';

interface ExperienceProps {
  experience: Experience[];
  loading: boolean;
}

function formatDate(dateStr: string): string {
  if (!dateStr) return '';
  const d = new Date(dateStr);
  if (!isNaN(d.getTime())) {
    return d.toLocaleDateString('en-US', { year: 'numeric', month: 'short' });
  }
  return dateStr;
}

export function ExperienceSection({ experience, loading }: ExperienceProps) {
  if (!loading && experience.length === 0) return null;

  return (
    <section id="experience" className="section-padding bg-[var(--bg-primary)] relative border-t border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge="CAREER PATH"
          title="Work Experience"
          subtitle="Chronological track record of professional roles, architecture leadership, and engineering achievements"
        />

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-9 h-9 border-3 border-purple-500/30 border-t-purple-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="relative pl-6 md:pl-0">
            {/* Vertical timeline center beam */}
            <div className="absolute left-6 md:left-1/2 top-4 bottom-4 w-[2px] bg-gradient-to-b from-purple-600 via-purple-500/30 to-transparent -translate-x-1/2 shadow-[0_0_10px_rgba(168,85,247,0.4)]" />

            <div className="space-y-12">
              {experience.map((exp, i) => {
                const isLeft = i % 2 === 0;
                const isCurrent = exp.is_current?.toLowerCase() === 'true' || exp.is_current === '1';

                return (
                  <motion.div
                    key={exp.experience_id ?? i}
                    initial={{ opacity: 0, y: 30 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: '-50px' }}
                    transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                    className={`relative flex flex-col md:flex-row items-start ${
                      isLeft ? 'md:flex-row' : 'md:flex-row-reverse'
                    }`}
                  >
                    {/* Timeline glowing milestone node */}
                    <div className="absolute left-0 md:left-1/2 top-6 w-12 h-12 -translate-x-1/2 flex items-center justify-center rounded-full bg-[var(--bg-surface)] border-2 border-purple-600 dark:border-purple-400 shadow-[0_0_15px_rgba(168,85,247,0.5)] z-10">
                      <Briefcase className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>

                    {/* Card container */}
                    <div className={`w-full md:w-1/2 pl-10 md:pl-0 ${isLeft ? 'md:pr-12' : 'md:pl-12'}`}>
                      <div className="glass-card rounded-2xl p-6 sm:p-7 hover:border-purple-500/40 transition-all duration-300 relative group">
                        {/* Header */}
                        <div className="flex flex-wrap items-start justify-between gap-2 mb-3">
                          <div>
                            <h3 className="text-[var(--text-primary)] font-bold text-xl group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                              {exp.job_title}
                            </h3>
                            <div className="flex items-center gap-2 text-purple-600 dark:text-purple-400 font-mono text-sm mt-1">
                              <Building2 className="w-4 h-4" />
                              <span>{exp.organization}</span>
                            </div>
                          </div>
                          {isCurrent && (
                            <span className="px-3 py-1 rounded-full bg-purple-500/15 text-purple-600 dark:text-purple-400 border border-purple-500/30 text-xs font-mono font-bold tracking-wider">
                              CURRENT
                            </span>
                          )}
                        </div>

                        {/* Meta row */}
                        <div className="flex flex-wrap gap-4 text-xs font-mono text-[var(--text-muted)] mb-4 pb-3 border-b border-[var(--border-subtle)]">
                          {(exp.start_date || exp.end_date) && (
                            <span className="flex items-center gap-1.5">
                              <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                              {formatDate(exp.start_date)} — {isCurrent ? 'Present' : formatDate(exp.end_date)}
                            </span>
                          )}
                          {exp.location && (
                            <span className="flex items-center gap-1.5">
                              <MapPin className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                              {exp.location}
                            </span>
                          )}
                          {exp.employment_type && (
                            <span className="px-2 py-0.5 rounded bg-[var(--bg-surface)] text-[var(--text-secondary)] border border-[var(--border-subtle)]">
                              {exp.employment_type}
                            </span>
                          )}
                        </div>

                        {/* Description */}
                        {exp.description && (
                          <p className="text-[var(--text-secondary)] text-sm leading-relaxed mb-4 font-light">
                            {exp.description}
                          </p>
                        )}

                        {/* Responsibilities list */}
                        {exp.responsibilities && (
                          <ul className="space-y-2 mb-4">
                            {exp.responsibilities.split('\n').filter(r => r.trim()).map((r, j) => (
                              <li key={j} className="text-[var(--text-muted)] text-sm flex items-start gap-2.5 font-light">
                                <CheckCircle2 className="w-4 h-4 text-purple-600 dark:text-purple-400 flex-shrink-0 mt-0.5" />
                                <span>{r.replace(/^[-*•]\s*/, '')}</span>
                              </li>
                            ))}
                          </ul>
                        )}

                        {/* Tech stack */}
                        {exp.tech_stack && (
                          <div className="flex flex-wrap gap-1.5 pt-2">
                            {exp.tech_stack.split(',').map(t => t.trim()).filter(Boolean).map(tech => (
                              <span
                                key={tech}
                                className="px-2.5 py-1 rounded-md bg-[var(--bg-surface)] text-[var(--text-secondary)] text-xs font-mono border border-[var(--border-subtle)]"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        )}
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export { ExperienceSection as Experience };
