import { useEffect, useState } from "react";
import { motion, useScroll, useSpring } from "framer-motion";

const ScrollProgressBar = () => {
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <motion.div
      className="fixed top-0 left-0 right-0 h-1 z-50 origin-left"
      style={{
        scaleX,
        background: "linear-gradient(90deg, hsl(43, 66%, 52%, 0.4) 0%, hsl(30, 100%, 50%, 0.4) 50%, hsl(43, 66%, 52%, 0.4) 100%)",
        boxShadow: "0 0 10px hsl(43, 66%, 52%, 0.3)",
      }}
    />
  );
};

export default ScrollProgressBar;
