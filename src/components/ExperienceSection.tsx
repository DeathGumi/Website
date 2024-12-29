'use client';

import React, { useState } from 'react';
import { Users, Code, Briefcase, Github, ExternalLink, X, ChevronLeft, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface ImageModalProps {
  images: Array<{
    src: string;
    title: string;
    explanation: string;
  }>;
  currentIndex: number;
  onClose: () => void;
  onNavigate: (index: number) => void;
}

const ImageModal: React.FC<ImageModalProps> = ({ images, currentIndex, onClose, onNavigate }) => {
  const currentImage = images[currentIndex];

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
        {/* Navigation Buttons */}
        {currentIndex > 0 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex - 1);
            }}
            className="absolute left-4 top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
        )}
        
        {currentIndex < images.length - 1 && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              onNavigate(currentIndex + 1);
            }}
            className="absolute right-[400px] top-1/2 -translate-y-1/2 p-2 bg-black/50 hover:bg-black/70 rounded-full transition-colors"
          >
            <ChevronRight className="w-6 h-6" />
          </button>
        )}

        {/* Image Section */}
        <div className="flex-1 p-4">
          <img
            src={currentImage.src}
            alt={currentImage.title}
            className="w-full h-full object-contain rounded-lg"
          />
        </div>

        {/* Explanation Section */}
        <div className="w-96 border-l border-gray-700 p-6 overflow-y-auto">
          <div className="flex justify-between items-center mb-6">
            <h3 className="text-xl font-semibold">{currentImage.title}</h3>
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
                {currentImage.explanation}
              </p>
            </div>
          </div>

          {/* Thumbnail Navigation */}
          <div className="mt-6 grid grid-cols-4 gap-2">
            {images.map((img, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate(idx)}
                className={`
                  cursor-pointer rounded-lg overflow-hidden border-2 transition-colors
                  ${idx === currentIndex ? 'border-blue-500' : 'border-transparent hover:border-blue-500/50'}
                `}
              >
                <img
                  src={img.src}
                  alt={img.title}
                  className="w-full h-full object-cover"
                />
              </div>
            ))}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
};

interface LinkType {
  url: string;
  icon: React.ReactElement;
  label: string;
}

interface Experience {
  icon: React.ReactElement;
  title: string;
  company: string;
  description: string;
  period: string;
  skills?: string[];
  tech?: string[];
  links?: LinkType[];
  images?: {
    src: string;
    title: string;
    explanation: string;
  }[];
}

interface SelectedImageInfo {
  experienceIndex: number;
  imageIndex: number;
}

const ExperienceSection: React.FC = () => {
  const [selectedImage, setSelectedImage] = useState<SelectedImageInfo | null>(null);

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
      title: "Project Lead, Lead UX/UI Designer",
      company: "Calcoy",
      description: "Led development of AI-powered calendar app. Architected core features and interface enhancements using Next.js/React.",
      tech: ["JavaScript", "React", "Node.js", "PostgreSQL", "OAuth", "Jina Ai(Embeddings)", "Express.js", "Vercel(Webhosting)"],
      period: "2024 - Current",
      links: [
        { 
          url: "https://github.com/gsdyu/Calcoy", 
          icon: <Github className="w-5 h-5" />,
          label: "Github"
        },
        { 
          url: "https://www.calcoy.com/", 
          icon: <ExternalLink className="w-5 h-5" />,
          label: "Calcoy.com"
        }
      ],
      images: [
        {
          src: "/1.png",
          title: "Calendar Interface",
          explanation: "This is the typical calendar interface left is naviagation, top is where to change days, right is sidebar where the minicalendar, groups, filters, and tasks list are located"
        },
        {
          src: "/2.png",
          title: "Smart Scheduling",
          explanation: "This is an example of the ai creating an eventm you can change the date and talk with the ai to optimize your schedule + conversation history on the right side"
        },
        {
          src: "/3.png",
          title: "Group + Event added",
          explanation: "An event from the groups/server is created + the group/server is added to the filters"
        },
        {
          src: "/4.png",
          title: "In server + week interface",
          explanation: "In this interface this time we are in the actual server itself in the week option where when we navigate on the minicalendar there is a signifier for what day and week we clicked on and for the calendar itself there is a highlight for the specifc day"
        },
        {
          src: "/5.png",
          title: "Dashboard interface + Ai Insights + Upcoming tasks",
          explanation: "So this dashboard interface is meant to show to the user like stats over time on what percentage of tasks are finished and the goal of the app is to used these stats to learn from the user and to give recommendations and optimize the users schedule to increase their productivity and completion rate"
        },
        {
          src: "/6.png",
          title: "Friends",
          explanation: "If you ever want friends to have a community or just to keep accountibility or plan with your friend you can add friends"
        },
        {
          src: "/7.png",
          title: "Checkings friends calendar",
          explanation: "After you have a friend added you can view and check their individual calendar so you can find a day to go out or do something or you can remind them if they are missing something"
        }
      ]
    },
    {
      icon: <Code className="w-6 h-6" />,
      title: "Lead Developer",
      company: "Food Truck Finder",
      description: "Built food truck mapping app with interactive features.",
      tech: ["Next.js", "React Leaflet", "MVC-Architecture", "Javascript"],
      period: "2024",
      links: [
        { 
          url: "https://github.com/DeathGumi/Food-Truck-Finder", 
          icon: <Github className="w-5 h-5" />,
          label: "Github"
        }
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
                            onClick={() => setSelectedImage({ experienceIndex: index, imageIndex: i })}
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
                      <div className="flex gap-4 mt-4 pt-3 border-t border-blue-800/30">
                        {exp.links.map((link, i) => (
                          <a
                            key={i}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-2 px-4 py-2 bg-blue-900/30 rounded-lg 
                              text-gray-300 hover:text-blue-300 hover:bg-blue-900/50 transition-all duration-300"
                          >
                            {link.icon}
                            <span className="text-sm">
                              {link.label}
                            </span>
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
            images={experiences[selectedImage.experienceIndex].images || []}
            currentIndex={selectedImage.imageIndex}
            onClose={() => setSelectedImage(null)}
            onNavigate={(newIndex) => setSelectedImage({
              experienceIndex: selectedImage.experienceIndex,
              imageIndex: newIndex
            })}
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