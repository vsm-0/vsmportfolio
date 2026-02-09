import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Award, Cloud, Code, Brain, Shield, Database, Users, Briefcase } from "lucide-react";

interface Certification {
  title: string;
  issuer: string;
  icon: typeof Award;
}

const certificationsData: Certification[] = [
  {
    title: "Google AI Essentials",
    issuer: "edX",
    icon: Brain,
  },
  {
    title: "Google Cloud Computing: Data, AI & ML",
    issuer: "edX",
    icon: Cloud,
  },
  {
    title: "CS50's Programming with Python",
    issuer: "HarvardX",
    icon: Code,
  },
  {
    title: "Front End Web Development",
    issuer: "Infosys Springboard",
    icon: Code,
  },
  {
    title: "Introduction to Machine Learning",
    issuer: "NPTEL (IIT Madras)",
    icon: Brain,
  },
  {
    title: "Python & Cybersecurity Essentials",
    issuer: "Cisco",
    icon: Shield,
  },
  {
    title: "Python Basics for Data Science",
    issuer: "IBM",
    icon: Database,
  },
  {
    title: "Project Management (JIRA & Zoho)",
    issuer: "L&T & Reliance Foundation",
    icon: Briefcase,
  },
  {
    title: "Employability Skills",
    issuer: "Wadhwani Foundation",
    icon: Users,
  },
];

const CertificationCard = ({ cert, index, isInView }: { cert: Certification; index: number; isInView: boolean }) => {
  const Icon = cert.icon;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={isInView ? { opacity: 1, scale: 1 } : {}}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ scale: 1.03, y: -3 }}
      className="glass-card p-5 gold-border-glow group"
    >
      <div className="flex items-center gap-4">
        <div className="p-3 rounded-lg bg-primary/10 group-hover:bg-primary/20 transition-colors">
          <Icon className="text-primary" size={20} />
        </div>
        <div className="flex-1 min-w-0">
          <h3 className="text-sm font-medium text-foreground truncate group-hover:text-primary transition-colors">
            {cert.title}
          </h3>
          <p className="text-xs text-muted-foreground">{cert.issuer}</p>
        </div>
        <Award className="text-primary/50 group-hover:text-primary transition-colors flex-shrink-0" size={16} />
      </div>
    </motion.div>
  );
};

const CertificationsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="certifications" className="py-20 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-serif font-bold text-center mb-16"
        >
          <span className="gold-shimmer">Certifications</span>
        </motion.h2>

        {/* Certifications Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-5xl mx-auto">
          {certificationsData.map((cert, index) => (
            <CertificationCard key={cert.title} cert={cert} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
