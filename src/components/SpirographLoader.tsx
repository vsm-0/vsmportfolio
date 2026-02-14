import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface SpirographLoaderProps {
  onComplete: () => void;
}

const bootMessages = [
  { text: "> Polishing My Digital Crown...", delay: 0 },
  { text: "> Assembling the Tech Content...", delay: 1200 },      // Increase these
  { text: "> Deciphering the Code of Brilliance...", delay: 2400 }, // values
  { text: "> Forging My Developer Sword...", delay: 3600 },
  { text: "> Weaving the Fabric of Tech Excellence...", delay: 4800 },
  { text: "> Hey ya! Let's zoom in...", delay: 5000, isSuccess: true },
];

const SpirographLoader = ({ onComplete }: SpirographLoaderProps) => {
  const [visibleLines, setVisibleLines] = useState<number[]>([]);

  useEffect(() => {
    // Show lines one by one with fade-in animation
    bootMessages.forEach((msg, index) => {
      setTimeout(() => {
        setVisibleLines(prev => [...prev, index]);
      }, msg.delay);
    });

    // Complete after all lines are shown plus extra time (increased duration)
    const totalTime = bootMessages[bootMessages.length - 1].delay + 5000;
    setTimeout(() => {
      onComplete();
    }, totalTime);
  }, [onComplete]);

  // Generate flower petal points
  const petalCount = 28; // Number of petals
  const petals = Array.from({ length: petalCount }, (_, i) => i);

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

        {/* Container with flower on top center and text below center */}
        <div className="flex flex-col items-center justify-center gap-4 md:gap-6 w-full max-w-5xl px-6">
          {/* Flower Petal Animation - Top Center */}
          <motion.div
            initial={{ scale: 0, opacity: 0, y: -30 }}
            animate={{ 
              scale: 1, 
              opacity: 1,
              y: 0,
            }}
            transition={{ 
              scale: { duration: 0.8, ease: "easeOut" },
              opacity: { duration: 0.8 },
              y: { duration: 0.8, ease: "easeOut" },
            }}
            className="relative flex-shrink-0"
          >
            {/* SVG Flower Petals */}
            <svg 
              width="300" 
              height="300" 
              viewBox="0 0 300 300"
              className="relative z-10"
            >
              {/* Define Gold Gradient */}
              <defs>
                <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#BF953F', stopOpacity: 0.9 }} />
                  <stop offset="25%" style={{ stopColor: '#FCF6BA', stopOpacity: 0.9 }} />
                  <stop offset="50%" style={{ stopColor: '#B38728', stopOpacity: 0.9 }} />
                  <stop offset="75%" style={{ stopColor: '#AA771C', stopOpacity: 0.9 }} />
                  <stop offset="100%" style={{ stopColor: '#BF953F', stopOpacity: 0.9 }} />
                </linearGradient>

                {/* Define Silver Gradient */}
                <linearGradient id="silverGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" style={{ stopColor: '#C0C0C0', stopOpacity: 0.9 }} />
                  <stop offset="50%" style={{ stopColor: '#E8E8E8', stopOpacity: 0.9 }} />
                  <stop offset="100%" style={{ stopColor: '#808080', stopOpacity: 0.9 }} />
                </linearGradient>

                {/* Glow filters */}
                <filter id="glow">
                  <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>

              {/* Flower Petals - Alternating Gold and Silver */}
              {petals.map((i) => {
                const angle = (i / petalCount) * Math.PI * 2;
                const isGold = i % 2 === 0;
                
                // Petal path - elegant teardrop shape
                const petalPath = `
                  M 150 150
                  Q ${150 + Math.cos(angle - 0.3) * 40} ${150 + Math.sin(angle - 0.3) * 40}
                    ${150 + Math.cos(angle) * 90} ${150 + Math.sin(angle) * 90}
                  Q ${150 + Math.cos(angle + 0.3) * 40} ${150 + Math.sin(angle + 0.3) * 40}
                    150 150
                  Z
                `;
                
                return (
                  <motion.path
                    key={i}
                    d={petalPath}
                    fill={isGold ? "url(#goldGradient)" : "url(#silverGradient)"}
                    filter="url(#glow)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1.1, 1],
                      opacity: [0, 1, 0.9],
                      rotate: [0, 5, 0],
                    }}
                    transition={{
                      duration: 1.2,
                      delay: i * 0.1,
                      repeat: Infinity,
                      repeatType: "reverse",
                      repeatDelay: 1,
                    }}
                    style={{ transformOrigin: "150px 150px" }}
                  />
                );
              })}

              {/* Center circle - Gold */}
              <motion.circle
                cx="150"
                cy="150"
                r="25"
                fill="url(#goldGradient)"
                filter="url(#glow)"
                initial={{ scale: 0, opacity: 0 }}
                animate={{ 
                  scale: [0, 1.2, 1],
                  opacity: [0, 1, 0.95],
                }}
                transition={{
                  duration: 6,
                  delay: 0.5,
                  repeat: Infinity,
                  repeatType: "reverse",
                  repeatDelay: 1.5,
                }}
              />
              {/* Inner sparkle details */}
              {[0, 1, 2, 3, 4, 5, 6, 7, 8].map((i) => {
                const sparkleAngle = (i / 9) * Math.PI * 2;
                return (
                  <motion.circle
                    key={`sparkle-${i}`}
                    cx={150 + Math.cos(sparkleAngle) * 15}
                    cy={150 + Math.sin(sparkleAngle) * 15}
                    r="4"
                    fill="url(#silverGradient)"
                    filter="url(#glow)"
                    initial={{ scale: 0, opacity: 0 }}
                    animate={{ 
                      scale: [0, 1, 0.8],
                      opacity: [0, 1, 0.8],
                    }}
                    transition={{
                      duration: 0.8,
                      delay: 0.8 + i * 0.1,
                      repeat: Infinity,
                      repeatType: "reverse",
                      repeatDelay: 2,
                    }}
                  />
                );
              })}

              {/* Rotating outer glow effect */}
              <motion.g
                animate={{ 
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "linear",
                }}
                style={{ transformOrigin: "150px 150px" }}
              >
              </motion.g>
            </svg>

            {/* Outer glow effect */}
            <motion.div
              className="absolute inset-0 flex items-center justify-center"
              animate={{
                scale: [1, 1.15, 1],
                opacity: [0.4, 0.6, 0.4],
                rotate: [0, 180, 360],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <div 
                className="w-80 h-80 rounded-full"
                style={{ 
                  background: 'radial-gradient(circle, rgba(212,175,55,0.3) 0%, rgba(192,192,192,0.15) 40%, transparent 70%)',
                  filter: 'blur(40px)'
                }}
              />
            </motion.div>
          </motion.div>
  {/* Text Section - Center Container, Left Aligned Text with Animated Silver Box */}
<motion.div
  initial={{ opacity: 0, y: 30 }}
  animate={{ opacity: 1, y: 0 }}
  exit={{ opacity: 0 }}
  transition={{ 
    duration: 0.8, 
    ease: "easeOut",
    delay: 0.2,
  }}
  className="w-full max-w-2xl flex justify-center -mt-12"
>
  <motion.div 
    className="w-full relative p-6 rounded-lg backdrop-blur-sm bg-background/10"
    style={{
      boxShadow: '0 0 20px rgba(192, 192, 192, 0.3)',
    }}
    animate={{
      boxShadow: [
        '0 0 20px rgba(192, 192, 192, 0.3), inset 0 0 20px rgba(192, 192, 192, 0.1)',
        '0 0 30px rgba(232, 232, 232, 0.5), inset 0 0 30px rgba(232, 232, 232, 0.2)',
        '0 0 20px rgba(192, 192, 192, 0.3), inset 0 0 20px rgba(192, 192, 192, 0.1)',
      ],
    }}
    transition={{
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    }}
  >
    {/* Animated border */}
    <motion.div
      className="absolute inset-0 rounded-lg"
      style={{
        background: 'linear-gradient(90deg, #C0C0C0, #E8E8E8, #C0C0C0, #808080)',
        padding: '2px',
        WebkitMask: 'linear-gradient(#fff 0 0) content-box, linear-gradient(#fff 0 0)',
        WebkitMaskComposite: 'xor',
        maskComposite: 'exclude',
      }}
      animate={{
        background: [
          'linear-gradient(90deg, #C0C0C0, #E8E8E8, #C0C0C0, #808080)',
          'linear-gradient(180deg, #C0C0C0, #E8E8E8, #C0C0C0, #808080)',
          'linear-gradient(270deg, #C0C0C0, #E8E8E8, #C0C0C0, #808080)',
          'linear-gradient(360deg, #C0C0C0, #E8E8E8, #C0C0C0, #808080)',
        ],
      }}
      transition={{
        duration: 4,
        repeat: Infinity,
        ease: "linear",
      }}
    />
    
    {/* Terminal text area - text left aligned */}
    <div className="text-left space-y-2 relative z-10">
                {bootMessages.map((msg, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: visibleLines.includes(index) ? 1 : 0, y: visibleLines.includes(index) ? 0 : 10 }}
                    transition={{ duration: 0.4 }}
                    className={`text-sm md:text-base ${msg.isSuccess ? "text-gold font-bold" : "text-foreground"}`}
                    style={{ fontFamily: 'Poppins, monospace' }}
                  >
                    {visibleLines.includes(index) && msg.text}
                  </motion.div>
                ))}
              </div>

              {/* Bottom status bar - center aligned */}
              <div className="flex justify-center text-gold text-sm md:text-base mt-8" style={{ fontFamily: 'Poppins, sans-serif' }}>
                <motion.span 
                  animate={{ opacity: [1, 0.5, 1] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                  className="font-mono"
                >
                  {visibleLines.includes(bootMessages.length - 1) ? "READY ✓" : "LOADING..."}
                </motion.span>
              </div>

              {/* Loading bar - center aligned with gold gradient */}
              <div className="mt-6 flex justify-center">
                <div className="h-1.5 w-full md:w-2/3 bg-secondary/30 rounded-full overflow-hidden">
                  <motion.div
                    className="h-full rounded-full"
                    style={{
                      background: "linear-gradient(90deg, #BF953F 0%, #FCF6BA 25%, #B38728 50%, #AA771C 75%, #BF953F 100%)",
                    }}
                    initial={{ width: "0%" }}
                    animate={{ width: `${(visibleLines.length / bootMessages.length) * 100}%` }}
                    transition={{ duration: 0.3 }}
                  />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};

export default SpirographLoader;
