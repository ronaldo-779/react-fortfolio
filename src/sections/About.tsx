import { useState } from 'react';

import {
  motion,
  useReducedMotion,
} from 'framer-motion';

import {
  MapPin,
  BriefcaseBusiness,
  Target,
  Code2,
  ArrowUpRight,
  Sparkles,
  UserRound,
} from 'lucide-react';

import type { Profile } from '../types/portfolio';
import { SectionHeading } from '../components/SectionHeading';

interface AboutProps {
  profile: Profile | null;
}

// Previously shared Google Drive photo ID
const DEFAULT_PROFILE_IMAGE_ID =
  '12ez1Cj-6sZa_ZTGkFeaMtAbixixZ6x9c';

// Convert Google Drive sharing URLs into image URLs
function getProfileImageUrl(url?: string | null): string {
  const imageUrl = url?.trim();

  if (!imageUrl) {
    return `https://drive.google.com/thumbnail?id=${DEFAULT_PROFILE_IMAGE_ID}&sz=w1000`;
  }

  // Extract ID from Google Drive URL
  const driveFileMatch = imageUrl.match(/\/file\/d\/([^/]+)/);
  const driveOpenMatch = imageUrl.match(/[?&]id=([^&]+)/);
  const driveThumbnailMatch = imageUrl.match(/thumbnail\?id=([^&]+)/);

  const fileId =
    driveFileMatch?.[1] ||
    driveOpenMatch?.[1] ||
    driveThumbnailMatch?.[1];

  if (fileId && imageUrl.includes('drive.google.com')) {
    return `https://drive.google.com/thumbnail?id=${fileId}&sz=w1000`;
  }

  // Keep normal image URLs unchanged
  return imageUrl;
}

