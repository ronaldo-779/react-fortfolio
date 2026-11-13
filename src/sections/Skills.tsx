import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Skill } from '../types/portfolio';
import { SectionHeading } from '../components/SectionHeading';
import { SkillCard } from '../components/SkillCard';
import { LoadingSpinner } from '../components/Loading';

interface SkillsProps {
  skills: Skill[];
  loading: boolean;
}

export function Skills({ skills, loading }: SkillsProps) {
  const categories = ['All', ...Array.from(new Set(skills.map(s => s.category).filter(Boolean)))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All' ? skills : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="section-padding bg-[var(--bg-primary)] relative border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="TECH STACK"
          title="Technical Competencies"
          subtitle="Core programming languages, frameworks, databases, and architectural tools"
        />

        {loading ? (
          <LoadingSpinner />
        ) : skills.length === 0 ? (
          <p className="text-center text-[var(--text-muted)] font-mono py-12">Skills data loading from Google Sheets...</p>
        ) : (
          <>
            {/* Category Filter Pills */}
            {categories.length > 2 && (
              <div className="flex flex-wrap gap-2.5 justify-center mb-12">
                {categories.map(cat => {
                  const isActive = activeCategory === cat;
                  return (
                    <button
                      key={cat}
                      onClick={() => setActiveCategory(cat)}
                      className={`px-5 py-2 rounded-xl text-xs font-mono uppercase tracking-wider transition-all duration-200 cursor-pointer ${
                        isActive
                          ? 'text-white bg-gradient-to-r from-purple-600 to-indigo-600 font-bold shadow-[0_0_20px_rgba(168,85,247,0.4)]'
                          : 'text-[var(--text-muted)] bg-[var(--bg-surface)] border border-[var(--border-subtle)] hover:text-[var(--text-primary)] hover:border-purple-500/40'
                      }`}
                    >
                      {cat}
                    </button>
                  );
                })}
              </div>
            )}

            {/* Skills Grid */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5"
            >
              {filtered.map((skill, i) => (
                <SkillCard key={skill.skill_id ?? skill.skill_name} skill={skill} index={i} />
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
