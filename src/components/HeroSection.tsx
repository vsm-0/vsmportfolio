// ============================================================
// HeroSection.tsx
// ─────────────────────────────────────────────────────────────
// VIDEO PLAYBACK LOGIC:
//
//  Phase 1 — Autoplay (0 s → 4 s):
//    • Fires once on mount (after splash completes).
//    • Video plays muted, no controls, object-fit: cover.
//    • timeupdate listener pauses exactly at 4.0 s,
//      then hands off to scroll phase.
//    • Falls back gracefully if autoplay is blocked.
//
//  Phase 2 — Scroll-triggered, SCREEN LOCKED (4 s → 8 s):
//    • On the FIRST scroll event, page scroll is LOCKED
//      (overflow: hidden on body) so the screen stays static.
//    • The remaining 4 s plays at normal speed, stops at 8.0 s.
//    • Once video ends, body scroll is UNLOCKED.
//    • scrollPhaseActiveRef is locked to false immediately so
//      no further scroll events affect the video.
//
//  Phase 3 — Second scroll → smooth scroll to #about
//    • After video finishes, next scroll event smoothly
//      scrolls to the #about section.
// ============================================================

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

// ─── Role cycling data ────────────────────────────────────────
const roles = [
  "AI & Data Science Student",
  "Front-End Developer",
  "UI/UX Enthusiast",
  "Creative Problem Solver",
  "Tech Enthusiast",
  "AI Developer",
  "Data Scientist",
  "Machine Learning Engineer",
  "Deep Learning Explorer",
  "Business and Data Analyst",
  "Product Maven",
  "Creative Designer",
];

// ─── Video timing constants ───────────────────────────────────
const VIDEO_AUTOPLAY_END = 4.0;  // Phase 1 stops here
const VIDEO_SCROLL_START = 4.0;  // Phase 2 resumes from here
const VIDEO_SCROLL_END   = 8.0;  // Phase 2 stops here

