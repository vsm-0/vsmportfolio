import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Award, 
  Target, 
  Star, 
  Lightbulb, 
  Radio, 
  BookOpen, 
  Users, 
  Flag, 
  Trophy 
} from "lucide-react";

const positions = [
  {
    title: "NCC 'A' Certificate Holder",
    organization: "National Cadet Corps",
    description: "Served as Lead Female Commander at school level",
    Icon: Award,
  },
  {
    title: "Joint Secretary, AI & DS",
    organization: "VIIT",
    description: "Successfully organized and executed 30+ technical events",
    Icon: Target,
  },
  {
    title: "Core Team Member",
    organization: "Student Activity Council at VIIT",
    description: "Promoted based on excellent performance",
    Icon: Star,
  },
  {
    title: "Matrix Club Content Lead",
    organization: "Matrix Club",
    description: "Designed and conducted workshops and hackathons",
    Icon: Lightbulb,
  },
  {
    title: "Lead Anchor & Radio Jockey",
    organization: "87.9 Vignana Dhwani FM",
    description: "Developed communication skills through radio broadcasting",
    Icon: Radio,
  },
  {
    title: "Learning Chair",
    organization: "Young India Yuva EC, VIIT(A)",
    description: "Facilitated peer learning initiatives",
    Icon: BookOpen,
  },
  {
    title: "Lead of Women Empowerment and Protection Cell",
    organization: "VIIT(A)",
    description: "Advocated for gender equality and women's rights",
    Icon: Users,
  },
  {
    title: "Yuva Sangam Phase 5 Participant",
    organization: "EBSB Initiative",
    description: "Shortlisted as an NSS Student in Nov 2024",
    Icon: Flag,
  },
  {
    title: "Team Lead",
    organization: "Yogandhra 2K25, Visakhapatnam",
    description: "Exhibited leadership qualities in organizing yoga event",
    Icon: Trophy,
  },
];

const PositionsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="positions" className="py-20 md:py-32 relative" ref={ref}>
      <div className="container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          {/* Section Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="text-3xl md:text-5xl font-serif font-bold text-center mb-4"
          >
            <span className="gold-shimmer">Positions of Responsibility</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.3 }}
            className="text-center text-muted-foreground mb-12 max-w-2xl mx-auto"
          >
            Leadership roles and responsibilities that shaped my journey
          </motion.p>

          {/* Positions Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto">
            {positions.map((position, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.1 * index, duration: 0.5 }}
              >
                <Card className="glass-card h-full hover:shadow-lg transition-all duration-300 hover:scale-105 border-primary/20">
                  <CardHeader>
                    <div className="flex items-start gap-3">
  <div className="p-3 rounded-full bg-gradient-to-br from-[#BF953F] to-[#AA771C] shadow-lg">
    <position.Icon className="w-8 h-8 text-white" strokeWidth={1.5} />
  </div>
  <div className="flex-1">
                        <CardTitle className="text-lg font-semibold mb-2">
                          {position.title}
                        </CardTitle>
                        <Badge variant="secondary" className="text-xs">
                          {position.organization}
                        </Badge>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <CardDescription className="text-sm leading-relaxed">
                      {position.description}
                    </CardDescription>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default PositionsSection;