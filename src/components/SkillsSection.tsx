import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { Code, Server, BarChart3, Wrench } from "lucide-react";

interface Skill {
  name: string;
  level: number;
}

interface SkillCategory {
  title: string;
  icon: typeof Code;
  skills: Skill[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Front-End Development",
    icon: Code,
    skills: [
      { name: "React.js", level: 90 },
      { name: "Tailwind CSS", level: 90 },
      { name: "HTML5 / CSS3", level: 90 },
      { name: "JavaScript", level: 75 },
      { name: "Figma (UI Design)", level: 70 },
    ],
  },
  {
    title: "Backend & Programming",
    icon: Server,
    skills: [
      { name: "Python", level: 85 },
      { name: "Flask & REST APIs", level: 70 },
      { name: "SQL (MySQL, PostgreSQL)", level: 70 },
      { name: "MongoDB", level: 55 },
    ],
  },
  {
    title: "Data & Analytics",
    icon: BarChart3,
    skills: [
      { name: "Power BI / Tableau", level: 70 },
      { name: "Excel (Dashboards, Pivot Tables)", level: 85 },
      { name: "Data Analysis & Reporting", level: 75 },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: Wrench,
    skills: [
      { name: "Git & GitHub", level: 85 },
      { name: "VS Code", level: 90 },
      { name: "JIRA, Notion", level: 80 },
      { name: "Google Colab, Jupyter", level: 80 },
      { name: "AWS (Basics)", level: 50 },
    ],
  },
];

const SkillBar = ({ skill, delay, isInView }: { skill: Skill; delay: number; isInView: boolean }) => {
  const [width, setWidth] = useState(0);

  useEffect(() => {
    if (isInView) {
      const timeout = setTimeout(() => setWidth(skill.level), delay * 1000);
      return () => clearTimeout(timeout);
    }
  }, [isInView, skill.level, delay]);

  return (
    <div className="mb-4">
      <div className="flex justify-between mb-1">
        <span className="text-sm text-foreground">{skill.name}</span>
        <span className="text-sm text-primary font-mono">{skill.level}%</span>
      </div>
      <div className="progress-maroon">
        <motion.div
          className="progress-maroon-fill"
          initial={{ width: 0 }}
          animate={{ width: `${width}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </div>
  );
};

const SkillCard = ({ category, index, isInView }: { category: SkillCategory; index: number; isInView: boolean }) => {
  const Icon = category.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      className="glass-card p-6 gold-border-glow"
    >
      <div className="flex items-center gap-3 mb-6">
        <div className="p-3 rounded-lg bg-primary/10">
          <Icon className="text-primary" size={24} />
        </div>
        <h3 className="text-lg font-serif font-semibold text-foreground">{category.title}</h3>
      </div>

      <div>
        {category.skills.map((skill, skillIndex) => (
          <SkillBar
            key={skill.name}
            skill={skill}
            delay={0.3 + index * 0.1 + skillIndex * 0.05}
            isInView={isInView}
          />
        ))}
      </div>
    </motion.div>
  );
};

const SkillsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="skills" className="py-20 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-serif font-bold text-center mb-16"
        >
          <span className="gold-shimmer">Skills & Expertise</span>
        </motion.h2>

        {/* Skills Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {skillCategories.map((category, index) => (
            <SkillCard
              key={category.title}
              category={category}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default SkillsSection;
