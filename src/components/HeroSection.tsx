import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Mail, Linkedin, Github, FileText, MessageCircle } from "lucide-react";
import { Button } from "@/components/ui/button";

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

const HeroSection = () => {
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0);
  const [displayedRole, setDisplayedRole] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[currentRoleIndex];
    
    const typeSpeed = isDeleting ? 30 : 60;
    
    if (!isDeleting && displayedRole === currentRole) {
      // Wait before starting to delete
      const timeout = setTimeout(() => setIsDeleting(true), 2000);
      return () => clearTimeout(timeout);
    }
    
    if (isDeleting && displayedRole === "") {
      // Move to next role
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

  const scrollToContact = () => {
    const element = document.querySelector("#contact");
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section id="hero" className="min-h-screen flex items-center justify-center relative pt-20">
      <div className="container mx-auto px-6 py-20">
        <div className="max-w-4xl mx-auto text-center">
          {/* Greeting with gold color - from elite portfolio */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg md:text-xl text-gold mb-4 font-mono"
          >
            {">"} Hello, World! I'm
          </motion.p>

          {/* Name with gold gradient animation - from elite portfolio */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-5xl sm:text-5xl md:text-7xl font-serif font-bold mb-6 bg-gradient-to-r from-gold via-white to-gold bg-clip-text text-transparent"
          >
            VEENA SREE MAHARANA
          </motion.h1>

          {/* Dynamic Role with gold color - from elite portfolio */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6 }}
            className="h-10 mb-8"
          >
            <span className="text-xl md:text-2xl text-gold">
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
            className="flex justify-center gap-6"
          >
            {[
              { icon: Mail, href: "mailto:veenasreemaharana@gmail.com", label: "Email" },
              { icon: Linkedin, href: "https://linkedin.com/in/veenasreemaharana", label: "LinkedIn" },
              { icon: Github, href: "https://github.com/vsm-0", label: "GitHub" },
            ].map((social) => (
              <motion.a
                key={social.label}
                href={social.href}
                target={social.href.startsWith("mailto") ? undefined : "_blank"}
                rel="noopener noreferrer"
                whileHover={{ scale: 1.2, y: -5 }}
                whileTap={{ scale: 0.9 }}
                className="p-3 rounded-full glass-card border border-silver/20 text-muted-foreground hover:text-primary hover:border-primary/50 transition-colors"
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
          className="absolute bottom-10 left-1/2 -translate-x-1/2"
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
