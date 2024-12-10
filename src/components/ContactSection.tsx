'use client';
import React from 'react';
import { motion } from 'framer-motion';
import { Mail, Github, Linkedin, ExternalLink } from 'lucide-react';

const ContactSection = () => {
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

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: [0.215, 0.610, 0.355, 1.000]
      }
    }
  };

  const links = [
    {
      name: 'Email',
      href: 'mailto:namtton5@gmail.com',
      icon: <Mail className="w-6 h-6" />,
      description: 'Contact me here!'
    },
    {
      name: 'GitHub',
      href: 'https://github.com/DeathGumi',
      icon: <Github className="w-6 h-6" />,
      description: 'Check out my repo!'
    },
    {
      name: 'LinkedIn',
      href: 'https://www.linkedin.com/in/nam-ton-6766a2201/',
      icon: <Linkedin className="w-6 h-6" />,
      description: 'Let\'s connect'
    }
  ];

  return (
    <div 
      id="contact"
      className="relative flex justify-center items-center min-h-screen overflow-hidden"
    >
      <motion.div 
        className="flex flex-col items-center relative z-10 max-w-4xl mx-auto px-8"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={containerVariants}
      >
        {/* Title Section */}
        <motion.div 
          className="mb-16 text-center"
          variants={itemVariants}
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
            Get in Touch
          </h1>
          
          <motion.div
            className="h-[2px] bg-gradient-to-r from-transparent via-blue-400 to-transparent w-32 mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{
              duration: 0.8,
              delay: 0.3,
              ease: [0.215, 0.610, 0.355, 1.000]
            }}
          />
        </motion.div>

        {/* Contact Links */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full">
          {links.map((link, index) => (
            <motion.a
              key={link.name}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={itemVariants}
              className="group"
            >
              <div className="p-8 rounded-xl bg-blue-900/30 backdrop-blur-sm border border-white/10 hover:border-white/20 transition-colors flex flex-col items-center gap-4 relative">
                <div className="p-4 rounded-full bg-blue-800/50 group-hover:bg-blue-700/50 transition-colors">
                  {link.icon}
                </div>
                <div className="text-center">
                  <h3 className="text-xl font-semibold mb-2 group-hover:text-blue-300 transition-colors">
                    {link.name}
                  </h3>
                  <p className="text-gray-400 group-hover:text-gray-300 transition-colors">
                    {link.description}
                  </p>
                </div>
                <ExternalLink className="absolute top-4 right-4 w-4 h-4 opacity-0 group-hover:opacity-50 transition-opacity" />
              </div>
            </motion.a>
          ))}
        </div>

        {/* Footer Message */}
        <motion.p
          variants={itemVariants}
          className="mt-16 text-center text-gray-400 max-w-xl"
        >
          Whether you want to discuss a project, ask a question, or just say hi, 
          I'll try my best to get back to you as soon as possible!
        </motion.p>
      </motion.div>
    </div>
  );
};

export default ContactSection;