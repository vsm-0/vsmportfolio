import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { ExternalLink, Github, Layers, Zap, Search, Database } from "lucide-react";

interface Project {
  title: string;
  description: string;
  role: string;
  achievements: string[];
  tech: string[];
  icon: typeof Layers;
}

const projectsData: Project[] = [
  {
    title: "LedgerCFO",
    description: "A comprehensive financial platform with responsive dashboards and financial UI components.",
    role: "Front-End Developer",
    achievements: [
      "Built responsive dashboards and financial UI components",
      "Focused on clean layouts, accessibility, and performance",
    ],
    tech: ["React", "Tailwind CSS"],
    icon: Layers,
  },
  {
    title: "Quickster",
    description: "Examination attendance system using facial recognition & barcode scanning.",
    role: "Full-Stack Developer",
    achievements: [
      "Full-stack system using facial recognition & barcode scanning",
      "Designed and implemented responsive UI",
      "Integrated backend authentication workflows",
    ],
    tech: ["React", "Tailwind", "Python", "Database Integration"],
    icon: Zap,
  },
  {
    title: "Sculpt",
    description: "AI-based semantic search engine for improved content relevance.",
    role: "Front-End Developer",
    achievements: [
      "Designed modern, responsive front-end interface",
      "Implemented semantic search features for improved relevance",
      "Collaborated with backend & AI teams",
    ],
    tech: ["React", "Tailwind CSS", "Python"],
    icon: Search,
  },
  {
    title: "Asset Management Tool",
    description: "Python backend system for classifying and processing asset data.",
    role: "Backend Developer",
    achievements: [
      "Built Python backend to classify and process asset data",
      "Automated reports and data workflows",
      "Reduced operational effort by 60%",
    ],
    tech: ["Python", "SQL"],
    icon: Database,
  },
];

const ProjectCard = ({ project, index, isInView }: { project: Project; index: number; isInView: boolean }) => {
  const Icon = project.icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.15, duration: 0.5 }}
      whileHover={{ y: -5 }}
      className="glass-card p-6 gold-border-glow group relative overflow-hidden"
    >
      {/* Hover glow effect */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
            <Icon className="text-primary" size={24} />
          </div>
          <div className="flex gap-2">
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-primary transition-colors"
            >
              <Github size={18} />
            </motion.button>
            <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
              className="p-2 rounded-lg hover:bg-secondary/50 text-muted-foreground hover:text-primary transition-colors"
            >
              <ExternalLink size={18} />
            </motion.button>
          </div>
        </div>

        {/* Title & Role */}
        <h3 className="text-xl font-serif font-semibold text-foreground mb-1 group-hover:text-primary transition-colors">
          {project.title}
        </h3>
        <p className="text-primary text-sm font-medium mb-3">{project.role}</p>

        {/* Description */}
        <p className="text-muted-foreground text-sm mb-4">{project.description}</p>

        {/* Achievements */}
        <ul className="space-y-1 mb-4">
          {project.achievements.map((achievement, i) => (
            <li key={i} className="flex items-start gap-2 text-muted-foreground text-sm">
              <span className="text-primary mt-0.5">▹</span>
              {achievement}
            </li>
          ))}
        </ul>

        {/* Tech Stack */}
        <div className="flex flex-wrap gap-2">
          {project.tech.map((tech) => (
            <span
              key={tech}
              className="px-3 py-1 text-xs rounded-full bg-secondary/50 text-muted-foreground border border-primary/20"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
};

const ProjectsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="projects" className="py-20 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-serif font-bold text-center mb-16"
        >
          <span className="gold-shimmer">Projects</span>
        </motion.h2>

        {/* Projects Grid */}
        <div className="grid md:grid-cols-2 gap-6 max-w-5xl mx-auto">
          {projectsData.map((project, index) => (
            <ProjectCard key={project.title} project={project} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
