'use client';
import React from 'react';
import { motion } from 'framer-motion';

const AboutSection = () => {
  return (
    <div className="relative flex justify-center items-center min-h-screen overflow-hidden">
      <div className="flex flex-col items-center relative z-10 max-w-4xl mx-auto px-8">
        {/* Title */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="mb-16 text-center"
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
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-16">
          {/* Image */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full md:w-1/2"
          >
            <div className="aspect-square rounded-2xl overflow-hidden bg-blue-900/30 backdrop-blur-sm border border-white/10">
              <img 
                src="nam.jpg" 
                alt="Nam Ton" 
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="w-full md:w-1/2"
          >
            <p className="text-xl leading-relaxed text-gray-200">
              Hi, I'm Nam! These days, you'll find me either deep in code, walking with my dog to clear my mind, or exploring new food spots around town. When I'm not building apps, I'm usually playing sports with friends or catching up on my favorite manga series.
            </p>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default AboutSection;