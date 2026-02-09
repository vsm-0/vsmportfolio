import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Briefcase, Code, TrendingUp, Palette } from "lucide-react";

interface Experience {
  title: string;
  company: string;
  period: string;
  achievements: string[];
  icon: typeof Briefcase;
}

const experienceData: Experience[] = [
  {
    title: "Front-End Developer",
    company: "Blakspire Pvt. Ltd.",
    period: "Jan 2025 – Present",
    achievements: [
      "Developing responsive and user-friendly front-end interfaces using React and Tailwind CSS",
      "Collaborating closely with backend teams to integrate APIs smoothly",
      "Improving UI performance, consistency, and usability across platforms",
    ],
    icon: Code,
  },
  {
    title: "Python Developer Intern",
    company: "Symbiosis Technologies",
    period: "Apr 2024 – May 2024",
    achievements: [
      "Built Python-based backend pipelines for data processing and validation",
      "Engineered an Asset Management Tool that reduced manual workload by 60%",
      "Worked across the solution lifecycle: development, testing, deployment, and documentation",
    ],
    icon: Briefcase,
  },
  {
    title: "Online Marketing Intern",
    company: "Young Compete",
    period: "Jul 2024 – Oct 2024",
    achievements: [
      "Analyzed engagement metrics and campaign performance data",
      "Delivered actionable insights through reports and dashboards",
      "Awarded Best Intern for improving engagement outcomes",
    ],
    icon: TrendingUp,
  },
  {
    title: "Assistant Graphic Designer (Freelance)",
    company: "Gita4Youth & Tech Communities",
    period: "Dec 2023 – Present",
    achievements: [
      "Designed digital creatives using Figma, Canva, Adobe tools",
      "Enhanced brand visibility and engagement across social platforms",
    ],
    icon: Palette,
  },
];

const ExperienceCard = ({ experience, index, isInView }: { experience: Experience; index: number; isInView: boolean }) => {
  const Icon = experience.icon;

  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
      animate={isInView ? { opacity: 1, x: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent md:left-1/2 md:-translate-x-1/2" />

      <div className={`flex gap-6 ${index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"}`}>
        {/* Timeline node */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : {}}
          transition={{ delay: index * 0.15 + 0.2, type: "spring" }}
          className="relative z-10 flex-shrink-0"
        >
          <div className="w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center pulse-glow">
            <Icon className="text-primary" size={20} />
          </div>
        </motion.div>

        {/* Content card */}
        <div className={`flex-1 pb-8 ${index % 2 === 0 ? "md:pr-12" : "md:pl-12"}`}>
          <div className="glass-card p-6 gold-border-glow">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-3">
              <h3 className="text-lg font-serif font-semibold text-foreground">{experience.title}</h3>
              <span className="text-sm text-primary font-mono">{experience.period}</span>
            </div>
            
            <p className="text-primary font-medium mb-4">{experience.company}</p>
            
            <ul className="space-y-2">
              {experience.achievements.map((achievement, achievementIndex) => (
                <motion.li
                  key={achievementIndex}
                  initial={{ opacity: 0, x: -10 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ delay: index * 0.15 + achievementIndex * 0.1 + 0.3 }}
                  className="flex items-start gap-2 text-muted-foreground text-sm"
                >
                  <span className="text-primary mt-1">▹</span>
                  {achievement}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const ExperienceSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="experience" className="py-20 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-serif font-bold text-center mb-16"
        >
          <span className="gold-shimmer">Experience</span>
        </motion.h2>

        {/* Experience Timeline */}
        <div className="max-w-4xl mx-auto">
          {experienceData.map((experience, index) => (
            <ExperienceCard
              key={experience.title}
              experience={experience}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
