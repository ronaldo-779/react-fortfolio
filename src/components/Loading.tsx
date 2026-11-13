import { motion, useReducedMotion } from 'framer-motion';
import { Terminal } from 'lucide-react';
import {
  FaGitAlt,
  FaReact,
  FaDocker,
  FaNodeJs,
  FaPython,
  FaLinux,
  FaAws,
  FaFigma,
} from 'react-icons/fa';
import { VscVscode } from 'react-icons/vsc';
import {
  SiTypescript,
  SiTailwindcss,
  SiMongodb,
  SiPostgresql,
  SiVite,
} from 'react-icons/si';

// 14 Zero-gravity floating application icons positioned around the loader perimeter
const LOADER_FLOATING_ICONS = [
  {
    id: 'vscode',
    Icon: VscVscode,
    color: 'text-sky-400',
    position: 'top-[10%] left-[8%]',
    size: 22,
    driftY: [-14, 16, -14],
    driftX: [-10, 12, -10],
    rotate: [-6, 8, -6],
    duration: 8.5,
  },
  {
    id: 'react',
    Icon: FaReact,
    color: 'text-cyan-400',
    position: 'top-[14%] right-[10%]',
    size: 24,
    driftY: [16, -18, 16],
    driftX: [12, -10, 12],
    rotate: [-10, 10, -10],
    duration: 9.5,
  },
  {
    id: 'typescript',
    Icon: SiTypescript,
    color: 'text-blue-400',
    position: 'top-[28%] left-[18%] hidden sm:flex',
    size: 20,
    driftY: [-12, 15, -12],
    driftX: [8, -12, 8],
    rotate: [5, -6, 5],
    duration: 10.2,
  },
  {
    id: 'git',
    Icon: FaGitAlt,
    color: 'text-orange-500',
    position: 'top-[26%] right-[20%] hidden sm:flex',
    size: 22,
    driftY: [15, -14, 15],
    driftX: [-12, 9, -12],
    rotate: [7, -8, 7],
    duration: 11,
  },
  {
    id: 'docker',
    Icon: FaDocker,
    color: 'text-sky-500',
    position: 'top-[48%] left-[7%]',
    size: 24,
    driftY: [-16, 18, -16],
    driftX: [10, -10, 10],
    rotate: [-5, 7, -5],
    duration: 10.8,
  },
  {
    id: 'node',
    Icon: FaNodeJs,
    color: 'text-emerald-400',
    position: 'top-[50%] right-[8%]',
    size: 24,
    driftY: [18, -16, 18],
    driftX: [-10, 12, -10],
    rotate: [6, -7, 6],
    duration: 9.8,
  },
  {
    id: 'python',
    Icon: FaPython,
    color: 'text-amber-400',
    position: 'bottom-[26%] left-[16%] hidden sm:flex',
    size: 22,
    driftY: [-14, 16, -14],
    driftX: [-11, 10, -11],
    rotate: [-7, 6, -7],
    duration: 11.4,
  },
  {
    id: 'aws',
    Icon: FaAws,
    color: 'text-orange-400',
    position: 'bottom-[25%] right-[18%] hidden sm:flex',
    size: 23,
    driftY: [14, -18, 14],
    driftX: [11, -9, 11],
    rotate: [8, -6, 8],
    duration: 12,
  },
  {
    id: 'tailwind',
    Icon: SiTailwindcss,
    color: 'text-teal-400',
    position: 'bottom-[12%] left-[9%]',
    size: 22,
    driftY: [-15, 14, -15],
    driftX: [9, -12, 9],
    rotate: [-6, 8, -6],
    duration: 10.4,
  },
  {
    id: 'mongodb',
    Icon: SiMongodb,
    color: 'text-green-400',
    position: 'bottom-[11%] right-[10%]',
    size: 22,
    driftY: [16, -15, 16],
    driftX: [-9, 11, -9],
    rotate: [5, -7, 5],
    duration: 9.2,
  },
  {
    id: 'postgres',
    Icon: SiPostgresql,
    color: 'text-sky-300',
    position: 'top-[9%] left-[36%] hidden md:flex',
    size: 20,
    driftY: [-12, 14, -12],
    driftX: [10, -8, 10],
    rotate: [-5, 5, -5],
    duration: 11.8,
  },
  {
    id: 'figma',
    Icon: FaFigma,
    color: 'text-rose-400',
    position: 'top-[10%] right-[35%] hidden md:flex',
    size: 20,
    driftY: [13, -13, 13],
    driftX: [-8, 10, -8],
    rotate: [6, -6, 6],
    duration: 10.6,
  },
  {
    id: 'linux',
    Icon: FaLinux,
    color: 'text-amber-300',
    position: 'bottom-[9%] left-[35%] hidden md:flex',
    size: 21,
    driftY: [-13, 15, -13],
    driftX: [-10, 9, -10],
    rotate: [-6, 7, -6],
    duration: 12.2,
  },
  {
    id: 'vite',
    Icon: SiVite,
    color: 'text-purple-400',
    position: 'bottom-[9%] right-[34%] hidden md:flex',
    size: 21,
    driftY: [14, -12, 14],
    driftX: [9, -10, 9],
    rotate: [7, -5, 7],
    duration: 9.6,
  },
  {
    id: 'terminal',
    Icon: Terminal,
    color: 'text-fuchsia-400',
    position: 'top-[65%] left-[6%] hidden lg:flex',
    size: 20,
    driftY: [-12, 14, -12],
    driftX: [8, -8, 8],
    rotate: [-4, 6, -4],
    duration: 11.1,
  },
];

