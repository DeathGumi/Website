'use client';
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const MinimalNav = () => {
  const [activeLink, setActiveLink] = useState('about');
  const { isDayTime } = useTheme();

  const links = [
    { text: '尊 室', href: '/', id: 'logo', isLogo: true },
    { text: 'About', href: '#about', id: 'about' },
    { text: 'Experience', href: '#experience', id: 'experience' },
    { text: 'Contact', href: '#contact', id: 'contact' } // Add later when creating contact page
  ];

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 p-12 flex flex-col z-50">
      <div className="space-y-8">
        {links.map((link) => (
          <motion.div 
            key={link.text} 
            className="relative"
            animate={{ 
              x: !link.isLogo && activeLink === link.id ? 20 : 0 
            }}
            transition={{ 
              duration: 0.3,
              ease: [0.215, 0.610, 0.355, 1.000]
            }}
          >
            <a
              href={link.href}
              onClick={() => !link.isLogo && setActiveLink(link.id)}
              className={`block transition-colors duration-300
                ${link.isLogo ? 'text-[#CC2114] mb-16 text-2xl font-medium tracking-wide' : 'text-xl tracking-wide'}
                ${activeLink === link.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
                font-light`}
              style={{ fontFamily: 'Geist' }}
            >
              {link.text}
            </a>
          </motion.div>
        ))}
      </div>
    </nav>
  );
};

export default MinimalNav;