export function About({ profile }: AboutProps) {
  const reduceMotion = useReducedMotion();
  const [imageFailed, setImageFailed] = useState(false);

  if (!profile) return null;

  const photoUrl = getProfileImageUrl(profile.profile_image_url);

  const bio = profile.about_me || profile.short_bio || '';

  const paragraphs = bio
    .split('\n')
    .map((paragraph) => paragraph.trim())
    .filter(Boolean);

  const info = [
    {
      label: 'LOCATION',
      value: profile.location,
      icon: MapPin,
    },
    {
      label: 'EXPERIENCE',
      value: profile.years_experience
        ? `${profile.years_experience}+ Years`
        : undefined,
      icon: BriefcaseBusiness,
    },
    {
      label: 'AVAILABILITY',
      value: profile.availability_status,
      icon: Target,
    },
    {
      label: 'PROFESSION',
      value: profile.professional_title,
      icon: Code2,
    },
  ].filter((item) => item.value);

  return (
    <section
      id="about"
      className="relative overflow-hidden bg-[var(--bg-secondary)] px-6 py-24 sm:px-10 sm:py-32 border-t border-[var(--border-subtle)]"
    >
      {/* Background decoration */}
      <div className="pointer-events-none absolute -left-40 top-40 h-96 w-96 rounded-full bg-purple-600/[0.08] dark:bg-purple-600/[0.04] blur-[120px]" />
      <div className="pointer-events-none absolute -right-40 bottom-20 h-80 w-80 rounded-full bg-fuchsia-600/[0.06] dark:bg-fuchsia-600/[0.03] blur-[100px]" />

      <div className="relative z-10 mx-auto max-w-7xl">

        {/* Section heading */}
        <SectionHeading
          badge="ABOUT ME"
          title="Background & Architecture"
          subtitle="A deeper look into my technical journey, mindset, and what drives my work"
        />

        <div className="mt-16 grid grid-cols-1 items-center gap-14 lg:grid-cols-12 lg:gap-16">

          {/* LEFT SIDE - ABOUT CONTENT */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: -35 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="order-2 lg:order-1 lg:col-span-7"
          >
            <div className="mb-5 flex items-center gap-2 font-mono text-xs tracking-widest text-purple-600 dark:text-purple-400 font-bold">
              <Sparkles size={15} />
              WHO I AM / WHAT I DO
            </div>

            <h2 className="mb-8 text-4xl font-black leading-[1.05] tracking-tight text-[var(--text-primary)] sm:text-5xl xl:text-6xl">
              A LITTLE BIT
              <span className="block text-purple-600 dark:text-purple-400">
                ABOUT ME.
              </span>
            </h2>

            {/* Biography */}
            {paragraphs.length > 0 && (
              <div className="space-y-5">
                {paragraphs.map((paragraph, index) => (
                  <motion.p
                    key={index}
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, y: 18 }
                    }
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: index * 0.12,
                    }}
                    className="text-base font-light leading-8 text-[var(--text-secondary)] sm:text-lg"
                  >
                    {paragraph}
                  </motion.p>
                ))}
              </div>
            )}

            {/* Personal information */}
            <div className="mt-10 border-t border-[var(--border-subtle)]">
              {info.map((item, index) => {
                const Icon = item.icon;

                return (
                  <motion.div
                    key={item.label}
                    initial={
                      reduceMotion
                        ? false
                        : { opacity: 0, x: -15 }
                    }
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.4,
                      delay: index * 0.1,
                    }}
                    className="group flex items-center justify-between gap-4 border-b border-[var(--border-subtle)] py-4"
                  >
                    <div className="flex items-center gap-3">
                      <Icon
                        size={17}
                        className="text-purple-600 dark:text-purple-400"
                      />

                      <span className="font-mono text-[10px] tracking-widest text-[var(--text-muted)]">
                        {item.label}
                      </span>
                    </div>

                    <span className="text-right text-sm text-[var(--text-primary)] transition-colors group-hover:text-purple-600 dark:group-hover:text-purple-400 font-medium">
                      {item.value}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* RIGHT SIDE - CIRCULAR PROFILE PHOTO */}
          <motion.div
            initial={reduceMotion ? false : { opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.9, delay: 0.15 }}
            className="order-1 flex flex-col items-center lg:order-2 lg:col-span-5"
          >
            <div className="relative flex aspect-square w-full max-w-[390px] items-center justify-center">

              {/* Background glow */}
              <div className="absolute inset-12 rounded-full bg-purple-600/15 dark:bg-purple-600/10 blur-[75px]" />

              {/* Rotating outer ring */}
              <motion.div
                animate={
                  reduceMotion ? undefined : { rotate: 360 }
                }
                transition={{
                  duration: 30,
                  repeat: Infinity,
                  ease: 'linear',
                }}
                className="absolute inset-1 rounded-full border border-dashed border-purple-500/40"
              />

              {/* Second ring */}
              <div className="absolute inset-5 rounded-full border border-purple-500/25" />

              {/* Third ring */}
              <div className="absolute inset-8 rounded-full border border-[var(--border-subtle)]" />

              {/* Circular image */}
              <motion.div
                animate={
                  reduceMotion ? undefined : { y: [0, -8, 0] }
                }
                transition={{
                  duration: 5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="group relative h-[76%] w-[76%] overflow-hidden rounded-full border-[3px] border-purple-600 dark:border-purple-400 bg-[var(--bg-card)] shadow-[0_0_35px_rgba(168,85,247,0.3)]"
              >
                {!imageFailed ? (
                  <img
                    key={photoUrl}
                    src={photoUrl}
                    alt={`${profile.full_name || 'Profile'} portrait`}
                    loading="eager"
                    referrerPolicy="no-referrer"
                    className="h-full w-full object-cover object-center transition-transform duration-700 group-hover:scale-110"
                    onLoad={() => {
                      console.log('Profile image loaded:', photoUrl);
                    }}
                    onError={() => {
                      console.error(
                        'Profile image failed to load:',
                        photoUrl
                      );
                      setImageFailed(true);
                    }}
                  />
                ) : (
                  <div className="flex h-full w-full flex-col items-center justify-center gap-3 text-[var(--text-muted)]">
                    <UserRound size={65} strokeWidth={1} />
                    <span className="font-mono text-[10px] tracking-widest">
                      IMAGE NOT AVAILABLE
                    </span>
                  </div>
                )}

                {/* Image overlay */}
                <div className="pointer-events-none absolute inset-0 rounded-full bg-gradient-to-t from-black/25 to-transparent" />
              </motion.div>

              {/* Floating availability badge */}
              <motion.div
                animate={
                  reduceMotion ? undefined : { y: [0, -7, 0] }
                }
                transition={{
                  duration: 4,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute bottom-[12%] -right-2 rounded-xl border border-purple-500/40 bg-[var(--bg-surface)] px-4 py-3 shadow-xl backdrop-blur-md"
              >
                <div className="flex items-center gap-2">
                  <span className="h-2 w-2 animate-pulse rounded-full bg-purple-600 dark:bg-purple-400 shadow-[0_0_8px_rgba(168,85,247,0.8)]" />

                  <span className="font-mono text-[9px] tracking-widest text-purple-600 dark:text-purple-400 font-bold">
                    STATUS
                  </span>
                </div>

                <p className="mt-1 text-xs font-semibold text-[var(--text-primary)]">
                  {profile.availability_status || 'Open to opportunities'}
                </p>
              </motion.div>

              {/* Floating code icon */}
              <motion.div
                animate={
                  reduceMotion ? undefined : { y: [0, 8, 0] }
                }
                transition={{
                  duration: 4.5,
                  repeat: Infinity,
                  ease: 'easeInOut',
                }}
                className="absolute left-0 top-[12%] flex h-12 w-12 items-center justify-center rounded-full border border-purple-500/40 bg-[var(--bg-surface)] text-purple-600 dark:text-purple-400 shadow-[0_0_20px_rgba(168,85,247,0.25)]"
              >
                <Code2 size={21} />
              </motion.div>
            </div>

            {/* Name and title */}
            <motion.div
              initial={
                reduceMotion ? false : { opacity: 0, y: 15 }
              }
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mt-7 text-center"
            >
              <h3 className="text-2xl font-bold tracking-tight text-[var(--text-primary)]">
                {profile.full_name}
              </h3>

              <p className="mt-2 font-mono text-xs uppercase tracking-widest text-purple-600 dark:text-purple-400 font-bold">
                {profile.professional_title}
              </p>
            </motion.div>
          </motion.div>
        </div>

        {/* Bottom philosophy strip */}
        <motion.div
          initial={reduceMotion ? false : { opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mt-24 flex flex-col items-start justify-between gap-6 border-y border-[var(--border-subtle)] py-10 sm:flex-row sm:items-center"
        >
          <div>
            <p className="mb-3 font-mono text-[10px] tracking-widest text-purple-600 dark:text-purple-400 font-bold">
              MY APPROACH
            </p>

            <h3 className="text-2xl font-bold text-[var(--text-primary)] sm:text-3xl">
              Learn. Build. Improve. Repeat.
            </h3>
          </div>

          <div className="flex items-center gap-2 font-mono text-xs text-[var(--text-muted)]">
            <span>CONTINUOUSLY EVOLVING</span>
            <ArrowUpRight
              size={16}
              className="text-purple-600 dark:text-purple-400"
            />
          </div>
        </motion.div>

      </div>
    </section>
  );
}
