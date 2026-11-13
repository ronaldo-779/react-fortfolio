import { Mail, ExternalLink } from 'lucide-react';
import { GithubIcon, LinkedinIcon, TwitterIcon } from './Icons';
import type { SocialLink } from '../types/portfolio';

interface SocialLinksProps {
  socialLinks: SocialLink[];
  email?: string;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
}

function getIcon(platform: string, size: string) {
  const iconSize = size === 'sm' ? 16 : size === 'lg' ? 22 : 18;
  const p = platform.toLowerCase();
  if (p.includes('github')) return <GithubIcon size={iconSize} />;
  if (p.includes('linkedin')) return <LinkedinIcon size={iconSize} />;
  if (p.includes('twitter') || p.includes('x.com')) return <TwitterIcon size={iconSize} />;
  if (p.includes('mail') || p.includes('email')) return <Mail size={iconSize} />;
  return <ExternalLink size={iconSize} />;
}

export function SocialLinks({ socialLinks, email, size = 'md', className = '' }: SocialLinksProps) {
  const pad = size === 'sm' ? 'p-2' : size === 'lg' ? 'p-3.5' : 'p-3';

  const links: Array<{ platform: string; url: string; id: string }> = socialLinks.map(s => ({
    platform: s.platform,
    url: s.url,
    id: s.social_id || s.platform,
  }));

  if (email && !socialLinks.some(s => s.platform.toLowerCase().includes('mail') || s.platform.toLowerCase().includes('email'))) {
    links.push({ platform: 'Email', url: `mailto:${email}`, id: 'email-fallback' });
  }

  if (links.length === 0) return null;

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {links.map(link => (
        <a
          key={link.id}
          href={link.url}
          target={link.url.startsWith('mailto:') ? '_self' : '_blank'}
          rel="noreferrer"
          aria-label={link.platform}
          className={`${pad} rounded-xl text-[var(--text-muted)] hover:text-purple-600 dark:hover:text-purple-400 bg-[var(--bg-surface)] hover:bg-purple-500/10 border border-[var(--border-subtle)] hover:border-purple-500/40 transition-all duration-300 hover:shadow-[0_0_15px_rgba(168,85,247,0.3)] hover:-translate-y-0.5 cursor-pointer`}
        >
          {getIcon(link.platform, size)}
        </a>
      ))}
    </div>
  );
}
