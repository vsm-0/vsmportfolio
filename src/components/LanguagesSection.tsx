import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Languages } from "lucide-react";

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
          {/* Section Title */}
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
                <span className="text-foreground font-medium">{lang.name}</span>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default LanguagesSection;
