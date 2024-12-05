'use client';
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Users, Code, Globe, Briefcase, Github, ExternalLink } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      icon: <Briefcase className="w-8 h-8" />,
      title: "Customer Service & Kitchen Leadership",
      description: `At Fountain Bowl, I jumped between customer service and kitchen operations. 
        Worked directly with vendors and helped coordinate between different teams to keep 
        everything running smooth. Got to learn a lot about working with different types of 
        people and taking charge when needed.`,
      period: "2021 - 2022",
      highlights: ["Customer Service", "Kitchen Operations", "Team Coordination"]
    },
    {
      icon: <Users className="w-8 h-8" />,
      title: "Project Leadership - Calcoy",
      description: `Led a team of six developers to build Calcoy, a modern calendar app powered 
        by AI. As team lead and technical product owner, I designed the core architecture and 
        built key features using JavaScript. We created a responsive frontend with Next.js/React 
        and set up a solid backend using Node.js and PostgreSQL for real-time updates.`,
      tech: ["JavaScript", "React/Next.js", "Node.js", "PostgreSQL", "Socket.IO", "Tailwind CSS"],
      period: "2023",
      role: "Team Lead & Technical Product Owner",
      links: [
        { url: "https://github.com/gsdyu/Calcoy", icon: <Github className="w-5 h-5" />, text: "GitHub" },
        { url: "https://www.calcoy.com/", icon: <ExternalLink className="w-5 h-5" />, text: "Live Site" }
      ]
    },
    {
      icon: <Code className="w-8 h-8" />,
      title: "Lead Developer - Food Truck Finder",
      description: `Developed the core features of an interactive map-based app for finding and 
        reviewing food trucks in real-time. While I handled the main development, I collaborated 
        with team members to enhance various features and improve the overall user experience.`,
      tech: ["Next.js", "JavaScript", "React Leaflet", "MVC Architecture"],
      period: "2023",
      role: "Lead Developer",
      links: [
        { url: "https://github.com/DeathGumi/Food-Truck-Finder", icon: <Github className="w-5 h-5" />, text: "GitHub" }
      ]
    }
  ];

  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden">
      <div className="flex flex-col items-center relative z-10 max-w-4xl mx-auto px-8">
        {/* Title animation */}
        <AnimatePresence mode="wait">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="mb-24 text-center mt-64"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-6xl font-bold mb-4"
              style={{
                fontFamily: 'Optima, Candara, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.01em',
                textShadow: '0 0 15px rgba(255,255,255,0.3)'
              }}
            >
              Experience
            </motion.div>
            
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{
                duration: 0.8,
                delay: 0.3,
                ease: [0.215, 0.610, 0.355, 1.000]
              }}
              className="h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto w-32"
              style={{ transformOrigin: 'left' }}
            />
          </motion.div>
        </AnimatePresence>

        {/* Main content */}
        <div className="space-y-16">
          {experiences.map((exp, index) => (
            <motion.div
              key={exp.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="relative"
            >
              <div className="p-10 rounded-xl bg-blue-900/30 backdrop-blur-sm">
                <div className="flex items-center gap-5 mb-8">
                  {exp.icon}
                  <div>
                    <h3 className="text-3xl font-light mb-2" style={{ fontFamily: 'Optima, Candara, sans-serif' }}>
                      {exp.title}
                    </h3>
                    <div className="text-xl text-gray-300">{exp.period}</div>
                    {exp.role && (
                      <div className="text-xl text-blue-300 mt-2">{exp.role}</div>
                    )}
                  </div>
                </div>
                
                <p className="text-gray-200 text-xl leading-relaxed mb-8">{exp.description}</p>
                
                {exp.highlights && (
                  <div className="flex flex-wrap gap-3 mb-6">
                    {exp.highlights.map((item, i) => (
                      <span key={i} className="px-5 py-2 rounded-full bg-blue-800/50 text-lg">
                        {item}
                      </span>
                    ))}
                  </div>
                )}
                
                {exp.tech && (
                  <div className="flex flex-wrap gap-3 mb-6">
                    {exp.tech.map((item, i) => (
                      <span key={i} className="px-5 py-2 rounded-full bg-blue-800/50 text-lg">
                        {item}
                      </span>
                    ))}
                  </div>
                )}

                {exp.links && (
                  <div className="flex gap-4 mt-8">
                    {exp.links.map((link, i) => (
                      <a
                        key={i}
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-lg text-blue-300 hover:text-blue-200 transition-colors"
                      >
                        {link.icon}
                        {link.text}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ExperienceSection;