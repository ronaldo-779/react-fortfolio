import { motion } from 'framer-motion';
import { Mail, ArrowUp, Terminal, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';
import type { Profile, SocialLink } from '../types/portfolio';

interface FooterProps {
  profile: Profile | null;
  socialLinks: SocialLink[];
}

const NAV_LINKS = [
  { id: 'home', label: 'Home' },
  { id: 'about', label: 'About' },
  { id: 'skills', label: 'Skills' },
  { id: 'projects', label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certifications' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

function getPlatformIcon(platform: string) {
  const p = platform.toLowerCase();
  if (p.includes('github')) return <GithubIcon size={18} />;
  if (p.includes('linkedin')) return <LinkedinIcon size={18} />;
  if (p.includes('twitter') || p.includes('x.com')) return <TwitterIcon size={18} />;
  if (p.includes('mail') || p.includes('email')) return <Mail size={18} />;
  return <ExternalLink size={18} />;
}

export function Footer({ profile, socialLinks }: FooterProps) {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  };

  const scrollTop = () => window.scrollTo({ top: 0, behavior: 'smooth' });

  return (
    <footer className="border-t border-[var(--border-subtle)] bg-[var(--bg-secondary)] text-[var(--text-muted)] py-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-[var(--border-subtle)]">
          {/* Brand Info */}
          <div className="md:col-span-5 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="p-2 rounded-xl bg-[var(--bg-surface)] border border-purple-500/30 text-purple-600 dark:text-purple-400">
                <Terminal className="w-5 h-5" />
              </div>
              <span className="font-mono text-xl font-bold tracking-tight text-[var(--text-primary)]">
                {profile?.full_name ?? 'Portfolio'}
                <span className="text-purple-600 dark:text-purple-400">.</span>
              </span>
            </div>
            
            <p className="text-sm font-light text-[var(--text-muted)] max-w-sm leading-relaxed">
              {profile?.professional_title ?? 'Software Engineer'}
              {profile?.tagline ? ` — ${profile.tagline}` : ''}
            </p>

            {/* Social Links Row */}
            {socialLinks.length > 0 && (
              <div className="flex flex-wrap gap-2.5 pt-2">
                {socialLinks.map(link => (
                  <a
                    key={link.social_id || link.platform}
                    href={link.url}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={link.platform}
                    className="p-2.5 rounded-xl bg-[var(--bg-surface)] border border-[var(--border-subtle)] text-[var(--text-muted)] hover:text-purple-600 dark:hover:text-purple-400 hover:border-purple-500/40 transition-all cursor-pointer"
                  >
                    {getPlatformIcon(link.platform)}
                  </a>
                ))}
              </div>
            )}
          </div>

          {/* Quick Navigation Links */}
          <div className="md:col-span-4 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400">
              Navigation
            </h4>
            <ul className="grid grid-cols-2 gap-2 text-sm">
              {NAV_LINKS.map(link => (
                <li key={link.id}>
                  <button
                    onClick={() => scrollTo(link.id)}
                    className="text-[var(--text-muted)] hover:text-[var(--text-primary)] transition-colors cursor-pointer text-left font-light"
                  >
                    {link.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Direct Contact info */}
          <div className="md:col-span-3 space-y-3">
            <h4 className="text-xs font-mono font-semibold uppercase tracking-widest text-purple-600 dark:text-purple-400">
              Location & Details
            </h4>
            <div className="space-y-2 text-sm font-light">
              {profile?.email && (
                <a
                  href={`mailto:${profile.email}`}
                  className="block text-[var(--text-muted)] hover:text-purple-600 dark:hover:text-purple-400 transition-colors truncate"
                >
                  {profile.email}
                </a>
              )}
              {profile?.location && (
                <p className="text-[var(--text-subtle)] font-mono text-xs">{profile.location}</p>
              )}
            </div>
          </div>
        </div>

        {/* Bottom bar with Copyright & Back to Top */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs font-mono text-[var(--text-subtle)] text-center sm:text-left">
            © {new Date().getFullYear()} {profile?.full_name ?? 'Portfolio'}. Engineered with React, TypeScript & Tailwind CSS.
          </p>

          <motion.button
            onClick={scrollTop}
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.95 }}
            aria-label="Back to top"
            className="p-3 rounded-xl bg-[var(--bg-surface)] hover:bg-purple-500/10 border border-[var(--border-subtle)] hover:border-purple-500/40 text-purple-600 dark:text-purple-400 transition-all cursor-pointer shadow-sm hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]"
          >
            <ArrowUp className="w-4 h-4" />
          </motion.button>
        </div>
      </div>
    </footer>
  );
}
