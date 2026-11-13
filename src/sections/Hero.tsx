import { useState, useEffect } from 'react';
import {
  motion,
  useReducedMotion,
} from 'framer-motion';

import {
  ArrowDown,
  ArrowRight,
  MapPin,
  Download,
  Video,
  Sparkles,
  Terminal,
  Braces,
} from 'lucide-react';

import {
  FaGithub,
  FaLinkedin,
  FaGitAlt,
  FaReact,
  FaDocker,
  FaNodeJs,
  FaPython,
  FaLinux,
  FaAws,
  FaFigma,
  FaNpm,
  FaUbuntu,
} from 'react-icons/fa';

import { VscVscode } from 'react-icons/vsc';
import {
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiNextdotjs,
  SiGraphql,
  SiKubernetes,
  SiRedis,
  SiFirebase,
  SiVite,
  SiVercel,
} from 'react-icons/si';

import type {
  Profile,
  SocialLink,
} from '../types/portfolio';

interface HeroProps {
  profile: Profile | null;
  socialLinks?: SocialLink[];
  projectCount?: number;
}

// Fallback ambient space/tech video if profile.background is not set
const DEFAULT_HERO_VIDEO =
  'https://assets.mixkit.co/videos/preview/mixkit-stars-in-space-1610-large.mp4';

// Top-to-bottom gradients that fade cleanly into deep purple & black
const GRADIENT_LAYERS = [
  'from-indigo-950/90 via-purple-900/65 to-[#090212]',
  'from-violet-950/90 via-purple-800/60 to-[#090212]',
  'from-fuchsia-950/85 via-purple-900/65 to-[#090212]',
  'from-sky-950/85 via-purple-900/65 to-[#090212]',
  'from-cyan-950/80 via-purple-900/65 to-[#090212]',
];

// Primary horizontal orbit logos rotating around the center globe
const GLOBE_ICONS = [
  { id: 'g-vscode', Icon: VscVscode, color: 'text-sky-400', angle: 0, radiusX: 170, radiusY: 62 },
  { id: 'g-react', Icon: FaReact, color: 'text-cyan-400', angle: 45, radiusX: 170, radiusY: 62 },
  { id: 'g-git', Icon: FaGitAlt, color: 'text-orange-500', angle: 90, radiusX: 170, radiusY: 62 },
  { id: 'g-ts', Icon: SiTypescript, color: 'text-blue-400', angle: 135, radiusX: 170, radiusY: 62 },
  { id: 'g-python', Icon: FaPython, color: 'text-amber-400', angle: 180, radiusX: 170, radiusY: 62 },
  { id: 'g-node', Icon: FaNodeJs, color: 'text-emerald-400', angle: 225, radiusX: 170, radiusY: 62 },
  { id: 'g-docker', Icon: FaDocker, color: 'text-sky-500', angle: 270, radiusX: 170, radiusY: 62 },
  { id: 'g-mongo', Icon: SiMongodb, color: 'text-green-400', angle: 315, radiusX: 170, radiusY: 62 },
];

// Secondary tilted orbit ring logos around the center globe
const GLOBE_INNER_ICONS = [
  { id: 'gi-next', Icon: SiNextdotjs, color: 'text-white', angle: 30, radiusX: 76, radiusY: 160 },
  { id: 'gi-linux', Icon: FaLinux, color: 'text-amber-300', angle: 120, radiusX: 76, radiusY: 160 },
  { id: 'gi-pg', Icon: SiPostgresql, color: 'text-sky-300', angle: 210, radiusX: 76, radiusY: 160 },
  { id: 'gi-gql', Icon: SiGraphql, color: 'text-rose-400', angle: 300, radiusX: 76, radiusY: 160 },
];

