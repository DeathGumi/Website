'use client';

import React, { useState } from 'react';
import { Users, Code, Briefcase, Github, ExternalLink, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageModalProps {
  image: string;
  explanation: string;
  title: string;
  onClose: () => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ image, explanation, title, onClose }) => {
  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/80"
      onClick={onClose}
    >
      <motion.div 
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        className="relative flex w-full max-w-7xl mx-4 h-[80vh] bg-gray-900/90 rounded-lg overflow-hidden"
        onClick={e => e.stopPropagation()}
      >
        {/* Image Section */}
        <div className="flex-1 p-4">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>

        {/* Explanation Section */}
        <div className="w-96 border-l border-gray-700 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">{title}</h3>
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-800 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="space-y-4">
            <div className="p-4 rounded-lg bg-blue-900/20 backdrop-blur-sm">
              <p className="text-sm text-gray-300">
                {explanation}
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface Experience {
  icon: React.ReactNode;
  title: string;
  company: string;
  description: string;
  period: string;
  skills?: string[];
  tech?: string[];
  links?: {
    url: string;
    icon: React.ReactNode;
  }[];
  images?: {
    src: string;
    title: string;
    explanation: string;
  }[];
}

interface SelectedImage {
  src: string;
  title: string;
  explanation: string;
}

const ExperienceSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<SelectedImage | null>(null);

  const experiences: Experience[] = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Kitchen Leadership",
      company: "Fountain Bowl",
      description: "Led kitchen operations & customer service, coordinating teams and vendors.",
      period: "2021 - 2022",
      skills: ["Customer Service", "Operations", "Team Leadership"]
    },
    {
      icon: <Users className="w-6 h-6" />,
      title: "Project Lead",
      company: "Calcoy",
      description: "Led development of AI-powered calendar app. Architected core features using Next.js/React.",
      tech: ["JavaScript", "React", "Node.js", "PostgreSQL"],
      period: "2024 - Current",
      links: [
        { url: "https://github.com/gsdyu/Calcoy", icon: <Github className="w-4 h-4" /> },
        { url: "https://www.calcoy.com/", icon: <ExternalLink className="w-4 h-4" /> }
      ],
      images: [
        {
          src: "/1.png",
          title: "Calendar Interface",
          explanation: ""
        },
        {
          src: "/2.png",
          title: "Smart Scheduling",
          explanation: ""
        },
        {
          src: "/3.png",
          title: "Group + Event added",
          explanation: ""
        }
      ]
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Lead Developer",
      company: "Food Truck Finder",
      description: "Built real-time food truck mapping app with interactive features.",
      tech: ["Next.js", "React Leaflet", "MVC"],
      period: "2024",
      links: [
        { url: "https://github.com/DeathGumi/Food-Truck-Finder", icon: <Github className="w-4 h-4" /> }
      ],
      images: []
    }
  ];

  return (
    <section id="experience" className="py-20 px-4">
      <div className="max-w-3xl mx-auto">
        <div className="mb-12 text-center">
          <h2 
            className="text-6xl mb-4 opacity-0 animate-fade-in"
            style={{
              fontFamily: 'Optima, Candara, sans-serif',
              fontWeight: 700,
              letterSpacing: '0.01em',
              textShadow: '0 0 15px rgba(255,255,255,0.3)'
            }}
          >
            Experience
          </h2>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto w-32 opacity-0 animate-scale-x" />
        </div>

        <div className="grid gap-6">
          {experiences.map((exp, index) => (
            <div
              key={exp.title}
              className="group relative opacity-0 animate-slide-up"
              style={{ 
                animationDelay: `${index * 150}ms`,
                animationFillMode: 'forwards' 
              }}
            >
              <div className="bg-blue-900/20 backdrop-blur-sm rounded-lg p-6 hover:bg-blue-900/30 transition-all duration-300 hover:translate-y-[-2px]">
                <div className="flex items-start gap-4">
                  <div className="p-2 bg-blue-800/30 rounded-lg">
                    {exp.icon}
                  </div>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <div>
                        <h3 className="text-xl font-semibold">{exp.title}</h3>
                        <p className="text-blue-300">{exp.company}</p>
                      </div>
                      <span className="text-sm text-gray-400">{exp.period}</span>
                    </div>

                    <p className="text-gray-300 mb-4">{exp.description}</p>

                    {exp.images && exp.images.length > 0 && (
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {exp.images.map((image, i) => (
                          <div 
                            key={i} 
                            className="relative rounded-lg overflow-hidden bg-blue-900/30 group/image cursor-pointer"
                            onClick={() => setSelectedImage(image)}
                          >
                            <img
                              src={image.src}
                              alt={image.title}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover/image:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {(exp.tech || exp.skills) && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {[...(exp.tech || []), ...(exp.skills || [])].map((item, i) => (
                          <span 
                            key={i}
                            className="text-sm px-3 py-1 rounded-full bg-blue-800/40 text-blue-200"
                          >
                            {item}
                          </span>
                        ))}
                      </div>
                    )}

                    {exp.links && (
                      <div className="flex gap-3">
                        {exp.links.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-blue-300 transition-colors"
                          >
                            {link.icon}
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {selectedImage && (
          <ImageModal 
            image={selectedImage.src}
            title={selectedImage.title}
            explanation={selectedImage.explanation}
            onClose={() => setSelectedImage(null)} 
          />
        )}
      </AnimatePresence>

      <style jsx global>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes slideUp {
          from { 
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fadeIn 0.6s ease-out forwards;
        }

        .animate-slide-up {
          animation: slideUp 0.6s ease-out;
        }

        @keyframes scaleX {
          from { 
            opacity: 0;
            transform: scaleX(0);
          }
          to {
            opacity: 1;
            transform: scaleX(1);
          }
        }

        .animate-scale-x {
          animation: scaleX 0.8s ease-out 0.3s forwards;
          transform-origin: left;
        }
      `}</style>
    </section>
  );
};

export default ExperienceSection;