import { motion } from 'framer-motion';
import { ExternalLink, Star, Code2 } from 'lucide-react';
import { GithubIcon } from './Icons';
import type { Project } from '../types/portfolio';

interface ProjectCardProps {
  project: Project;
  index: number;
}

export function ProjectCard({ project, index }: ProjectCardProps) {
  const techStack = project.tech_stack
    ? project.tech_stack.split(',').map(t => t.trim()).filter(Boolean)
    : [];
  const isFeatured = project.featured?.toLowerCase() === 'true' || project.featured === '1';

  return (
    <motion.article
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.5, delay: index * 0.08, ease: 'easeOut' }}
      whileHover={{ y: -6 }}
      className={`glass-card rounded-2xl overflow-hidden transition-all duration-300 group flex flex-col relative ${
        isFeatured
          ? 'border-purple-500/50 shadow-[0_4px_25px_-5px_rgba(168,85,247,0.3)]'
          : 'hover:border-purple-500/50'
      }`}
    >
      {/* Thumbnail area */}
      <div className="relative h-52 bg-[var(--bg-secondary)] overflow-hidden border-b border-[var(--border-subtle)]">
        {project.thumbnail_url ? (
          <img
            src={project.thumbnail_url}
            alt={project.project_name}
            loading="lazy"
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center text-[var(--text-muted)] group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
            <Code2 className="w-12 h-12 mb-2 opacity-50" />
            <span className="font-mono text-sm tracking-wider uppercase">{project.project_name}</span>
          </div>
        )}

        {/* Featured Badge */}
        {isFeatured && (
          <div className="absolute top-3.5 left-3.5 flex items-center gap-1.5 px-3 py-1 rounded-full bg-gradient-to-r from-purple-600 to-indigo-600 text-white text-xs font-mono font-bold tracking-wider shadow-[0_0_15px_rgba(168,85,247,0.5)]">
            <Star className="w-3.5 h-3.5 fill-current" />
            FEATURED
          </div>
        )}

        {/* Category Badge */}
        {project.category && (
          <div className="absolute top-3.5 right-3.5 px-3 py-1 rounded-full bg-[var(--bg-surface)]/80 text-purple-600 dark:text-purple-400 text-xs font-mono border border-purple-500/30 backdrop-blur-md font-semibold">
            {project.category}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-6 flex flex-col flex-1">
        <h3 className="text-[var(--text-primary)] font-bold text-xl mb-2.5 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors line-clamp-1">
          {project.project_name}
        </h3>
        
        <p className="text-[var(--text-muted)] text-sm leading-relaxed mb-5 flex-1 line-clamp-3 font-light">
          {project.short_description}
        </p>

        {/* Tech Stack Badges */}
        {techStack.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-6">
            {techStack.slice(0, 5).map(tech => (
              <span
                key={tech}
                className="px-2.5 py-1 rounded-md bg-[var(--bg-surface)] text-[var(--text-secondary)] text-xs font-mono border border-[var(--border-subtle)] hover:border-purple-500/30 transition-colors"
              >
                {tech}
              </span>
            ))}
            {techStack.length > 5 && (
              <span className="px-2 py-1 rounded-md bg-[var(--bg-surface)] text-[var(--text-muted)] text-xs font-mono border border-[var(--border-subtle)]">
                +{techStack.length - 5}
              </span>
            )}
          </div>
        )}

        {/* Action Buttons */}
        <div className="flex items-center gap-3 mt-auto pt-3 border-t border-[var(--border-subtle)]">
          {project.github_url && (
            <a
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.project_name} source code on GitHub`}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl bg-[var(--bg-surface)] hover:bg-purple-500/10 text-[var(--text-secondary)] hover:text-purple-600 dark:hover:text-purple-400 border border-[var(--border-subtle)] hover:border-purple-500/40 text-xs font-mono uppercase tracking-wider transition-all cursor-pointer"
            >
              <GithubIcon size={16} />
              Code
            </a>
          )}
          {project.live_demo_url && (
            <a
              href={project.live_demo_url}
              target="_blank"
              rel="noreferrer"
              aria-label={`${project.project_name} live demo`}
              className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl neon-glow-btn text-xs font-mono uppercase tracking-wider font-bold transition-all cursor-pointer"
            >
              <ExternalLink className="w-3.5 h-3.5" />
              Live Demo
            </a>
          )}
          {!project.github_url && !project.live_demo_url && (
            <span className="text-xs text-[var(--text-muted)] font-mono italic">Demo links in production</span>
          )}
        </div>
      </div>
    </motion.article>
  );
}
