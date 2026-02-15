// ============================================================
// HeroSection.tsx
// ─────────────────────────────────────────────────────────────
// VIDEO PLAYBACK LOGIC:
//  Phase 1 — Autoplay (0 s → 4 s):
//    • Fires once on mount (after splash completes).
//    • Video plays muted, no controls, object-fit: cover.
//    • timeupdate listener pauses exactly at 4.0 s,
//      then hands off to scroll phase.
//    • Falls back gracefully if autoplay is blocked.
//
//  Phase 2 — Scroll-triggered, SCREEN LOCKED (4 s → 8 s):
//    • On the FIRST downward scroll, page scroll is LOCKED
//      (overflow: hidden on body) so the screen stays static.
//    • The remaining 4 s plays at normal speed, stops at 8.0 s.
//    • Once video ends, body scroll is UNLOCKED.
//    • scrollPhaseActiveRef is disarmed immediately so
//      no further scroll events affect the video.
//
//  Phase 3 — Next downward scroll → smooth scroll to #about
//    • After video finishes, next downward scroll event
//      smoothly scrolls to the #about section.
//
//  Phase 4 — Scroll back UP to hero → cinematic rewind 8 s → 4 s
//    • Detected by comparing currentScrollY vs lastScrollYRef.
//    • Fires when: scrolling upward AND hero is in viewport
//      AND videoCompleteRef is true AND rewind not in progress.
//    • Re-arms Phase 2 after rewind completes.
// ============================================================

