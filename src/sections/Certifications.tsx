import { motion } from 'framer-motion';
import { Award, ExternalLink, Calendar, ShieldCheck } from 'lucide-react';
import type { Certification } from '../types/portfolio';
import { SectionHeading } from '../components/SectionHeading';

interface CertificationsProps {
  certifications: Certification[];
  loading: boolean;
}

export function Certifications({ certifications, loading }: CertificationsProps) {
  if (!loading && certifications.length === 0) return null;

  return (
    <section id="certifications" className="section-padding bg-[var(--bg-primary)] relative border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="VERIFIED CREDENTIALS"
          title="Certifications & Accreditations"
          subtitle="Industry-standard certifications validating technical knowledge and engineering competence"
        />

        {loading ? (
          <div className="flex justify-center py-16">
            <div className="w-9 h-9 border-3 border-purple-500/30 border-t-purple-600 rounded-full animate-spin" />
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.certification_id ?? i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: 'easeOut' }}
                whileHover={{ y: -4 }}
                className="glass-card rounded-2xl p-6 hover:border-purple-500/40 transition-all duration-300 flex flex-col group"
              >
                <div className="flex items-start gap-3.5 mb-4">
                  <div className="p-3 rounded-xl bg-purple-500/10 text-purple-600 dark:text-purple-400 border border-purple-500/25 group-hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] transition-all">
                    <Award className="w-5 h-5" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-[var(--text-primary)] font-bold text-base group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors leading-snug">
                      {cert.certification_name}
                    </h3>
                    <p className="text-[var(--text-muted)] text-xs font-mono mt-1 flex items-center gap-1.5">
                      <ShieldCheck className="w-3.5 h-3.5 text-purple-600 dark:text-purple-400" />
                      <span>{cert.issuing_organization}</span>
                    </p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4 text-xs font-mono text-[var(--text-muted)] mb-4 pb-3 border-b border-[var(--border-subtle)]">
                  {cert.issue_date && (
                    <span className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-purple-600 dark:text-purple-400" />
                      Issued: {cert.issue_date}
                    </span>
                  )}
                  {cert.expiry_date && (
                    <span>Expires: {cert.expiry_date}</span>
                  )}
                </div>

                {cert.credential_id && (
                  <p className="text-xs text-[var(--text-muted)] font-mono mb-4 truncate">
                    Credential ID: <span className="text-[var(--text-primary)]">{cert.credential_id}</span>
                  </p>
                )}

                {cert.description && (
                  <p className="text-[var(--text-secondary)] text-xs leading-relaxed font-light mb-5 flex-1">
                    {cert.description}
                  </p>
                )}

                {cert.credential_url && (
                  <a
                    href={cert.credential_url}
                    target="_blank"
                    rel="noreferrer"
                    className="mt-auto inline-flex items-center gap-2 text-xs font-mono font-semibold uppercase tracking-wider text-purple-600 dark:text-purple-400 hover:text-fuchsia-500 transition-colors pt-2"
                  >
                    <span>Verify Credential</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
