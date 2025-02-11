'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';

const AboutSection = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    { src: "/nam.webp", alt: "Nam Ton", width: 280, height: 400 },
    { src: "/dog.webp", alt: "My Husky", width: 280, height: 400 },
    { src: "/dog1.webp", alt: "Husky2.0", width: 280, height: 400 },
    { src: "/koda.webp", alt: "Bush", width: 280, height: 400 },
  ];

  const titleText = "About Me".split("");
  
  const titleContainerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    }
  };

  const titleLetterVariants = {
    hidden: { 
      opacity: 0,
      rotateX: -90,
      y: 20
    },
    visible: {
      opacity: 1,
      rotateX: 0,
      y: 0,
      transition: {
        type: "spring",
        damping: 10,
        stiffness: 100
      }
    }
  };

  const decorativeLineVariants = {
    hidden: { 
      scaleX: 0,
      filter: "blur(8px)"
    },
    visible: {
      scaleX: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: [0.43, 0.13, 0.23, 0.96]
      }
    }
  };

  const bioVariants = {
    hidden: { 
      opacity: 0,
      scale: 0.8,
      rotateY: 25,
      x: 100
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateY: 0,
      x: 0,
      transition: {
        type: "spring",
        damping: 20,
        stiffness: 100,
        duration: 1
      }
    }
  };

  const tagVariants = {
    hidden: { 
      opacity: 0,
      x: -20,
      filter: "blur(10px)"
    },
    visible: (i: number) => ({
      opacity: 1,
      x: 0,
      filter: "blur(0px)",
      transition: {
        delay: i * 0.1,
        duration: 0.4,
        ease: [0.25, 0.46, 0.45, 0.94]
      }
    })
  };

  const calculateImagePosition = (index: number) => {
    const position = index - currentImageIndex;
    
    if (position === 0) {
      return {
        left: '50%',
        opacity: 1,
        scale: 1,
        rotateY: 0,
        zIndex: 3,
        filter: 'brightness(1)'
      };
    } else if (position === 1 || position === -images.length + 1) {
      return {
        left: '65%',
        opacity: 0.6,
        scale: 0.85,
        rotateY: -45,
        zIndex: 2,
        filter: 'brightness(0.7)'
      };
    } else if (position === -1 || position === images.length - 1) {
      return {
        left: '35%',
        opacity: 0.6,
        scale: 0.85,
        rotateY: 45,
        zIndex: 2,
        filter: 'brightness(0.7)'
      };
    } else {
      return {
        left: position < 0 ? '20%' : '80%',
        opacity: 0.3,
        scale: 0.7,
        rotateY: position < 0 ? 60 : -60,
        zIndex: 1,
        filter: 'brightness(0.5)'
      };
    }
  };

  return (
    <motion.div 
      id="about"
      className="relative flex justify-center items-center min-h-screen overflow-hidden py-20"
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }}
    >
      <div className="flex flex-col items-center relative z-10 max-w-4xl mx-auto px-8">
        <motion.div 
          className="mb-16 text-center relative perspective"
          variants={titleContainerVariants}
        >
          <motion.h1 
            className="text-6xl font-bold mb-4 flex justify-center gap-2"
            style={{
              fontFamily: 'Optima, Candara, sans-serif',
              fontWeight: 700,
              letterSpacing: '0.01em',
              textShadow: '0 0 15px rgba(255,255,255,0.3)'
            }}
          >
            {titleText.map((letter, i) => (
              <motion.span
                key={i}
                variants={titleLetterVariants}
                style={{ display: 'inline-block', transformOrigin: 'bottom' }}
              >
                {letter === " " ? "\u00A0" : letter}
              </motion.span>
            ))}
          </motion.h1>
          
          <motion.div
            className="h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent w-32 mx-auto"
            variants={decorativeLineVariants}
            style={{ transformOrigin: 'left' }}
          />
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-16">
          <motion.div
            className="w-full md:w-1/2 h-[400px] relative group"
            initial={{ opacity: 0, rotateY: 90 }}
            animate={{ opacity: 1, rotateY: 0 }}
            transition={{ duration: 1, ease: [0.43, 0.13, 0.23, 0.96] }}
          >
            <div className="relative h-full flex items-center justify-center perspective-1000">
              <div className="relative w-full h-full">
                {images.map((image, index) => {
                  const position = calculateImagePosition(index);
                  const isCurrentImage = index === currentImageIndex;
                  
                  return (
                    <motion.div
                      key={image.src}
                      className="absolute top-0 rounded-2xl overflow-hidden bg-blue-900/60 backdrop-blur-sm border border-white/10 shadow-2xl hover:shadow-blue-500/20 w-[280px] h-[400px]"
                      initial={false}
                      animate={{
                        x: `-50%`,
                        left: position.left,
                        opacity: position.opacity,
                        scale: position.scale,
                        rotateY: position.rotateY,
                        filter: position.filter,
                      }}
                      transition={{
                        duration: 0.8,
                        ease: [0.43, 0.13, 0.23, 0.96]
                      }}
                      style={{ 
                        transformStyle: 'preserve-3d',
                        zIndex: position.zIndex
                      }}
                    >
                      <div className="relative w-full h-full group">
                        <div className="absolute inset-0 bg-gradient-to-tr from-blue-500/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                        <div className="relative w-full h-full">
                          <Image 
                            src={image.src}
                            alt={image.alt}
                            fill
                            priority={isCurrentImage}
                            quality={90}
                            sizes="(max-width: 768px) 100vw, 280px"
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                            style={{
                              transform: 'translateZ(0)',
                              willChange: 'transform'
                            }}
                          />
                        </div>
                      </div>
                    </motion.div>
                  );
                })}
              </div>

              <div className="absolute inset-x-0 bottom-8 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-opacity z-10">
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length)}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors transform hover:scale-110"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={24} />
                </button>
                <div className="bg-black/50 px-3 py-1 rounded-full text-white text-sm">
                  {currentImageIndex + 1} / {images.length}
                </div>
                <button
                  onClick={() => setCurrentImageIndex((prev) => (prev + 1) % images.length)}
                  className="p-2 rounded-full bg-black/50 text-white hover:bg-black/70 transition-colors transform hover:scale-110"
                  aria-label="Next image"
                >
                  <ChevronRight size={24} />
                </button>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="w-full md:w-1/2 space-y-6 perspective"
            variants={bioVariants}
          >
            <p className="text-xl leading-relaxed text-gray-200">
              Hi, I'm Nam! These days, you'll find me either deep in code, walking with my dog to clear my mind, or exploring new food spots around town. When I'm not building apps, I'm usually playing sports with friends or catching up on my favorite manga series.
            </p>
            
            <motion.div 
              className="flex flex-wrap gap-3"
            >
              {['Developer', 'Dog Lover', 'Foodie', 'Sports Enthusiast', 'Manga Reader'].map((tag, index) => (
                <motion.span
                  key={tag}
                  custom={index}
                  variants={tagVariants}
                  className="px-4 py-2 rounded-full bg-blue-900/40 backdrop-blur-sm border border-white/10 text-white/80 hover:text-white transition-all duration-300 hover:scale-110 hover:border-blue-400/50"
                  whileHover={{
                    textShadow: "0 0 8px rgb(59, 130, 246)",
                    boxShadow: "0 0 8px rgb(59, 130, 246)"
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