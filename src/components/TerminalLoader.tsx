import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface TerminalLoaderProps {
  onComplete: () => void;
}

const bootMessages = [
  { text: "> Initializing royal interface...", delay: 0 },
  { text: "> Loading creative assets...", delay: 600 },
  { text: "> Establishing connection...", delay: 1200 },
  { text: "> Authenticating portfolio access...", delay: 1800 },
  { text: "> CONNECTED", delay: 2400, isSuccess: true },
];

const TerminalLoader = ({ onComplete }: TerminalLoaderProps) => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    // Show lines one by one with fade-in animation (from elite portfolio)
    bootMessages.forEach((msg, index) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, index]);
      }, msg.delay);
    });

    // Complete after all lines are shown plus extra time
    const totalTime = bootMessages[bootMessages.length - 1].delay + 800;
    setTimeout(() => {
      onComplete();
    }, totalTime);
  }, [onComplete]);

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 1 }}
        exit={{ opacity: 0, scale: 1.1 }}
        transition={{ exit: { duration: 0.5, ease: "easeIn" } }}
        className="fixed inset-0 z-50 flex items-center justify-center bg-background overflow-hidden"
      >
        {/* Aurora background */}
        <div className="aurora-bg" />

        {/* Container for infinity and terminal */}
        <div className="flex flex-col items-center gap-8">
          {/* Big Bold Shining Golden Infinity Symbol */}
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
            }}
            transition={{ 
              scale: { duration: 0.6, ease: "easeOut" },
              opacity: { duration: 0.6 },
            }}
            className="relative mb-4"
          >
            {/* Main infinity symbol with slow rotation */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ 
                duration: 20, 
                repeat: Infinity, 
                ease: "linear" 
              }}
              className="text-8xl md:text-9xl font-bold text-gold relative z-10"
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              ∞
            </motion.div>
            
            {/* Shining glow effect */}
            <motion.div
              className="absolute inset-0 text-8xl md:text-9xl font-bold text-gold blur-2xl"
              animate={{
                opacity: [0.4, 0.8, 0.4],
                scale: [1, 1.15, 1],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              style={{ fontFamily: 'Playfair Display, serif' }}
            >
              ∞
            </motion.div>

            {/* Rotating shining loop around infinity */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center -top-2 -left-2"
              animate={{ rotate: 360 }}
              transition={{
                duration: 3,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="w-36 h-36 md:w-44 md:h-44 rounded-full border-4 border-transparent border-t-gold/70 border-r-gold/50" 
                   style={{ filter: 'drop-shadow(0 0 10px rgba(212, 175, 55, 0.6))' }} 
              />
            </motion.div>

            {/* Second counter-rotating loop */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center -top-3 -left-3"
              animate={{ rotate: -360 }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "linear",
              }}
            >
              <div className="w-40 h-40 md:w-48 md:h-48 rounded-full border-3 border-transparent border-b-gold/60 border-l-gold/40"
                   style={{ filter: 'drop-shadow(0 0 8px rgba(212, 175, 55, 0.5))' }}
              />
            </motion.div>

            {/* Pulsing ring */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [1, 1.25, 1],
                opacity: [0.3, 0.7, 0.3],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div className="w-44 h-44 md:w-52 md:h-52 rounded-full border-2 border-gold/30"
                   style={{ filter: 'blur(2px)' }}
              />
            </motion.div>
          </motion.div>

          {/* Terminal container - matching elite portfolio style */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0 }}
            animate={{ scale: visibleLines.length === bootMessages.length ? 1.05 : 1, opacity: 1 }}
            exit={{ scale: 1.1, opacity: 0 }}
            transition={{ 
              duration: 0.5, 
              ease: "easeIn",
            }}
            className="glass-card relative w-[90%] max-w-lg p-6 border border-silver/30"
          >
            {/* Animated border glow */}
            <div className="absolute inset-0 rounded-xl overflow-hidden">
              <motion.div
                className="absolute inset-0"
                animate={{
                  boxShadow: [
                    "inset 0 0 30px hsl(0, 0%, 75%, 0.1)",
                    "inset 0 0 60px hsl(43, 66%, 52%, 0.2)",
                    "inset 0 0 30px hsl(0, 0%, 75%, 0.1)",
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>

            {/* Traffic light buttons */}
            <div className="flex items-center gap-2 text-muted-foreground mb-4 relative z-10">
              <span className="w-3 h-3 rounded-full bg-red-500" />
              <span className="w-3 h-3 rounded-full bg-yellow-400" />
              <span className="w-3 h-3 rounded-full bg-green-500" />
              <span className="ml-2 text-sm" style={{ fontFamily: 'Poppins, sans-serif' }}>vsm@portfolio:~</span>
            </div>

            {/* Terminal text area with typewriting effect */}
            <div className="text-sm space-y-1 min-h-[140px] relative z-10" style={{ fontFamily: 'Poppins, monospace' }}>
              {bootMessages.map((msg, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: visibleLines.includes(index) ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className={msg.isSuccess ? "text-gold font-bold" : "text-foreground"}
                >
                  {visibleLines.includes(index) && msg.text}
                </motion.div>
              ))}
            </div>

            {/* Bottom status bar - from elite portfolio */}
            <div className="flex justify-between text-gold text-xs mt-4 relative z-10" style={{ fontFamily: 'Poppins, sans-serif' }}>
              <span>Neural Core v3.0</span>
              <motion.span 
                animate={{ opacity: [1, 0.5, 1] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              >
                {visibleLines.includes(bootMessages.length - 1) ? "CONNECTED" : "LOADING..."}
              </motion.span>
            </div>

            {/* Loading bar */}
            <div className="mt-4 relative z-10">
              <div className="h-1 w-full bg-secondary rounded-full overflow-hidden">
                <motion.div
                  className="h-full bg-gold"
                  initial={{ width: "0%" }}
                  animate={{ width: `${(visibleLines.length / bootMessages.length) * 100}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default TerminalLoader;
