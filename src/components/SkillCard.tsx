import { motion } from 'framer-motion';
import type { Skill } from '../types/portfolio';

interface SkillCardProps {
  skill: Skill;
  index: number;
}

export function SkillCard({ skill, index }: SkillCardProps) {
  const percent = Number(skill.proficiency_percent) || 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: index * 0.04, ease: 'easeOut' }}
      whileHover={{ y: -4 }}
      className="glass-card rounded-2xl p-5 hover:border-purple-500/50 transition-all duration-300 group relative overflow-hidden"
    >
      <div className="flex items-start justify-between mb-3">
        <div>
          <h3 className="text-[var(--text-primary)] font-semibold text-base group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            {skill.skill_name}
          </h3>
          {skill.proficiency_label && (
            <span className="text-xs font-mono text-[var(--text-muted)] mt-0.5 block uppercase tracking-wider">
              {skill.proficiency_label}
            </span>
          )}
        </div>
        {skill.icon && (
          <span className="text-xl p-2 rounded-xl bg-purple-500/10 border border-[var(--border-subtle)] group-hover:border-purple-500/40 select-none transition-colors">
            {skill.icon}
          </span>
        )}
      </div>

      {percent > 0 && (
        <div className="mt-4">
          <div className="flex justify-between text-xs font-mono text-[var(--text-muted)] mb-1.5">
            <span>Proficiency</span>
            <span className="text-purple-600 dark:text-purple-400 font-bold">{percent}%</span>
          </div>
          <div className="h-2 bg-purple-900/15 dark:bg-purple-950/60 rounded-full overflow-hidden p-0.5 border border-[var(--border-subtle)]">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${percent}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: index * 0.04 + 0.2, ease: 'easeOut' }}
              className="h-full rounded-full bg-gradient-to-r from-purple-600 via-purple-500 to-fuchsia-400 shadow-[0_0_10px_rgba(168,85,247,0.5)]"
            />
          </div>
        </div>
      )}
    </motion.div>
  );
}
