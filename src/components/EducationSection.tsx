import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { GraduationCap, School, Award } from "lucide-react";

interface Education {
  title: string;
  institution: string;
  location: string;
  period: string;
  score: string;
  board?: string;
  icon: typeof GraduationCap;
}

const educationData: Education[] = [
  {
    title: "B.Tech in Computer Science Engineering",
    institution: "Vignan's Institute of Information Technology",
    location: "Visakhapatnam",
    period: "Expected Graduation: May 2026",
    score: "CGPA: 8.67 / 10",
    icon: GraduationCap,
  },
  {
    title: "Higher Secondary Education (Class XII)",
    institution: "Sri Chaitanya Junior College",
    location: "Gajuwaka, Andhra Pradesh",
    period: "Year: 2022",
    score: "Score: 92.6%",
    board: "Board of Intermediate Education, Andhra Pradesh (BIEAP)",
    icon: School,
  },
  {
    title: "Secondary Education (Class X)",
    institution: "Sri Swamy Vivekananda High School",
    location: "Sriharipuram, Andhra Pradesh",
    period: "Year: 2020",
    score: "Score: 90%",
    board: "Board of Secondary Education, Andhra Pradesh (BSEAP)",
    icon: Award,
  },
];

const TimelineItem = ({ item, index, isInView }: { item: Education; index: number; isInView: boolean }) => {
  const Icon = item.icon;
  const isLeft = index % 2 === 0;

  return (
    <div className={`flex items-center gap-8 ${isLeft ? "md:flex-row" : "md:flex-row-reverse"}`}>
      {/* Content */}
      <motion.div
        initial={{ opacity: 0, x: isLeft ? -50 : 50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ delay: index * 0.2, duration: 0.5 }}
        className={`flex-1 ${isLeft ? "md:text-right" : "md:text-left"}`}
      >
        <div className="glass-card p-6 gold-border-glow inline-block w-full">
          <div className={`flex items-center gap-3 mb-3 ${isLeft ? "md:flex-row-reverse" : ""}`}>
            <div className="p-2 rounded-lg bg-primary/10">
              <Icon className="text-primary" size={20} />
            </div>
            <h3 className="text-lg font-serif font-semibold text-foreground">{item.title}</h3>
          </div>
          
          <p className="text-primary font-medium mb-1">{item.institution}</p>
          <p className="text-muted-foreground text-sm mb-2">{item.location}</p>
          {item.board && (
            <p className="text-muted-foreground text-sm mb-2">{item.board}</p>
          )}
          <div className="flex flex-wrap gap-3 text-sm">
            <span className="text-muted-foreground">{item.period}</span>
            <span className="text-primary font-semibold">{item.score}</span>
          </div>
        </div>
      </motion.div>

      {/* Timeline Node */}
      <motion.div
        initial={{ scale: 0 }}
        animate={isInView ? { scale: 1 } : {}}
        transition={{ delay: index * 0.2 + 0.1, type: "spring" }}
        className="hidden md:flex flex-col items-center"
      >
        <div className="timeline-node pulse-glow" />
        {index < educationData.length - 1 && (
          <motion.div
            initial={{ height: 0 }}
            animate={isInView ? { height: 120 } : {}}
            transition={{ delay: index * 0.2 + 0.3, duration: 0.5 }}
            className="w-0.5 bg-gradient-to-b from-primary to-primary/20"
          />
        )}
      </motion.div>

      {/* Empty space for alignment */}
      <div className="hidden md:block flex-1" />
    </div>
  );
};

const EducationSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="education" className="py-20 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        {/* Section Title */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-serif font-bold text-center mb-16"
        >
          <span className="gold-shimmer">Education</span>
        </motion.h2>

        {/* Timeline */}
        <div className="max-w-4xl mx-auto space-y-8">
          {educationData.map((item, index) => (
            <TimelineItem key={item.title} item={item} index={index} isInView={isInView} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default EducationSection;