// 14 Zero-gravity space-floating application icons across the Hero canvas
const FLOATING_APPS = [
  {
    id: 'vscode',
    Icon: VscVscode,
    color: 'text-sky-400',
    glow: 'shadow-[0_0_25px_rgba(168,85,247,0.28)]',
    position: 'top-[14%] right-[9%]',
    size: 26,
    driftY: [-18, 22, -18],
    driftX: [-12, 14, -12],
    rotate: [-6, 8, -6],
    duration: 9,
  },
  {
    id: 'git',
    Icon: FaGitAlt,
    color: 'text-orange-500',
    glow: 'shadow-[0_0_25px_rgba(168,85,247,0.28)]',
    position: 'top-[27%] right-[23%]',
    size: 24,
    driftY: [20, -24, 20],
    driftX: [10, -15, 10],
    rotate: [8, -7, 8],
    duration: 11,
  },
  {
    id: 'react',
    Icon: FaReact,
    color: 'text-cyan-400',
    glow: 'shadow-[0_0_25px_rgba(168,85,247,0.28)]',
    position: 'top-[54%] right-[7%]',
    size: 28,
    driftY: [-22, 18, -22],
    driftX: [14, -10, 14],
    rotate: [-10, 12, -10],
    duration: 10,
  },
  {
    id: 'typescript',
    Icon: SiTypescript,
    color: 'text-blue-400',
    glow: 'shadow-[0_0_25px_rgba(168,85,247,0.28)]',
    position: 'top-[17%] right-[34%] hidden md:flex',
    size: 22,
    driftY: [16, -20, 16],
    driftX: [-14, 10, -14],
    rotate: [5, -6, 5],
    duration: 12,
  },
  {
    id: 'docker',
    Icon: FaDocker,
    color: 'text-sky-500',
    glow: 'shadow-[0_0_25px_rgba(168,85,247,0.28)]',
    position: 'bottom-[21%] right-[22%]',
    size: 26,
    driftY: [-15, 25, -15],
    driftX: [-10, 16, -10],
    rotate: [-5, 7, -5],
    duration: 13,
  },
  {
    id: 'node',
    Icon: FaNodeJs,
    color: 'text-emerald-400',
    glow: 'shadow-[0_0_25px_rgba(168,85,247,0.28)]',
    position: 'top-[40%] right-[4%] hidden lg:flex',
    size: 26,
    driftY: [22, -16, 22],
    driftX: [-12, 12, -12],
    rotate: [7, -8, 7],
    duration: 9.5,
  },
  {
    id: 'tailwind',
    Icon: SiTailwindcss,
    color: 'text-teal-400',
    glow: 'shadow-[0_0_25px_rgba(168,85,247,0.28)]',
    position: 'bottom-[15%] right-[35%] hidden md:flex',
    size: 24,
    driftY: [-20, 16, -20],
    driftX: [12, -14, 12],
    rotate: [-8, 6, -8],
    duration: 11.5,
  },
  {
    id: 'python',
    Icon: FaPython,
    color: 'text-amber-400',
    glow: 'shadow-[0_0_25px_rgba(168,85,247,0.28)]',
    position: 'top-[68%] right-[16%] hidden sm:flex',
    size: 25,
    driftY: [18, -22, 18],
    driftX: [-16, 8, -16],
    rotate: [6, -9, 6],
    duration: 10.5,
  },
  {
    id: 'aws',
    Icon: FaAws,
    color: 'text-orange-400',
    glow: 'shadow-[0_0_25px_rgba(168,85,247,0.28)]',
    position: 'bottom-[28%] right-[6%] hidden lg:flex',
    size: 26,
    driftY: [-14, 20, -14],
    driftX: [10, -12, 10],
    rotate: [-7, 7, -7],
    duration: 12.5,
  },
  {
    id: 'figma',
    Icon: FaFigma,
    color: 'text-rose-400',
    glow: 'shadow-[0_0_25px_rgba(168,85,247,0.28)]',
    position: 'top-[11%] right-[21%] hidden sm:flex',
    size: 22,
    driftY: [14, -18, 14],
    driftX: [-10, 12, -10],
    rotate: [6, -6, 6],
    duration: 11.2,
  },
  {
    id: 'kubernetes',
    Icon: SiKubernetes,
    color: 'text-blue-500',
    glow: 'shadow-[0_0_25px_rgba(168,85,247,0.28)]',
    position: 'top-[12%] left-[44%] hidden lg:flex',
    size: 24,
    driftY: [-16, 20, -16],
    driftX: [12, -10, 12],
    rotate: [-8, 10, -8],
    duration: 13.4,
  },
  {
    id: 'firebase',
    Icon: SiFirebase,
    color: 'text-amber-500',
    glow: 'shadow-[0_0_25px_rgba(168,85,247,0.28)]',
    position: 'bottom-[14%] left-[46%] hidden md:flex',
    size: 23,
    driftY: [18, -16, 18],
    driftX: [-12, 14, -12],
    rotate: [5, -7, 5],
    duration: 10.6,
  },
  {
    id: 'vite',
    Icon: SiVite,
    color: 'text-purple-400',
    glow: 'shadow-[0_0_25px_rgba(168,85,247,0.28)]',
    position: 'top-[44%] right-[19%] hidden xl:flex',
    size: 23,
    driftY: [15, -17, 15],
    driftX: [-11, 9, -11],
    rotate: [7, -7, 7],
    duration: 12.2,
  },
  {
    id: 'terminal',
    Icon: Terminal,
    color: 'text-fuchsia-400',
    glow: 'shadow-[0_0_25px_rgba(168,85,247,0.28)]',
    position: 'bottom-[11%] right-[11%] hidden sm:flex',
    size: 22,
    driftY: [-16, 18, -16],
    driftX: [8, -12, 8],
    rotate: [-5, 8, -5],
    duration: 10.8,
  },
];

