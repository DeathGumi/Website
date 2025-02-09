'use client';

import React from 'react';
import { Briefcase } from 'lucide-react';

interface Experience {
  icon: React.ReactElement;
  title: string;
  company: string;
  description: string;
  period: string;
  skills?: string[];
}

const ExperienceSection: React.FC = () => {
  const experiences: Experience[] = [
    {
      icon: <Briefcase className="w-6 h-6" />,
      title: "Kitchen Leadership",
      company: "Fountain Bowl",
      description: "Led kitchen operations & customer service, coordinating teams and vendors.",
      period: "2021 - 2022",
      skills: ["Customer Service", "Operations", "Team Leadership"]
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
              <div className="bg-blue-900/60 backdrop-blur-sm rounded-lg p-6 hover:bg-blue-900/70 transition-all duration-300 hover:translate-y-[-2px]">
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

                    {exp.skills && (
                      <div className="flex flex-wrap gap-2 mb-3">
                        {exp.skills.map((item, i) => (
                          <span 
                            key={i}
                            className="text-sm px-3 py-1 rounded-full bg-blue-800/40 text-blue-200"
                          >
                            {item}
                          </span>
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