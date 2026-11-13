import { useEffect, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Menu,
  X,
  Download,
  Sun,
  Moon,
  ArrowUpRight,
} from 'lucide-react';

import type { Profile, Theme } from '../types/portfolio';

interface NavbarProps {
  profile: Profile | null;
  theme: Theme;
  onToggleTheme: () => void;
  activeSection: string;
}

const NAV_LINKS = [
  { id: 'projects', label: 'Projects' },
  { id: 'skills', label: 'Skills' },
  { id: 'experience', label: 'Experience' },
  { id: 'education', label: 'Education' },
  { id: 'certifications', label: 'Certificates' },
  { id: 'services', label: 'Services' },
  { id: 'contact', label: 'Contact' },
];

export function Navbar({
  profile,
  theme,
  onToggleTheme,
  activeSection,
}: NavbarProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Detect page scrolling
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 30);
    };

    handleScroll();

    window.addEventListener('scroll', handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Close mobile menu when screen becomes desktop-sized
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsOpen(false);
      }
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  // Prevent background scrolling when mobile menu is open
  useEffect(() => {
    if (!isOpen) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [isOpen]);

  // Smooth navigation
  const scrollTo = (id: string) => {
    setIsOpen(false);

    const element = document.getElementById(id);

    if (element) {
      element.scrollIntoView({
        behavior: 'smooth',
        block: 'start',
      });
    }
  };

  const displayName = profile?.full_name
    ? profile.full_name.split(' ')[0].toUpperCase()
    : 'PORTFOLIO';

  return (
    <>
      {/* ================= NAVBAR ================= */}

      <motion.header
        initial={{ opacity: 0, y: -25 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: 'easeOut' }}
        className={`
          fixed top-0 left-0 right-0 z-50
          transition-all duration-300
          ${
            scrolled
              ? 'bg-[var(--navbar-bg)] backdrop-blur-xl border-b border-[var(--border-subtle)] shadow-[0_5px_30px_rgba(0,0,0,0.06)] dark:shadow-[0_5px_30px_rgba(0,0,0,0.5)]'
              : 'bg-[var(--navbar-bg)]/80 backdrop-blur-sm border-b border-[var(--border-subtle)]'
          }
        `}
      >
        <nav
          className="
            max-w-6xl mx-auto
            px-5 sm:px-8 lg:px-0
            h-[68px]
            flex items-center justify-between
          "
          aria-label="Main navigation"
        >
          {/* LOGO */}

          <button
            type="button"
            onClick={() => scrollTo('home')}
            className="
              group flex items-center gap-1
              text-[var(--text-primary)] font-bold
              text-sm sm:text-base
              tracking-tight
              transition-all duration-300
            "
            aria-label="Go to homepage"
          >
            <span className="font-mono">
              {displayName}
            </span>

            <span className="
              text-purple-600 dark:text-purple-400
              group-hover:drop-shadow-[0_0_8px_rgba(168,85,247,0.8)]
              transition-all
            ">
              _
            </span>
          </button>

          {/* DESKTOP NAVIGATION */}

          <div className="hidden lg:flex items-center">
            <ul className="flex items-center gap-8 xl:gap-10">
              {NAV_LINKS.map((link) => {
                const isActive = activeSection === link.id;

                return (
                  <li key={link.id}>
                    <button
                      type="button"
                      onClick={() => scrollTo(link.id)}
                      aria-current={isActive ? 'location' : undefined}
                      className={`
                        relative py-2
                        text-[10px] xl:text-[11px]
                        font-mono uppercase tracking-wider
                        transition-colors duration-300 cursor-pointer
                        ${
                          isActive
                            ? 'text-purple-600 dark:text-purple-400 font-bold'
                            : 'text-[var(--text-muted)] hover:text-[var(--text-primary)]'
                        }
                      `}
                    >
                      {link.label}

                      {/* Active indicator */}

                      <span
                        className={`
                          absolute -bottom-1 left-0
                          h-[2px] bg-gradient-to-r from-purple-600 to-fuchsia-500
                          transition-all duration-300
                          ${
                            isActive
                              ? 'w-full shadow-[0_0_8px_rgba(168,85,247,0.8)]'
                              : 'w-0'
                          }
                        `}
                      />
                    </button>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* RIGHT ACTIONS */}

          <div className="flex items-center gap-3">

            {/* Theme Toggle Button */}

            <button
              type="button"
              onClick={onToggleTheme}
              aria-label={`Switch to ${
                theme === 'dark' ? 'light' : 'dark'
              } theme`}
              title={`Switch to ${theme === 'dark' ? 'light' : 'dark'} mode`}
              className="
                flex
                items-center justify-center
                w-9 h-9
                rounded-xl
                border border-[var(--border-subtle)]
                bg-[var(--bg-surface)]/60
                text-[var(--text-muted)]
                hover:text-purple-600 dark:hover:text-purple-400
                hover:border-purple-500/50
                hover:shadow-[0_0_12px_rgba(168,85,247,0.3)]
                transition-all duration-300 cursor-pointer
              "
            >
              {theme === 'dark' ? (
                <Sun size={16} className="text-amber-400 transition-transform duration-300 hover:rotate-45" />
              ) : (
                <Moon size={16} className="text-purple-600 transition-transform duration-300 hover:-rotate-12" />
              )}
            </button>

            {/* Resume Button */}

            {profile?.resume_url && (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noopener noreferrer"
                className="
                  hidden sm:inline-flex
                  items-center gap-2
                  px-4 py-2
                  rounded-xl
                  border border-[var(--border-subtle)]
                  bg-purple-500/10
                  text-[var(--text-primary)]
                  font-mono text-[10px]
                  tracking-wider uppercase
                  hover:text-purple-600 dark:hover:text-purple-400
                  hover:border-purple-500/50
                  hover:bg-purple-500/15
                  transition-all duration-300
                  group
                "
              >
                <span>Resume.pdf</span>

                <ArrowUpRight
                  size={13}
                  className="
                    text-[var(--text-muted)]
                    group-hover:text-purple-600 dark:group-hover:text-purple-400
                    transition-colors
                  "
                />
              </a>
            )}

            {/* MOBILE MENU BUTTON */}

            <button
              type="button"
              onClick={() => setIsOpen((previous) => !previous)}
              aria-label={isOpen ? 'Close navigation' : 'Open navigation'}
              aria-expanded={isOpen}
              aria-controls="mobile-navigation"
              className="
                lg:hidden
                flex items-center justify-center
                w-9 h-9
                rounded-xl
                border border-[var(--border-subtle)]
                bg-[var(--bg-surface)]/60
                text-[var(--text-primary)]
                hover:text-purple-600 dark:hover:text-purple-400
                hover:border-purple-500/40
                transition-all duration-300 cursor-pointer
              "
            >
              <AnimatePresence mode="wait" initial={false}>
                <motion.span
                  key={isOpen ? 'close' : 'open'}
                  initial={{ opacity: 0, rotate: -90 }}
                  animate={{ opacity: 1, rotate: 0 }}
                  exit={{ opacity: 0, rotate: 90 }}
                  transition={{ duration: 0.15 }}
                >
                  {isOpen ? <X size={18} /> : <Menu size={18} />}
                </motion.span>
              </AnimatePresence>
            </button>
          </div>
        </nav>
      </motion.header>

      {/* ================= MOBILE MENU ================= */}

      <AnimatePresence>
        {isOpen && (
          <>
            {/* Backdrop */}

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setIsOpen(false)}
              className="
                fixed inset-0 z-[60]
                bg-black/60 backdrop-blur-sm
                lg:hidden
              "
              aria-hidden="true"
            />

            {/* Mobile Drawer */}

            <motion.aside
              id="mobile-navigation"
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{
                type: 'spring',
                stiffness: 300,
                damping: 30,
              }}
              className="
                fixed top-0 right-0 bottom-0
                z-[70]
                w-[min(85vw,360px)]
                bg-[var(--bg-surface)]
                border-l border-[var(--border-subtle)]
                shadow-[-20px_0_60px_rgba(0,0,0,0.3)] dark:shadow-[-20px_0_60px_rgba(0,0,0,0.7)]
                px-7 pt-8 pb-10
                flex flex-col
                lg:hidden
              "
              aria-label="Mobile navigation"
            >
              {/* Drawer Header */}

              <div className="
                flex items-center justify-between
                pb-6 mb-6
                border-b border-[var(--border-subtle)]
              ">
                <span className="font-mono text-[var(--text-primary)] text-sm font-bold">
                  NAVIGATION
                  <span className="text-purple-600 dark:text-purple-400">_</span>
                </span>

                <button
                  type="button"
                  onClick={() => setIsOpen(false)}
                  aria-label="Close menu"
                  className="
                    p-1.5 rounded-lg
                    text-[var(--text-muted)]
                    hover:text-purple-600 dark:hover:text-purple-400
                    hover:bg-purple-500/10
                    transition-colors cursor-pointer
                  "
                >
                  <X size={20} />
                </button>
              </div>

              {/* Navigation Links */}

              <div className="flex flex-col gap-1.5 overflow-y-auto">
                {NAV_LINKS.map((link, index) => {
                  const isActive = activeSection === link.id;

                  return (
                    <motion.button
                      key={link.id}
                      type="button"
                      initial={{ opacity: 0, x: 25 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{
                        delay: index * 0.04,
                      }}
                      onClick={() => scrollTo(link.id)}
                      className={`
                        group flex items-center justify-between
                        px-4 py-3.5
                        rounded-xl
                        border-l-2
                        text-left text-xs
                        font-mono uppercase tracking-widest
                        transition-all duration-200 cursor-pointer
                        ${
                          isActive
                            ? 'border-purple-600 dark:border-purple-400 bg-purple-500/10 text-purple-600 dark:text-purple-400 font-bold'
                            : 'border-transparent text-[var(--text-muted)] hover:text-[var(--text-primary)] hover:bg-purple-500/5'
                        }
                      `}
                    >
                      <span>{link.label}</span>

                      <ArrowUpRight
                        size={14}
                        className={`
                          transition-all duration-300
                          ${
                            isActive
                              ? 'text-purple-600 dark:text-purple-400'
                              : 'text-[var(--text-subtle)] group-hover:text-purple-600 dark:group-hover:text-purple-400'
                          }
                        `}
                      />
                    </motion.button>
                  );
                })}
              </div>

              {/* Drawer Footer */}

              <div className="mt-auto pt-6 space-y-4 border-t border-[var(--border-subtle)]">

                {/* Mobile Theme Toggle */}

                <button
                  type="button"
                  onClick={onToggleTheme}
                  className="
                    w-full flex items-center justify-between
                    px-4 py-3
                    rounded-xl
                    border border-[var(--border-subtle)]
                    bg-[var(--bg-secondary)]
                    text-[var(--text-primary)]
                    hover:border-purple-500/40
                    transition-colors cursor-pointer
                  "
                >
                  <span className="font-mono text-xs uppercase tracking-wider flex items-center gap-2">
                    {theme === 'dark' ? (
                      <Sun size={15} className="text-amber-400" />
                    ) : (
                      <Moon size={15} className="text-purple-600" />
                    )}
                    <span>Theme: {theme === 'dark' ? 'Dark' : 'Light'}</span>
                  </span>

                  <span className="text-[10px] font-mono text-purple-600 dark:text-purple-400 uppercase tracking-widest">
                    Switch
                  </span>
                </button>

                {/* Mobile Resume */}

                {profile?.resume_url && (
                  <a
                    href={profile.resume_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="
                      w-full flex items-center justify-center gap-3
                      py-3.5
                      rounded-xl
                      neon-glow-btn
                      font-mono text-xs
                      uppercase tracking-widest
                      font-bold
                      transition-all duration-300
                    "
                  >
                    <Download size={15} />
                    Download Resume
                  </a>
                )}

                <p className="
                  text-center
                  font-mono text-[10px]
                  tracking-widest text-[var(--text-subtle)]
                ">
                  © {new Date().getFullYear()} {profile?.full_name || 'PORTFOLIO'}
                </p>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
