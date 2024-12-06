'use client';
import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const titleVariants = {
    hidden: { opacity: 0, y: -50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const contentVariants = {
    hidden: { opacity: 0, x: -30 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const imageVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotateY: 45
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 1,
        ease: [0.645, 0.045, 0.355, 1.000]
      }
    }
  };

  const decorativeLineVariants = {
    hidden: { scaleX: 0 },
    visible: {
      scaleX: 1,
      transition: {
        duration: 1,
        ease: [0.215, 0.610, 0.355, 1.000]
      }
    }
  };

  return (
    <motion.div 
      className="relative flex justify-center items-center min-h-screen overflow-hidden py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
      variants={containerVariants}
    >
      <div className="flex flex-col items-center relative z-10 max-w-4xl mx-auto px-8">
        {/* Title Section */}
        <motion.div 
          className="mb-16 text-center relative"
          variants={titleVariants}
        >
          <h1 
            className="text-6xl font-bold mb-4"
            style={{
              fontFamily: 'Optima, Candara, sans-serif',
              fontWeight: 700,
              letterSpacing: '0.01em',
              textShadow: '0 0 15px rgba(255,255,255,0.3)'
            }}
          >
            About Me
          </h1>
          
          {/* Decorative line */}
          <motion.div
            className="h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent w-32 mx-auto"
            variants={decorativeLineVariants}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Image with 3D-like animation */}
          <motion.div
            className="w-full md:w-1/2 perspective-1000"
            variants={imageVariants}
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-blue-900/30 backdrop-blur-sm border border-white/10 shadow-2xl transition-transform duration-500 hover:scale-105">
              <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
              <img 
                src="nam.jpg" 
                alt="Nam Ton" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Bio with slide-in animation */}
          <motion.div
            className="w-full md:w-1/2 space-y-6"
            variants={contentVariants}
          >
            <p className="text-xl leading-relaxed text-gray-200">
              Hi, I'm Nam! These days, you'll find me either deep in code, walking with my dog to clear my mind, or exploring new food spots around town. When I'm not building apps, I'm usually playing sports with friends or catching up on my favorite manga series.
            </p>
            
            {/* Skills/Interests tags with stagger animation */}
            <motion.div 
              className="flex flex-wrap gap-3"
              variants={containerVariants}
            >
              {['Developer', 'Dog Lover', 'Foodie', 'Sports Enthusiast', 'Manga Reader'].map((tag, index) => (
                <motion.span
                  key={tag}
                  className="px-4 py-2 rounded-full bg-blue-900/40 backdrop-blur-sm border border-white/10 text-white/80 hover:text-white transition-colors"
                  variants={{
                    hidden: { opacity: 0, y: 20 },
                    visible: {
                      opacity: 1,
                      y: 0,
                      transition: {
                        duration: 0.5,
                        delay: index * 0.1
                      }
                    }
                  }}
                >
                  {tag}
                </motion.span>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
};

export default AboutSection;