type BackgroundMedia =
  | { type: 'direct'; url: string }
  | { type: 'youtube'; url: string }
  | null;

function parseBackgroundMedia(url?: string): BackgroundMedia {
  const targetUrl = url?.trim() || DEFAULT_HERO_VIDEO;

  try {
    const parsedUrl = new URL(targetUrl);

    if (/\.(mp4|webm|ogg)(\?.*)?$/i.test(parsedUrl.pathname)) {
      return { type: 'direct', url: targetUrl };
    }

    let videoId = '';
    if (
      parsedUrl.hostname === 'youtu.be' ||
      parsedUrl.hostname.endsWith('.youtu.be')
    ) {
      videoId = parsedUrl.pathname.slice(1).split('/')[0];
    } else if (parsedUrl.pathname.startsWith('/shorts/')) {
      videoId = parsedUrl.pathname.split('/')[2];
    } else if (parsedUrl.pathname.startsWith('/embed/')) {
      videoId = parsedUrl.pathname.split('/')[2];
    } else {
      videoId = parsedUrl.searchParams.get('v') || '';
    }

    if (!/^[a-zA-Z0-9_-]{11}$/.test(videoId)) {
      return { type: 'direct', url: DEFAULT_HERO_VIDEO };
    }

    const params = new URLSearchParams({
      autoplay: '1',
      mute: '1',
      loop: '1',
      playlist: videoId,
      controls: '0',
      disablekb: '1',
      fs: '0',
      modestbranding: '1',
      rel: '0',
      playsinline: '1',
      iv_load_policy: '3',
    });

    return {
      type: 'youtube',
      url: `https://www.youtube-nocookie.com/embed/${videoId}?${params.toString()}`,
    };
  } catch {
    return { type: 'direct', url: DEFAULT_HERO_VIDEO };
  }
}

