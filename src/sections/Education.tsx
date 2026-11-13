import { motion } from 'framer-motion';
import { GraduationCap, MapPin, Calendar, Award } from 'lucide-react';
import type { Education } from '../types/portfolio';
import { SectionHeading } from '../components/SectionHeading';

interface EducationProps {
  education: Education[];
  loading: boolean;
}

export function EducationSection({ education, loading }: EducationProps) {
  if (!loading && education.length === 0) return null;

  return (
    <section id="education" className="section-padding bg-[var(--bg-secondary)] relative border-t border-[var(--border-subtle)]">
      <div className="max-w-5xl mx-auto">
        <SectionHeading
          badge="ACADEMICS"
          title="Education & Degrees"
          subtitle="Formal academic foundations, certifications in higher learning, and degrees completed"
        />

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-9 h-9 border-3 border-purple-500/30 border-t-purple-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {education.map((edu, i) => (
              <motion.div
                key={edu.education_id ?? i}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.5, delay: i * 0.1, ease: 'easeOut' }}
                className="glass-card rounded-2xl p-6 sm:p-7 hover:border-purple-500/40 transition-all duration-300 flex flex-col group"
              >
                <div className="flex items-start gap-4 mb-4">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/25 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[var(--text-primary)] font-bold text-lg group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                      {edu.qualification}
                    </h3>
                    <p className="text-purple-600 dark:text-purple-400 font-mono text-sm mt-0.5">{edu.institution}</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-xs font-mono text-[var(--text-muted)] mb-4 pb-3 border-b border-[var(--border-subtle)]">
                  {(edu.start_year || edu.end_year) && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                      {edu.start_year}{edu.end_year ? ` — ${edu.end_year}` : ''}
                    </span>
                  )}
                  {edu.location && (
                    <span className="flex items-center gap-1.5">
                      <MapPin className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                      {edu.location}
                    </span>
                  )}
                  {edu.grade && (
                    <span className="flex items-center gap-1.5 text-purple-600 dark:text-purple-400 font-semibold">
                      <Award className="w-3.5 h-3.5" />
                      Grade: {edu.grade}
                    </span>
                  )}
                </div>

                {edu.description && (
                  <p className="text-[var(--text-secondary)] text-sm leading-relaxed font-light mt-auto">
                    {edu.description}
                  </p>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

export { EducationSection as Education };
