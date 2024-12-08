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
    { text: 'Contact', href: '#contact', id: 'contact' }
  ];

  return (
    <nav className="fixed left-0 top-0 h-screen w-64 flex flex-col z-50">
      {/* Logo Section */}
      <div className="pt-16 px-16">
        <motion.div className="relative">
          <a
            href="/"
            className="block text-3xl font-medium tracking-wider text-[#CC2114] transition-colors duration-300 hover:opacity-80"
            style={{ 
              fontFamily: 'Geist',
              letterSpacing: '0.05em'
            }}
          >
            {links[0].text}
          </a>
        </motion.div>
      </div>

      {/* Navigation Links */}
      <div className="flex-1 flex flex-col justify-center -mt-16">
        <div className="space-y-16 px-16">
          {links.slice(1).map((link) => (
            <motion.div 
              key={link.text} 
              className="relative"
              animate={{ 
                x: activeLink === link.id ? 20 : 0 
              }}
              transition={{ 
                duration: 0.3,
                ease: [0.215, 0.610, 0.355, 1.000]
              }}
            >
              <a
                href={link.href}
                onClick={() => setActiveLink(link.id)}
                className={`block transition-colors duration-300 relative group
                  ${activeLink === link.id ? 'text-white' : 'text-gray-500 hover:text-gray-300'}
                  font-light text-3xl tracking-wide`}
                style={{ 
                  fontFamily: 'Geist',
                  letterSpacing: '0.05em'
                }}
              >
                {link.text}
                <motion.span
                  className={`absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full transition-opacity duration-300
                    ${isDayTime ? 'bg-gray-800' : 'bg-white'}`}
                  animate={{
                    opacity: activeLink === link.id ? 1 : 0
                  }}
                />
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default MinimalNav;