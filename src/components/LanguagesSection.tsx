import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import {
  Languages,
  Mic,
  HeartHandshake,
  Palette,
  Globe,
  Brain,
  Podcast,
  Lotus,
} from "lucide-react";

/* -------------------- HOBBIES DATA -------------------- */
const hobbiesData = [
  { name: "Singing", icon: Mic },
  { name: "Volunteering", icon: HeartHandshake },
  { name: "Designing Digital Arts", icon: Palette },
  { name: "Internet Surfing", icon: Globe },
  { name: "Exploring AI Tools", icon: Brain },
  { name: "Podcasting", icon: Podcast },
  { name: "Meditation", icon: Lotus },
];

/* -------------------- LANGUAGES DATA -------------------- */
const languagesData = [
  { name: "English" },
  { name: "Telugu" },
  { name: "Hindi" },
  { name: "Odia" },
];

const LanguagesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="py-16 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="max-w-3xl mx-auto"
        >
          {/* ================= HOBBIES & INTERESTS ================= */}
          <div className="mb-16">
            {/* Hobbies Title */}
            <div className="flex items-center justify-center gap-3 mb-8">
              <span className="text-gold text-xl">✦</span>
              <h2 className="text-2xl md:text-3xl font-serif font-bold gold-shimmer">
                Hobbies & Interests
              </h2>
            </div>

            {/* Hobbies Pills */}
            <div className="flex flex-wrap justify-center gap-4">
              {hobbiesData.map((hobby, index) => {
                const Icon = hobby.icon;
                return (
                  <motion.div
                    key={hobby.name}
                    initial={{ opacity: 0, scale: 0.85 }}
                    animate={isInView ? { opacity: 1, scale: 1 } : {}}
                    transition={{ delay: index * 0.08, duration: 0.3 }}
                    whileHover={{ scale: 1.06 }}
                    className="glass-card px-5 py-2.5 flex items-center gap-3 border border-primary/20 hover:border-primary/50 transition-colors"
                  >
                    <Icon
                      size={18}
                      className="text-gold shrink-0"
                    />
                    <span className="text-foreground font-medium text-sm md:text-base">
                      {hobby.name}
                    </span>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ================= LANGUAGES ================= */}
          <div className="flex items-center justify-center gap-3 mb-8">
            <Languages className="text-primary" size={28} />
            <h2 className="text-2xl md:text-3xl font-serif font-bold gold-shimmer">
              Languages
            </h2>
          </div>

          {/* Languages Pills */}
          <div className="flex flex-wrap justify-center gap-4">
            {languagesData.map((lang, index) => (
              <motion.div
                key={lang.name}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ delay: index * 0.1, duration: 0.3 }}
                whileHover={{ scale: 1.05 }}
                className="glass-card px-6 py-3 flex items-center gap-3 border border-primary/20 hover:border-primary/50 transition-colors"
              >
                <span className="text-foreground font-medium">
                  {lang.name}
                </span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LanguagesSection;
