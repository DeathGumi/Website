'use client';

import React from 'react';
import { Users, Code, Briefcase, Github, ExternalLink } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
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
        "/1.png",
        "/2.png",
        "/3.png"
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
      images: [

      ]
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

                    {exp.images && (
                      <div className="grid grid-cols-3 gap-2 mb-4">
                        {exp.images.map((src, i) => (
                          <div key={i} className="relative rounded-lg overflow-hidden bg-blue-900/30">
                            <img
                              src={src}
                              alt={`${exp.company} project screenshot ${i + 1}`}
                              className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
                            />
                          </div>
                        ))}
                      </div>
                    )}

                    {(exp.tech || exp.skills) && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {(exp.tech || exp.skills).map((item, i) => (
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