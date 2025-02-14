'use client';

import React, { useState, useEffect, useRef } from 'react';
import { Briefcase } from 'lucide-react';

interface Experience {
  icon: React.ReactElement;
  title: string;
  company: string;
  description: string;
  period: string;
  skills?: string[];
}

const ParticleText: React.FC<{ 
  text: string; 
  delay?: number; 
  className?: string;
  style?: React.CSSProperties;
}> = ({ text, delay = 0, className = '', style = {} }) => {
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const timer = setTimeout(() => setIsVisible(true), delay);
          return () => clearTimeout(timer);
        }
      },
      {
        threshold: 0.1,
        rootMargin: '-100px'
      }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, [delay]);

  return (
    <div ref={containerRef} className="relative">
      <span className={`invisible ${className}`}>{text}</span>
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className={`relative ${className} transition-opacity duration-1000 
            ${isVisible ? 'opacity-100' : 'opacity-0'}`}
          style={style}
        >
          {text.split('').map((char, idx) => (
            <span
              key={idx}
              className="inline-block relative"
              style={{
                animation: isVisible 
                  ? `particleIn 1.2s ${idx * 50}ms forwards` 
                  : 'none',
                opacity: 0,
              }}
            >
              {char === ' ' ? '\u00A0' : char}
              {isVisible && [...Array(6)].map((_, i) => (
                <span
                  key={i}
                  className="particle absolute w-1 h-1 bg-blue-400/80 rounded-full"
                  style={{
                    animation: `particleFloat 1.5s ${i * 150}ms forwards`,
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              ))}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
};

const AnimatedCard: React.FC<{ experience: Experience; index: number }> = ({ experience, index }) => {
  const [isVisible, setIsVisible] = useState(false);
  const cardRef = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          setIsVisible(true);
        }
      },
      {
        threshold: 0.2,
        rootMargin: '-50px'
      }
    );

    if (cardRef.current) {
      observer.observe(cardRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={cardRef}
      className={`transform transition-all duration-1000 
        ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-16'}`}
      style={{ 
        transitionDelay: `${index * 200}ms`
      }}
    >
      <div className="group bg-blue-900/60 backdrop-blur-sm rounded-lg p-6 transition-all duration-500 
        hover:bg-blue-900/70 hover:translate-y-[-4px] hover:shadow-lg hover:shadow-blue-500/20 
        relative overflow-hidden">
        {/* Gradient overlay on hover */}
        <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-transparent to-blue-500/10 
          opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
        
        {/* Card content */}
        <div className="relative flex items-start gap-4">
          <div className="p-2 bg-blue-800/30 rounded-lg">
            {experience.icon}
          </div>
          
          <div className="flex-1">
            <div className="flex items-center justify-between mb-2">
              <div>
                <h3 className="text-xl font-semibold">{experience.title}</h3>
                <p className="text-blue-300">{experience.company}</p>
              </div>
              <span className="text-sm text-gray-400">{experience.period}</span>
            </div>

            <p className="text-gray-300 mb-4">{experience.description}</p>

            {experience.skills && (
              <div className="flex flex-wrap gap-2 mb-3">
                {experience.skills.map((item, i) => (
                  <span 
                    key={i}
                    className="text-sm px-3 py-1 rounded-full bg-blue-800/40 text-blue-200 
                      transform transition-transform duration-300 hover:scale-105"
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
  );
};

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
          <div className="mb-4">
            <ParticleText 
              text="Experience"
              className="text-6xl"
              style={{
                fontFamily: 'Optima, Candara, sans-serif',
                fontWeight: 700,
                letterSpacing: '0.01em',
                textShadow: '0 0 15px rgba(255,255,255,0.3)'
              }}
            />
          </div>
          <div className="h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent mx-auto w-32 opacity-0 animate-scale-x" />
        </div>

        <div className="grid gap-6">
          {experiences.map((exp, index) => (
            <AnimatedCard key={exp.title} experience={exp} index={index} />
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes particleIn {
          0% {
            opacity: 0;
            transform: scale(0) translate(50px, 50px);
          }
          50% {
            opacity: 0.5;
          }
          100% {
            opacity: 1;
            transform: scale(1) translate(0, 0);
          }
        }

        @keyframes particleFloat {
          0% {
            opacity: 1;
            transform: scale(1) translate(0, 0);
          }
          100% {
            opacity: 0;
            transform: scale(0) translate(
              ${Math.random() >= 0.5 ? '-' : ''}${Math.random() * 50}px,
              ${Math.random() >= 0.5 ? '-' : ''}${Math.random() * 50}px
            );
          }
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

        .particle {
          pointer-events: none;
          transform-origin: center;
        }
      `}</style>
    </section>
  );
};

export default ExperienceSection;