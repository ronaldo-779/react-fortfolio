import { motion } from 'framer-motion';

export function PageLoader() {
  const letters = 'RONALDO'.split('');

  return (
    <div className="
      fixed inset-0 z-[9999]
      flex min-h-screen
      items-center justify-center
      overflow-hidden
      bg-[var(--bg-primary)]
      px-6
    ">

      {/* Background glow */}
      <div className="
        pointer-events-none absolute
        left-1/2 top-1/2
        h-[450px] w-[450px]
        -translate-x-1/2 -translate-y-1/2
        rounded-full
        bg-purple-600/[0.12] dark:bg-purple-600/[0.08]
        blur-[130px]
      " />

      {/* Background grid */}
      <div
        className="pointer-events-none absolute inset-0 opacity-[0.08]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(168,85,247,0.2) 1px, transparent 1px), linear-gradient(90deg, rgba(168,85,247,0.2) 1px, transparent 1px)',
          backgroundSize: '55px 55px',
        }}
      />

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
        <div className="
          relative mb-12
          flex h-28 w-28
          items-center justify-center
        ">
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
          <div className="
            flex h-16 w-16
            items-center justify-center
            rounded-full
            border border-purple-500/40
            bg-purple-500/10
            shadow-[0_0_30px_rgba(168,85,247,0.25)]
          ">
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
        <div className="
          relative h-[4px] w-full
          overflow-hidden
          rounded-full
          bg-purple-900/20 dark:bg-purple-950/40
          border border-[var(--border-subtle)]
        ">
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
        <div className="
          mt-12 flex items-center gap-2
          font-mono text-[9px]
          tracking-[0.2em]
          text-[var(--text-subtle)]
        ">
          <span className="
            h-1.5 w-1.5
            rounded-full
            bg-purple-600 dark:bg-purple-400
            animate-pulse
          " />

          CONNECTING TO PORTFOLIO DATA
        </div>

      </div>

      {/* Bottom decorative line */}
      <div className="
        absolute bottom-0 left-0
        h-px w-full
        bg-gradient-to-r
        from-transparent
        via-purple-500/50
        to-transparent
      " />

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