export function Hero({
  profile,
  socialLinks = [],
  projectCount = 0,
}: HeroProps) {
  const reduceMotion = useReducedMotion();
  const media = parseBackgroundMedia(profile?.background);

  const [bgMode, setBgMode] = useState<'video' | 'gradient'>(
    profile?.background ? 'video' : 'gradient'
  );
  const [gradientIndex, setGradientIndex] = useState(0);
  const [orbitAngle, setOrbitAngle] = useState(0);

  useEffect(() => {
    setBgMode(profile?.background ? 'video' : 'gradient');
  }, [profile?.background]);

  const showVideo = Boolean(media) && bgMode === 'video';

  useEffect(() => {
    if (showVideo || reduceMotion) return;

    const interval = setInterval(() => {
      setGradientIndex((prev) => (prev + 1) % GRADIENT_LAYERS.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [showVideo, reduceMotion]);

  useEffect(() => {
    if (reduceMotion) return;
    let frameId: number;
    let lastTime = performance.now();

    const tick = (now: number) => {
      const delta = (now - lastTime) / 1000;
      lastTime = now;
      setOrbitAngle((prev) => (prev + delta * 30) % 360);
      frameId = requestAnimationFrame(tick);
    };

    frameId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frameId);
  }, [reduceMotion]);

  if (!profile) return null;

  const name = profile.full_name || 'Your Name';
  const title = profile.professional_title || 'Developer';
  const tagline =
    profile.tagline || 'Building ideas into digital experiences.';
  const introduction =
    profile.short_bio || 'I build useful digital experiences.';
  const location = profile.location || 'India';

  const github = socialLinks.find(
    (item) => item.platform?.toLowerCase() === 'github'
  );
  const linkedin = socialLinks.find(
    (item) => item.platform?.toLowerCase() === 'linkedin'
  );

  const animation = {
    hidden: { opacity: 0, y: 25 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      id="home"
      className="
        relative flex min-h-screen
        items-center overflow-hidden
        bg-[#07030d]
        px-6 sm:px-10
      "
    >
      {/* 1. VIDEO BACKGROUND */}
      {showVideo && media && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden select-none">
          {media.type === 'direct' ? (
            <video
              src={media.url}
              autoPlay
              muted
              loop
              playsInline
              preload="auto"
              aria-hidden="true"
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="relative h-full w-full overflow-hidden">
              <iframe
                src={media.url}
                title="Hero background video"
                className="
                  pointer-events-none
                  absolute left-1/2 top-1/2
                  h-[56.25vw] min-h-full
                  w-[177.78vh] min-w-full
                  -translate-x-1/2 -translate-y-1/2
                  border-0
                "
                allow="autoplay; encrypted-media"
                referrerPolicy="strict-origin-when-cross-origin"
                tabIndex={-1}
                aria-hidden="true"
              />
              <div className="absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-black via-black/90 to-transparent" />
              <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-black via-black/95 to-transparent" />
            </div>
          )}

          {/* Readability tint */}
          <div className="absolute inset-0 bg-black/55" />
        </div>
      )}

      {/* 2. TOP-TO-BOTTOM PURPLE FADE + LEFT-TO-RIGHT FLOWING GRADIENT BACKGROUND */}
      {!showVideo && (
        <div className="pointer-events-none absolute inset-0 z-0 overflow-hidden bg-[#07030d]">
          {/* Base Top-to-Bottom Gradient Layers fading into Purple */}
          {GRADIENT_LAYERS.map((gradientClasses, idx) => (
            <motion.div
              key={idx}
              initial={false}
              animate={{
                opacity: gradientIndex === idx ? 1 : 0,
              }}
              transition={{
                opacity: { duration: 1.5, ease: 'easeInOut' },
              }}
              className={`
                absolute inset-0
                bg-gradient-to-b
                ${gradientClasses}
              `}
            />
          ))}

          {/* Left-to-Right Flowing Gradient Wave */}
          {!reduceMotion && (
            <motion.div
              animate={{
                x: ['-100%', '100%'],
              }}
              transition={{
                duration: 8,
                repeat: Infinity,
                ease: 'linear',
              }}
              className="
                absolute inset-y-0 left-0
                w-full
                bg-gradient-to-r
                from-transparent
                via-purple-500/25
                to-transparent
                blur-3xl
              "
            />
          )}

          {/* Secondary Left-to-Right Fuchsia/Indigo Color Stream */}
          {!reduceMotion && (
            <motion.div
              animate={{
                x: ['-120%', '120%'],
              }}
              transition={{
                duration: 12,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className="
                absolute inset-y-0 left-0
                w-3/4
                bg-gradient-to-r
                from-indigo-600/15
                via-fuchsia-600/25
                to-purple-700/15
                blur-[110px]
              "
            />
          )}

          {/* Dedicated Bottom Purple Glow Pool */}
          <div
            className="
              absolute inset-x-0 bottom-0
              h-1/2
              bg-gradient-to-t
              from-purple-950/75
              via-purple-900/30
              to-transparent
            "
          />
        </div>
      )}

      {/* Bottom transition fade into next section */}
      <div
        className="
          pointer-events-none absolute inset-x-0 bottom-0
          z-[1] h-36
          bg-gradient-to-t
          from-black
          via-purple-950/40
          to-transparent
        "
      />

      {/* Background grid (Purple) */}
      <div
        className="
          pointer-events-none absolute inset-0
          z-[2] opacity-[0.12]
        "
        style={{
          backgroundImage:
            'linear-gradient(rgba(168,85,247,0.25) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.25) 1px, transparent 1px)',
          backgroundSize: '75px 75px',
          maskImage: 'linear-gradient(to bottom, black 45%, transparent 95%)',
        }}
      />

      {/* 3. HERO-ONLY CENTER ORBITING TECH GLOBE WITH APPLICATION LOGOS */}
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute left-1/2 top-1/2
          z-[4] -translate-x-1/2 -translate-y-1/2
          hidden sm:flex items-center justify-center
          select-none
        "
      >
        <div className="relative flex h-[400px] w-[400px] items-center justify-center">
          {/* Outer purple cosmic halo */}
          <div className="absolute inset-0 rounded-full bg-purple-600/20 blur-3xl" />

          {/* Wireframe latitude/longitude globe rings */}
          <motion.div
            animate={reduceMotion ? undefined : { rotate: 360 }}
            transition={{ duration: 32, repeat: Infinity, ease: 'linear' }}
            className="
              absolute h-[340px] w-[340px]
              rounded-full
              border border-purple-500/30
              shadow-[inset_0_0_45px_rgba(168,85,247,0.2)]
            "
          />
          <div
            className="
              absolute h-[340px] w-[160px]
              rounded-full
              border border-purple-400/25
              rotate-12
            "
          />
          <div
            className="
              absolute h-[160px] w-[340px]
              rounded-full
              border border-fuchsia-400/25
              -rotate-12
            "
          />
          <div
            className="
              absolute h-[270px] w-[270px]
              rounded-full
              border border-dashed border-purple-400/20
            "
          />

          {/* Solid dark globe core */}
          <div
            className="
              relative z-10
              flex h-[220px] w-[220px]
              items-center justify-center
              rounded-full
              border border-purple-500/40
              bg-[#090411]
              shadow-[0_0_70px_rgba(0,0,0,0.95),inset_0_0_40px_rgba(168,85,247,0.3)]
            "
          >
            <div className="h-[170px] w-[170px] rounded-full border border-purple-400/20" />
            <div className="absolute h-[170px] w-[80px] rounded-full border border-purple-400/20 rotate-45" />
            <div className="absolute h-[80px] w-[170px] rounded-full border border-purple-400/20 rotate-45" />
          </div>

          {/* Primary Horizontal Rotating Application Logos */}
          {GLOBE_ICONS.map(({ id, Icon, color, angle, radiusX, radiusY }) => {
            const rad = ((angle + orbitAngle) * Math.PI) / 180;
            const x = Math.cos(rad) * radiusX;
            const y = Math.sin(rad) * radiusY;
            const isFront = Math.sin(rad) >= 0;

            return (
              <div
                key={id}
                style={{
                  transform: `translate3d(${x}px, ${y}px, 0) scale(${isFront ? 1.12 : 0.78})`,
                  zIndex: isFront ? 20 : 5,
                  opacity: isFront ? 1 : 0.42,
                }}
                className="
                  absolute flex h-11 w-11
                  items-center justify-center
                  rounded-xl
                  border border-purple-500/30
                  bg-zinc-950/95
                  shadow-[0_0_18px_rgba(168,85,247,0.22)]
                "
              >
                <Icon size={21} className={color} />
              </div>
            );
          })}

          {/* Secondary Tilted Rotating Application Logos */}
          {GLOBE_INNER_ICONS.map(({ id, Icon, color, angle, radiusX, radiusY }) => {
            const rad = ((angle - orbitAngle * 0.85) * Math.PI) / 180;
            const x = Math.cos(rad) * radiusX;
            const y = Math.sin(rad) * radiusY;
            const isFront = Math.cos(rad) >= 0;

            return (
              <div
                key={id}
                style={{
                  transform: `translate3d(${x}px, ${y}px, 0) scale(${isFront ? 1.06 : 0.76})`,
                  zIndex: isFront ? 18 : 4,
                  opacity: isFront ? 0.95 : 0.38,
                }}
                className="
                  absolute flex h-10 w-10
                  items-center justify-center
                  rounded-xl
                  border border-purple-500/30
                  bg-zinc-950/95
                  shadow-[0_0_15px_rgba(168,85,247,0.2)]
                "
              >
                <Icon size={18} className={color} />
              </div>
            );
          })}
        </div>
      </div>

      {/* 4. 14 ZERO-GRAVITY FLOATING SPACE APPLICATION ICONS */}
      <div
        className="pointer-events-none absolute inset-0 z-[3] overflow-hidden"
        aria-hidden="true"
      >
        {FLOATING_APPS.map(
          ({ id, Icon, color, glow, position, size, driftY, driftX, rotate, duration }) => (
            <motion.div
              key={id}
              animate={
                reduceMotion
                  ? undefined
                  : {
                      y: driftY,
                      x: driftX,
                      rotate,
                    }
              }
              transition={{
                duration,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
              className={`
                absolute ${position}
                flex h-13 w-13 p-3
                items-center justify-center
                rounded-2xl
                border border-purple-500/25
                bg-purple-950/20
                backdrop-blur-md
                ${glow}
              `}
            >
              <Icon size={size} className={`${color} opacity-90`} />
            </motion.div>
          )
        )}
      </div>

      {/* 5. VIDEO / GRADIENT BACKGROUND SWITCHER BUTTON */}
      {media && (
        <div className="absolute right-6 top-24 z-20 sm:right-10">
          <button
            type="button"
            onClick={() =>
              setBgMode((prev) => (prev === 'video' ? 'gradient' : 'video'))
            }
            aria-label={
              showVideo
                ? 'Switch background to flowing purple gradient'
                : 'Switch background to video'
            }
            className="
              inline-flex items-center gap-2
              rounded-full
              border border-purple-500/40
              bg-black/65 backdrop-blur-md
              px-4 py-2
              font-mono text-xs font-medium
              text-white
              shadow-[0_0_20px_rgba(168,85,247,0.25)]
              transition-all duration-300
              hover:border-purple-400
              hover:bg-purple-950/50
              hover:text-purple-300
              cursor-pointer
            "
          >
            {showVideo ? (
              <>
                <Sparkles size={14} className="text-purple-400" />
                <span>Gradient BG</span>
              </>
            ) : (
              <>
                <Video size={14} className="text-purple-400" />
                <span>Video BG</span>
              </>
            )}
          </button>
        </div>
      )}

      {/* Animated laser lines (Purple) */}
      {!reduceMotion && (
        <>
          <motion.div
            animate={{ x: ['-10%', '110%'] }}
            transition={{
              duration: 12,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="
              pointer-events-none absolute top-[25%]
              z-[3] h-px w-64
              bg-gradient-to-r
              from-transparent
              via-purple-500/60
              to-transparent
            "
          />

          <motion.div
            animate={{ x: ['110%', '-20%'] }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="
              pointer-events-none absolute bottom-[25%]
              z-[3] h-px w-72
              bg-gradient-to-r
              from-transparent
              via-fuchsia-500/45
              to-transparent
            "
          />
        </>
      )}

      {/* Main hero content */}
      <div
        className="
          relative z-10
          mx-auto flex w-full max-w-7xl
          items-center justify-start
          py-28 sm:py-32
          -translate-x-4 sm:-translate-x-8 lg:-translate-x-[38px]
        "
      >
        <div className="w-full max-w-2xl text-left">
          {/* Intro label */}
          <motion.div
            variants={animation}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5 }}
            className="
              mb-6 flex items-center gap-3
              font-mono text-xs
              tracking-[0.25em]
              text-purple-400
              font-bold
            "
          >
            <span
              className="
                h-2 w-2 rounded-full
                bg-purple-400
                shadow-[0_0_12px_rgba(168,85,247,0.8)]
              "
            />
            HELLO, I'M
          </motion.div>

          {/* Animated name */}
          <motion.h1
            style={{ perspective: 1000 }}
            className="
              relative flex flex-wrap
              text-5xl sm:text-6xl
              md:text-7xl xl:text-[90px]
              font-black
              leading-[0.95]
              tracking-[-0.065em]
              uppercase
              text-white
            "
            aria-label={name}
          >
            {name.split('').map((letter, index) => (
              <motion.span
                key={`${letter}-${index}`}
                initial={
                  reduceMotion
                    ? false
                    : {
                        opacity: 0,
                        y: 50,
                        rotateX: -90,
                      }
                }
                animate={
                  reduceMotion
                    ? { opacity: 1, y: 0, rotateX: 0 }
                    : {
                        opacity: 1,
                        rotateX: 0,
                        y: [0, -10, 0],
                        color: ['#ffffff', '#A855F7', '#ffffff'],
                        textShadow: [
                          '0 0 25px rgba(168,85,247,0.12)',
                          '0 0 40px rgba(168,85,247,0.75)',
                          '0 0 25px rgba(168,85,247,0.12)',
                        ],
                      }
                }
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : {
                        opacity: {
                          duration: 0.5,
                          delay: 0.15 + index * 0.04,
                        },
                        rotateX: {
                          duration: 0.5,
                          delay: 0.15 + index * 0.04,
                          ease: [0.22, 1, 0.36, 1],
                        },
                        y: {
                          duration: 0.55,
                          delay: 0.8 + index * 0.045,
                          repeat: Infinity,
                          repeatDelay: 2.45,
                          ease: 'easeInOut',
                        },
                        color: {
                          duration: 0.55,
                          delay: 0.8 + index * 0.045,
                          repeat: Infinity,
                          repeatDelay: 2.45,
                          ease: 'easeInOut',
                        },
                        textShadow: {
                          duration: 0.55,
                          delay: 0.8 + index * 0.045,
                          repeat: Infinity,
                          repeatDelay: 2.45,
                          ease: 'easeInOut',
                        },
                      }
                }
                className={`inline-block ${letter === ' ' ? 'w-[0.25em]' : ''}`}
              >
                {letter === ' ' ? '\u00A0' : letter}
              </motion.span>
            ))}
          </motion.h1>

          {/* Neon underline */}
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: 'min(180px, 50vw)' }}
            transition={{
              duration: 0.7,
              delay: reduceMotion ? 0 : 0.45,
              ease: 'easeOut',
            }}
            className="
              mt-6 h-1 rounded-full
              bg-gradient-to-r from-purple-600 via-fuchsia-500 to-transparent
              shadow-[0_0_20px_rgba(168,85,247,0.65)]
            "
          />

          {/* Neon light sweep */}
          {!reduceMotion && (
            <motion.div
              initial={{ x: '-120%', opacity: 0 }}
              animate={{ x: '220%', opacity: [0, 1, 0] }}
              transition={{
                duration: 1.2,
                delay: 0.8,
                repeat: Infinity,
                repeatDelay: 1.8,
                ease: 'easeInOut',
              }}
              className="
                pointer-events-none
                absolute left-0 mt-2
                h-[2px] w-40
                bg-gradient-to-r
                from-transparent
                via-[#A855F7]
                to-transparent
                shadow-[0_0_15px_#A855F7]
              "
            />
          )}

          {/* Professional title */}
          <motion.div
            variants={animation}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.35 }}
            className="
              mt-7
              text-xl sm:text-3xl
              md:text-4xl
              font-bold
              tracking-tight
              text-purple-400
            "
          >
            {title}
          </motion.div>

          {/* Tagline */}
          <motion.p
            variants={animation}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.5 }}
            className="
              mt-6 max-w-xl
              text-lg sm:text-xl
              leading-relaxed
              text-zinc-100
            "
          >
            "{tagline}"
          </motion.p>

          {/* Introduction */}
          <motion.p
            variants={animation}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.65 }}
            className="
              mt-4 max-w-xl
              text-sm sm:text-base
              leading-7
              text-zinc-400
            "
          >
            {introduction}
          </motion.p>

          {/* Location */}
          <motion.div
            variants={animation}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.75 }}
            className="
              mt-6 flex items-center gap-2
              font-mono text-sm
              text-zinc-400
            "
          >
            <MapPin
              size={16}
              className="text-purple-400"
            />
            {location}
          </motion.div>

          {/* Action buttons */}
          <motion.div
            variants={animation}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.85 }}
            className="mt-8 flex flex-wrap items-center gap-3"
          >
            <a
              href="#projects"
              className="
                group inline-flex
                items-center gap-3
                rounded-xl
                neon-glow-btn
                px-6 py-3
                text-sm font-bold
                transition-all duration-300
                hover:scale-105
              "
            >
              View Projects
              <ArrowRight
                size={17}
                className="transition-transform group-hover:translate-x-1"
              />
            </a>

            {profile.resume_url && (
              <a
                href={profile.resume_url}
                target="_blank"
                rel="noreferrer"
                className="
                  inline-flex items-center gap-3
                  rounded-xl
                  border border-white/15
                  bg-purple-500/10
                  px-6 py-3
                  text-sm font-semibold
                  text-white
                  transition-all duration-300
                  hover:border-purple-500/60
                  hover:text-purple-400
                  hover:bg-purple-500/15
                "
              >
                <Download size={16} />
                Download CV
              </a>
            )}
          </motion.div>

          {/* Social links */}
          <motion.div
            variants={animation}
            initial="hidden"
            animate="visible"
            transition={{ duration: 0.5, delay: 0.95 }}
            className="mt-7 flex items-center gap-3"
          >
            {github?.url && (
              <a
                href={github.url}
                target="_blank"
                rel="noreferrer"
                aria-label="GitHub"
                title="GitHub"
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-xl
                  border border-white/15
                  bg-white/[0.04]
                  text-white
                  transition-all duration-300
                  hover:border-purple-500
                  hover:text-purple-400
                  hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]
                  cursor-pointer
                "
              >
                <FaGithub size={21} />
              </a>
            )}

            {linkedin?.url && (
              <a
                href={linkedin.url}
                target="_blank"
                rel="noreferrer"
                aria-label="LinkedIn"
                title="LinkedIn"
                className="
                  flex h-11 w-11
                  items-center justify-center
                  rounded-xl
                  border border-white/15
                  bg-white/[0.04]
                  text-white
                  transition-all duration-300
                  hover:border-purple-500
                  hover:text-purple-400
                  hover:shadow-[0_0_15px_rgba(168,85,247,0.3)]
                  cursor-pointer
                "
              >
                <FaLinkedin size={21} />
              </a>
            )}
          </motion.div>

          {/* Project count */}
          {projectCount > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 1.05 }}
              className="
                mt-9 font-mono
                text-xs tracking-widest
                text-zinc-400
              "
            >
              <span className="text-purple-400 font-bold">
                {String(projectCount).padStart(2, '0')}
              </span>{' '}
              PROJECTS IN PORTFOLIO
            </motion.div>
          )}
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.a
        href="#about"
        animate={reduceMotion ? undefined : { y: [0, 8, 0] }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
        className="
          absolute bottom-8 left-1/2
          z-10 -translate-x-1/2
          flex flex-col items-center gap-2
          text-zinc-400
          transition-colors
          hover:text-purple-400
        "
      >
        <span className="font-mono text-[9px] tracking-[0.3em]">
          SCROLL TO EXPLORE
        </span>
        <ArrowDown size={17} />
      </motion.a>
    </section>
  );
}