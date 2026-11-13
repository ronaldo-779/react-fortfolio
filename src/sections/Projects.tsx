import { useState } from 'react';
import { motion } from 'framer-motion';
import type { Project } from '../types/portfolio';
import { SectionHeading } from '../components/SectionHeading';
import { ProjectCard } from '../components/ProjectCard';
import { LoadingSpinner } from '../components/Loading';

interface ProjectsProps {
  projects: Project[];
  loading: boolean;
}

export function Projects({ projects, loading }: ProjectsProps) {
  const categories = ['All', ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? projects
    : projects.filter(p => p.category === activeCategory);

  return (
    <section id="projects" className="section-padding bg-[var(--bg-secondary)] relative border-t border-[var(--border-subtle)]">
      <div className="max-w-7xl mx-auto">
        <SectionHeading
          badge="PORTFOLIO WORK"
          title="Featured Projects"
          subtitle="Engineered systems, applications, and client solutions deployed to production"
        />

        {loading ? (
          <LoadingSpinner />
        ) : projects.length === 0 ? (
          <p className="text-center text-[var(--text-muted)] font-mono py-12">No projects currently available.</p>
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

            {/* Responsive Projects Grid */}
            <motion.div
              key={activeCategory}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.35 }}
              className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
            >
              {filtered.map((project, i) => (
                <ProjectCard key={project.project_id ?? project.slug} project={project} index={i} />
              ))}
            </motion.div>
          </>
        )}
      </div>
    </section>
  );
}
