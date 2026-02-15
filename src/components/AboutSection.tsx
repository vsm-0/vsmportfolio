import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const AboutSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-20 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto"
        >
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-serif font-bold text-center mb-12"
          >
            <span className="gold-shimmer">About Me</span>
          </motion.h2>

          {/* Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4 }}
            className="glass-card p-8 md:p-12 relative overflow-hidden"
          >
            {/* Decorative elements */}
            <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
              <div className="w-full h-full border-t-2 border-r-2 border-primary rounded-tr-3xl" />
            </div>
            <div className="absolute bottom-0 left-0 w-32 h-32 opacity-10">
              <div className="w-full h-full border-b-2 border-l-2 border-primary rounded-bl-3xl" />
            </div>

            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground">
              I'm{" "}
              <span className="text-primary font-semibold">VSM alias Veena Sree Maharana</span>, I describe myself as a{" "}
              <span className="text-foreground font-medium">Versatile Person</span>. I can say that, I'm a{" "}
              <span className="text-primary">Multidisciplinary AI & Data Science undergraduate</span> with a rare blend of solution engineering, data analytics, and product-driven thinking, backed by hands-on experience across Computer Science, Python development, analytics, full-stack interfaces, and stakeholder collaboration.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mt-6">
              Proven track record of translating ambiguous business and user requirements into{" "}
              <span className="text-foreground">scalable, data-backed technical solutions</span>, including automation pipelines that{" "}
              <span className="text-primary font-semibold">reduced manual effort by 60%</span>, AI-powered search systems, and analytics-driven engagement strategies. Equally comfortable operating at the intersection of technology, business, and communications.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mt-6">
              Driven by a strong interest in{" "}
              <span className="text-primary">front-end engineering and user experience</span>, I enjoy translating complex ideas into clean, intuitive interfaces and meaningful digital products. With hands-on experience in{" "}
              <span className="text-foreground">HTML, CSS, JS, React,</span>{" "}
              <span className="text-foreground">TypeScript, Tailwind CSS, Vite</span>, Front end Development and full-stack project collaboration, complemented by internships in Python development and marketing analytics, I bring a balanced mix of{" "}
              <span className="text-primary">technical depth</span>,{" "}
              <span className="text-primary">data-driven thinking</span>, and{" "}
              <span className="text-primary">creative execution</span>.
            </p>

            <p className="text-lg md:text-xl leading-relaxed text-muted-foreground mt-6">
              I thrive in collaborative environments and am motivated by building products and solutions that create{" "}
              <span className="text-foreground font-medium">measurable, real-world impact</span>.
            </p>

            {/* Floating decoration */}
            <motion.div
              animate={{
                y: [0, -10, 0],
                rotate: [0, 5, 0],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 top-1/2 w-24 h-24 opacity-20"
            >
              <div className="w-full h-full rounded-full border-2 border-primary" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default AboutSection;