import { useState, useEffect, useRef, useCallback } from "react";
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
  const videoRef       = useRef<HTMLVideoElement>(null);
  const heroSectionRef = useRef<HTMLDivElement>(null);
  const rafIdRef       = useRef<number | null>(null);

  // Phase flags
  const scrollPhaseActiveRef = useRef(false); // true  = waiting for first downward scroll to play 4→8s
  const videoCompleteRef     = useRef(false); // true  = video sitting at 8s, Phase 3/4 armed
  const scrollLockedRef      = useRef(false); // true  = body scroll currently locked
  const reversePlayingRef    = useRef(false); // true  = rewind rAF in progress

  // Scroll direction tracking
  const lastScrollYRef = useRef(0);

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
      setDisplayedRole(
        isDeleting
          ? currentRole.slice(0, displayedRole.length - 1)
          : currentRole.slice(0, displayedRole.length + 1)
      );
    }, typeSpeed);

    return () => clearTimeout(timeout);
  }, [displayedRole, isDeleting, currentRoleIndex]);

  // ─── Scroll-to-contact helper ─────────────────────────────
  const scrollToContact = () => {
    document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
  };

  // ─── Lock / unlock body scroll ────────────────────────────
  const lockScroll = useCallback(() => {
    if (scrollLockedRef.current) return;
    const scrollY = window.scrollY;
    document.body.style.position = "fixed";
    document.body.style.top      = `-${scrollY}px`;
    document.body.style.left     = "0";
    document.body.style.right    = "0";
    document.body.style.overflow = "hidden";
    scrollLockedRef.current = true;
  }, []);

  const unlockScroll = useCallback(() => {
    if (!scrollLockedRef.current) return;
    const savedTop = document.body.style.top;
    document.body.style.position = "";
    document.body.style.top      = "";
    document.body.style.left     = "";
    document.body.style.right    = "";
    document.body.style.overflow = "";
    window.scrollTo(0, parseInt(savedTop || "0") * -1);
    scrollLockedRef.current = false;
  }, []);

  // ─── Phase 4: Cinematic rewind 8 s → 4 s ─────────────────
  const rewindVideoToFour = useCallback(() => {
    const video = videoRef.current;
    if (!video) return;

    // Cancel any existing rAF before starting a new one
    if (rafIdRef.current !== null) {
      cancelAnimationFrame(rafIdRef.current);
      rafIdRef.current = null;
    }

    reversePlayingRef.current = true;
    videoCompleteRef.current  = false; // disarm Phase 3 while rewinding
    lockScroll();

    const startTime      = VIDEO_SCROLL_END;   // 8.0
    const endTime        = VIDEO_SCROLL_START; // 4.0
    const duration       = 1200;               // ms — cinematic smooth
    const startTimestamp = performance.now();

    const animateRewind = (now: number) => {
      const elapsed  = now - startTimestamp;
      const progress = Math.min(elapsed / duration, 1);

      // Ease-in-out (sinusoidal feel)
      const eased =
        progress < 0.5
          ? 2 * progress * progress
          : 1 - Math.pow(-2 * progress + 2, 2) / 2;

      video.currentTime = startTime - (startTime - endTime) * eased;

      if (progress < 1) {
        rafIdRef.current = requestAnimationFrame(animateRewind);
      } else {
        video.currentTime         = endTime;
        reversePlayingRef.current = false;
        rafIdRef.current          = null;
        unlockScroll();

        // Re-arm Phase 2 so the sequence can play again
        scrollPhaseActiveRef.current = true;
        videoCompleteRef.current     = false;
      }
    };

    rafIdRef.current = requestAnimationFrame(animateRewind);
  }, [lockScroll, unlockScroll]);

  // ─── Phase 1: autoplay 0 s → 4 s ─────────────────────────
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    video.currentTime = 0;

    const handleTimeUpdate = () => {
      if (video.currentTime >= VIDEO_AUTOPLAY_END) {
        video.pause();
        video.currentTime            = VIDEO_AUTOPLAY_END;
        scrollPhaseActiveRef.current = true;
        video.removeEventListener("timeupdate", handleTimeUpdate);
      }
    };

    video.addEventListener("timeupdate", handleTimeUpdate);

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise.catch(() => {
        // Autoplay blocked — jump straight to scroll phase
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

  // ─── Phases 2, 3 & 4: unified scroll handler ─────────────
  useEffect(() => {
    // Seed initial position so the first event has a valid baseline
    lastScrollYRef.current = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      const scrollingUp    = currentScrollY < lastScrollYRef.current;
      lastScrollYRef.current = currentScrollY;

      // ── Phase 4: upward scroll, hero visible, video at 8 s ─
      // Must be checked BEFORE Phase 3 so we intercept the
      // upward scroll before it can accidentally fire Phase 3.
      if (scrollingUp && !reversePlayingRef.current && videoCompleteRef.current) {
        const heroRect    = heroSectionRef.current?.getBoundingClientRect();
        const heroVisible = heroRect
          ? heroRect.top < window.innerHeight && heroRect.bottom > 0
          : false;

        if (heroVisible) {
          rewindVideoToFour();
          return;
        }
      }

      // ── Phase 3: downward scroll after video complete ──────
      if (videoCompleteRef.current && !scrollingUp) {
        videoCompleteRef.current = false; // consume to prevent re-trigger
        document.querySelector("#about")?.scrollIntoView({ behavior: "smooth" });
        return;
      }

      // ── Phase 2: first downward scroll → lock & play 4→8 s ─
      if (!scrollPhaseActiveRef.current) return;
      if (scrollingUp) return; // only trigger Phase 2 on downward scroll

      // Disarm immediately — this block must fire exactly once
      scrollPhaseActiveRef.current = false;

      const video = videoRef.current;
      if (!video) return;

      lockScroll();
      video.currentTime = VIDEO_SCROLL_START;
      video.play().catch(() => {});

      const stopAtEnd = () => {
        if (video.currentTime >= VIDEO_SCROLL_END) {
          video.pause();
          video.currentTime = VIDEO_SCROLL_END;
          video.removeEventListener("timeupdate", stopAtEnd);
          unlockScroll();
          videoCompleteRef.current = true; // arm Phase 3 & 4
        }
      };
      video.addEventListener("timeupdate", stopAtEnd);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, [rewindVideoToFour, lockScroll, unlockScroll]);

  // ─── Cancel any in-flight rAF on unmount ─────────────────
  useEffect(() => {
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
            className="text-lg md:text-xl text-gold mb-4 font-mono"
            style={{
              textShadow:
                "0 2px 4px rgba(0, 0, 0, 0.8), " +
                "0 4px 8px rgba(0, 0, 0, 0.9), " +
                "0 8px 16px rgba(0, 0, 0, 0.95), " +
                "0 12px 24px rgba(0, 0, 0, 1)",
            }}
          >
            {">"} Hello, World! I&apos;m
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

          {/* Dynamic Role */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="h-10 mb-8"
          >
            <span
              className="text-xl md:text-2xl text-gold font-bold px-1 py-1 inline-block"
              style={{
                textShadow:
                  "0 2px 4px rgba(0, 0, 0, 0.85), " +
                  "0 4px 8px rgba(0, 0, 0, 0.92), " +
                  "0 8px 16px rgba(0, 0, 0, 0.96), " +
                  "0 12px 24px rgba(0, 0, 0, 1)",
              }}
            >
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