const HeroSection = () => {
  // ─── Typewriter state ─────────────────────────────────────
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole]       = useState("");
  const [isDeleting, setIsDeleting]             = useState(false);

  // ─── Refs for video control ───────────────────────────────
  const videoRef             = useRef<HTMLVideoElement>(null);
  const heroSectionRef       = useRef<HTMLDivElement>(null);
  const rafIdRef             = useRef<number | null>(null);

  // Phase flags
  const scrollPhaseActiveRef = useRef(false);  // true = waiting for first scroll to play 4→8s
  const videoCompleteRef     = useRef(false);  // true = video finished, next scroll goes to about
  const scrollLockedRef      = useRef(false);  // true = currently locked during video playback

  // ─── Typewriter effect ────────────────────────────────────
  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    const typeSpeed   = isDeleting ? 30 : 60;

    if (!isDeleting && displayedRole === currentRole) {
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }

    if (isDeleting && displayedRole === "") {
      setIsDeleting(false);
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length);
      return;
    }

    const timeout = setTimeout(() => {
      if (isDeleting) {
        setDisplayedRole(currentRole.slice(0, displayedRole.length - 1));
      } else {
        setDisplayedRole(currentRole.slice(0, displayedRole.length + 1));
      }
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, currentRoleIndex]);

  // ─── Scroll-to-contact helper ─────────────────────────────
  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  // ─── Lock/unlock body scroll ──────────────────────────────
  const lockScroll = () => {
    // Save current scroll position and freeze it
    const scrollY = window.scrollY;
    document.body.style.position   = "fixed";
    document.body.style.top        = `-${scrollY}px`;
    document.body.style.left       = "0";
    document.body.style.right      = "0";
    document.body.style.overflow   = "hidden";
    scrollLockedRef.current = true;
  };

  const unlockScroll = () => {
    const scrollY = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top      = "";
    document.body.style.left     = "";
    document.body.style.right    = "";
    document.body.style.overflow = "";
    // Restore the scroll position so page doesn't jump
    window.scrollTo(0, parseInt(scrollY || "0") * -1);
    scrollLockedRef.current = false;
  };

  // ─── Phase 1: autoplay 0 s → 4 s ─────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;

    const handleTimeUpdate = () => {
      if (video.currentTime >= VIDEO_AUTOPLAY_END) {
        video.pause();
        video.currentTime            = VIDEO_AUTOPLAY_END;
        scrollPhaseActiveRef.current = true;   // unlock scroll phase
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked — skip straight to scroll phase
        video.currentTime            = VIDEO_AUTOPLAY_END;
        scrollPhaseActiveRef.current = true;
        video.removeEventListener("timeupdate", handleTimeUpdate);
      });
    }

    return () => {
      video.removeEventListener("timeupdate", handleTimeUpdate);
      video.pause();
    };
  }, []);

  // ─── Phase 2 & 3: scroll handling ────────────────────────
  useEffect(() => {
    const handleScroll = () => {
      // ── Phase 3: video already done, scroll to about ──────
      if (videoCompleteRef.current) {
        videoCompleteRef.current = false; // prevent repeated triggers
        const aboutSection = document.querySelector("#about");
        if (aboutSection) {
          aboutSection.scrollIntoView({ behavior: "smooth" });
        }
        return;
      }

      // ── Phase 2: first scroll → lock screen & play 4→8s ──
      if (!scrollPhaseActiveRef.current) return;

      // Lock immediately — only fires once
      scrollPhaseActiveRef.current = false;

      const video = videoRef.current;
      if (!video) return;

      // Lock the page scroll so screen stays static
      lockScroll();

      // Ensure we start from exactly 4.0 s
      video.currentTime = VIDEO_SCROLL_START;

      // Play the remaining 4 s (4 → 8) at normal speed
      video.play().catch(() => {});

      // Stop precisely at 8.0 s, then unlock scroll
      const stopAtEnd = () => {
        if (video.currentTime >= VIDEO_SCROLL_END) {
          video.pause();
          video.currentTime = VIDEO_SCROLL_END;
          video.removeEventListener("timeupdate", stopAtEnd);

          // Unlock the page and mark video as complete
          unlockScroll();
          videoCompleteRef.current = true;
        }
      };
      video.addEventListener("timeupdate", stopAtEnd);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // ─── Cancel rAF on unmount ────────────────────────────────
  useEffect(() => {
  const animate = () => {
    // animation logic
    rafIdRef.current = requestAnimationFrame(animate);
  };

  const id = requestAnimationFrame(animate);
  rafIdRef.current = id;

  return () => {
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
    }
  };
}, []);

  // ─────────────────────────────────────────────────────────
  return (
    <section
      id="hero"
      ref={heroSectionRef}
      className="min-h-screen flex items-center justify-center relative pt-20"
    >
      {/* ══ Video background ══ */}
      <video
        ref={videoRef}
        src="/flower.mp4"
        muted
        playsInline
        preload="metadata"
        aria-hidden="true"
        style={{
          position:      "absolute",
          inset:         0,
          width:         "100%",
          height:        "100%",
          objectFit:     "cover",
          zIndex:        0,
          pointerEvents: "none",
          display:       "block",
          opacity:       0.65,
        }}
      />

      {/* ══ Dark overlay ══ */}
      <div
        aria-hidden="true"
        style={{
          position:      "absolute",
          inset:         0,
          background:    "rgba(0, 0, 0, 0.45)",
          zIndex:        1,
          pointerEvents: "none",
        }}
      />

      {/* ══ Content ══ */}
      <div
        className="container mx-auto px-6 py-20"
        style={{ position: "relative", zIndex: 2 }}
      >
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gold mb-4 font-mono drop-shadow-[0_8px_20px_rgba(0,0,0,0.95)]"
          >
            {">"} Hello, World! I'm
          </motion.p>

          {/* Name */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl sm:text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-gold via-white to-gold bg-clip-text text-transparent drop-shadow-[0_0_20px_rgba(212,175,55,0.6)]"

          >
            VEENA SREE MAHARANA
          </motion.h1>

          {/* Dynamic Role — BOLD */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="h-10 mb-8"
          >
            <span className="text-xl md:text-2xl text-gold font-bold 
                 drop-shadow-[0_8px_25px_rgba(0,0,0,1)] 
                 px-1 py-1 inline-block">
  {displayedRole}
  <span className="animate-pulse">|</span>
</span>
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          >
            <Button
              onClick={scrollToContact}
              className="btn-glow bg-primary hover:bg-primary/90 text-primary-foreground px-8 py-6 text-lg font-medium"
            >
              <MessageCircle className="mr-2" size={20} />
              Contact Me
            </Button>
            <Button
              asChild
              variant="outline"
              className="border-gold/50 hover:border-gold hover:shadow-[0_0_20px_#D4AF37] transition-all duration-300 px-8 py-6 text-lg"
            >
              <a
                href="https://drive.google.com/file/d/1Vu7dzszvRYpoKO4G7inNCS2CDKtZ4rz0/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
              >
                <FileText className="mr-2" size={20} />
                View Resume
              </a>
            </Button>
          </motion.div>

          {/* Social Links */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1 }}
            className="flex justify-center gap-4"
          >
            {[
              { icon: Mail,     href: "mailto:veenasreemaharana@gmail.com",        label: "Email"    },
              { icon: Linkedin, href: "https://linkedin.com/in/veenasreemaharana", label: "LinkedIn" },
              { icon: Github,   href: "https://github.com/vsm-0",                  label: "GitHub"   },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="px-4 py-4 rounded-full glass-card border border-silver/20 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
                aria-label={social.label}
              >
                <social.icon size={24} />
              </motion.a>
            ))}
          </motion.div>
        </div>

        {/* Scroll indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 rounded-full border-2 border-primary/50 flex justify-center pt-2"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-1.5 h-1.5 rounded-full bg-primary"
            />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default HeroSection;
