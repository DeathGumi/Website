'use client';
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from './ThemeProvider';

const MinimalNav = () => {
  const [activeLink, setActiveLink] = useState('about');
  const [show, setShow] = useState(false);
  const { isDayTime } = useTheme();  

  const links = [
    { text: '尊 室', href: '/', id: 'logo', isLogo: true },
    { text: 'About', href: '#about', id: 'about' },
    { text: 'Experience', href: '#experience', id: 'experience' },
    { text: 'Contact', href: '#contact', id: 'contact' }
  ];

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 3000); 
    return () => clearTimeout(timer);
  }, []);


  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
    e.preventDefault();
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });
      setActiveLink(id);
    }
  };

  React.useEffect(() => {
    const handleScrollSpy = () => {
      const sections = links.slice(1).map(link => 
        document.getElementById(link.id)
      );
      
      const scrollPosition = window.scrollY + 100;

      sections.forEach((section) => {
        if (section) {
          const sectionTop = section.offsetTop;
          const sectionHeight = section.clientHeight;
          
          if (scrollPosition >= sectionTop && 
              scrollPosition < sectionTop + sectionHeight) {
            setActiveLink(section.id);
          }
        }
      });
    };

    window.addEventListener('scroll', handleScrollSpy);
    return () => window.removeEventListener('scroll', handleScrollSpy);
  }, []);

  const getTextColorClasses = (isActive: boolean) => {
    if (isDayTime) {
      return isActive ? 'text-gray-800' : 'text-gray-600 hover:text-gray-800';
    }
    return isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200';
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.nav 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.6,
            ease: [0.215, 0.610, 0.355, 1.000]
          }}
          className="fixed left-0 top-0 h-screen w-64 flex flex-col z-50"
        >
          {/* Logo Section */}
          <div className="pt-16 px-16">
            <motion.div className="relative">
              <a
                href="/"
                onClick={(e) => {
                  e.preventDefault();
                  window.scrollTo({ top: 0, behavior: 'smooth' });
                }}
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
                    onClick={(e) => handleScroll(e, link.id)}
                    className={`block transition-colors duration-300 relative group
                      ${getTextColorClasses(activeLink === link.id)}
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
        </motion.nav>
      )}
    </AnimatePresence>
  );
};

export default MinimalNav;