export function PageLoader() {
  const letters = 'RONALDO'.split('');
  const reduceMotion = useReducedMotion();

  return (
    <div
      className="
        fixed inset-0 z-[9999]
        flex min-h-screen
        items-center justify-center
        overflow-hidden
        bg-[var(--bg-primary)]
        px-6
      "
    >
      {/* Background glow */}
      <div
        className="
          pointer-events-none absolute
          left-1/2 top-1/2
          h-[450px] w-[450px]
          -translate-x-1/2 -translate-y-1/2
          rounded-full
          bg-purple-600/[0.12] dark:bg-purple-600/[0.08]
          blur-[130px]
        "
      />

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(168,85,247,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.2) 1px, transparent 1px)',
          backgroundSize: '55px 55px',
        }}
      />

      {/* Floating application icons */}
      <div
        className="pointer-events-none absolute inset-0 z-[2] overflow-hidden"
        aria-hidden="true"
      >
        {LOADER_FLOATING_ICONS.map(
          ({ id, Icon, color, position, size, driftY, driftX, rotate, duration }) => (
            <motion.div
              key={id}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                reduceMotion
                  ? { opacity: 0.75, scale: 1 }
                  : {
                      opacity: [0.45, 0.85, 0.45],
                      scale: 1,
                      y: driftY,
                      x: driftX,
                      rotate,
                    }
              }
              transition={
                reduceMotion
                  ? { duration: 0.4 }
                  : {
                      opacity: {
                        duration: duration * 0.6,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                      scale: { duration: 0.6 },
                      y: {
                        duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                      x: {
                        duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                      rotate: {
                        duration,
                        repeat: Infinity,
                        ease: 'easeInOut',
                      },
                    }
              }
              className={`
                absolute ${position}
                flex h-11 w-11 p-2.5
                items-center justify-center
                rounded-2xl
                border border-purple-500/25
                bg-purple-950/15
                backdrop-blur-md
                shadow-[0_0_20px_rgba(168,85,247,0.2)]
              `}
            >
              <Icon size={size} className={color} />
            </motion.div>
          )
        )}
      </div>

      {/* Main loader */}
      <div className="relative z-10 flex w-full max-w-md flex-col items-center">
        {/* Animated name */}
        <div className="mb-4 flex items-center justify-center">
          {letters.map((letter, index) => (
            <motion.span
              key={index}
              initial={{
                opacity: 0,
                y: 30,
              }}
              animate={{
                opacity: 1,
                y: [0, -5, 0],
              }}
              transition={{
                opacity: {
                  duration: 0.5,
                  delay: index * 0.1,
                },
                y: {
                  duration: 2,
                  repeat: Infinity,
                  delay: index * 0.1,
                  ease: 'easeInOut',
                },
              }}
              className="
                text-4xl sm:text-5xl
                font-black
                tracking-[-0.07em]
                text-[var(--text-primary)]
              "
            >
              {letter}
            </motion.span>
          ))}

          <motion.span
            animate={{
              opacity: [0.3, 1, 0.3],
            }}
            transition={{
              duration: 1.5,
              repeat: Infinity,
            }}
            className="
              text-4xl sm:text-5xl
              font-black
              text-purple-600 dark:text-purple-400
            "
          >
            .
          </motion.span>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="
            mb-12
            font-mono text-[10px]
            tracking-[0.45em]
            text-[var(--text-muted)]
          "
        >
          DEVELOPER PORTFOLIO
        </motion.p>

        {/* Circular scanner */}
        <div
          className="
            relative mb-12
            flex h-28 w-28
            items-center justify-center
          "
        >
          {/* Outer rotating ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{
              duration: 5,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="
              absolute inset-0
              rounded-full
              border border-dashed
              border-purple-500/50
            "
          />

          {/* Inner rotating ring */}
          <motion.div
            animate={{ rotate: -360 }}
            transition={{
              duration: 8,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="
              absolute inset-3
              rounded-full
              border-2 border-transparent
              border-t-purple-600 dark:border-t-purple-400
              border-r-purple-500/30
            "
          />

          {/* Scanner center */}
          <div
            className="
              flex h-16 w-16
              items-center justify-center
              rounded-full
              border border-purple-500/40
              bg-purple-500/10
              shadow-[0_0_30px_rgba(168,85,247,0.25)]
            "
          >
            <motion.span
              animate={{
                opacity: [0.4, 1, 0.4],
                scale: [0.85, 1.1, 0.85],
              }}
              transition={{
                duration: 1.8,
                repeat: Infinity,
              }}
              className="
                h-4 w-4
                rounded-full
                bg-purple-600 dark:bg-purple-400
                shadow-[0_0_20px_rgba(168,85,247,0.8)]
              "
            />
          </div>
        </div>

        {/* Loading message */}
        <motion.p
          animate={{
            opacity: [0.5, 1, 0.5],
          }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
          }}
          className="
            mb-5
            font-mono text-xs
            tracking-[0.25em]
            text-purple-600 dark:text-purple-400 font-bold
          "
        >
          INITIALIZING PORTFOLIO...
        </motion.p>

        {/* Indeterminate loading bar */}
        <div
          className="
            relative h-[4px] w-full
            overflow-hidden
            rounded-full
            bg-purple-900/20 dark:bg-purple-950/40
            border border-[var(--border-subtle)]
          "
        >
          <motion.div
            animate={{
              x: ['-100%', '350%'],
            }}
            transition={{
              duration: 1.8,
              repeat: Infinity,
              ease: 'easeInOut',
            }}
            className="
              absolute h-full w-1/3
              rounded-full
              bg-gradient-to-r from-purple-600 to-fuchsia-400
              shadow-[0_0_15px_rgba(168,85,247,0.8)]
            "
          />
        </div>

        {/* Bottom status */}
        <div
          className="
            mt-12 flex items-center gap-2
            font-mono text-[9px]
            tracking-[0.2em]
            text-[var(--text-subtle)]
          "
        >
          <span
            className="
              h-1.5 w-1.5
              rounded-full
              bg-purple-600 dark:bg-purple-400
              animate-pulse
            "
          />
          CONNECTING TO PORTFOLIO DATA
        </div>
      </div>

      {/* Bottom decorative line */}
      <div
        className="
          absolute bottom-0 left-0
          h-px w-full
          bg-gradient-to-r
          from-transparent
          via-purple-500/50
          to-transparent
        "
      />
    </div>
  );
}

export function LoadingSpinner() {
  return (
    <div className="flex items-center justify-center py-12">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-2 border-purple-500/20" />

        <div className="absolute inset-0 animate-spin rounded-full border-2 border-transparent border-t-purple-600 dark:border-t-purple-400" />

        <div className="absolute inset-2 rounded-full bg-purple-500/10" />
      </div>
    </div>
  );
}