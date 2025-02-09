'use client';
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, X } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface Link {
  text: string;
  href: string;
  id: string;
  isLogo?: boolean;
}

const MinimalNav = () => {
  const [activeLink, setActiveLink] = useState('');  
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const { isDayTime } = useTheme();
  const isScrollingRef = useRef(false);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const links: Link[] = [
    { text: '尊 室', href: '/', id: 'logo', isLogo: true },
    { text: 'About', href: '#about', id: 'about' },
    { text: 'Experience', href: '#experience', id: 'experience' },
    { text: 'Projects', href: '#projects', id: 'projects' },
    { text: 'Contact', href: '#contact', id: 'contact' }
  ];

  useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleScrollSpy = () => {
    if (isScrollingRef.current) return;

    const sections = links.slice(1).map(link => 
      document.getElementById(link.id)
    );
    
    const scrollPosition = window.scrollY + 100; 
    const viewportHeight = window.innerHeight;
    
    if (scrollPosition < viewportHeight * 0.3) {
      setActiveLink('');
      return;
    }

    let currentSection = '';
    sections.forEach((section) => {
      if (section) {
        const sectionTop = section.offsetTop - 100;
        const sectionBottom = sectionTop + section.clientHeight;
        
        if (scrollPosition >= sectionTop && scrollPosition < sectionBottom) {
          currentSection = section.id;
        }
      }
    });
    
    setActiveLink(currentSection);
  };

  useEffect(() => {
    const scrollHandler = () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
      handleScrollSpy();
    };

    window.addEventListener('scroll', scrollHandler, { passive: true });
    handleScrollSpy();
    
    return () => {
      window.removeEventListener('scroll', scrollHandler);
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  const handleScroll = (e: React.MouseEvent<HTMLAnchorElement>, id: string): void => {
    e.preventDefault();
    setActiveLink(id);
    setIsOpen(false);

    const element = document.getElementById(id);
    if (element) {
      isScrollingRef.current = true;
      
      element.scrollIntoView({ 
        behavior: 'smooth',
        block: 'start'
      });

      setTimeout(() => {
        isScrollingRef.current = false;
        handleScrollSpy();
      }, 1000); 
    }
  };

  const handleLogoClick = (e: React.MouseEvent<HTMLAnchorElement>): void => {
    e.preventDefault();
    e.stopPropagation();  
    setActiveLink('');  
    setIsOpen(false);
    
    isScrollingRef.current = true;
    window.scrollTo({ top: 0, behavior: 'smooth' });
    
    setTimeout(() => {
      isScrollingRef.current = false;
      handleScrollSpy();
    }, 1000);
  };

  const getTextColorClasses = (isActive: boolean): string => {
    if (isDayTime) {
      return isActive ? 'text-gray-900' : 'text-gray-800 hover:text-gray-900';
    }
    return isActive ? 'text-white' : 'text-gray-400 hover:text-gray-200';
  };

  return (
    <AnimatePresence>
      {show && (
        <>
          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="fixed top-6 right-6 z-50 p-2 lg:hidden"
          >
            {isOpen ? (
              <X className={isDayTime ? 'text-gray-800' : 'text-white'} size={24} />
            ) : (
              <Menu className={isDayTime ? 'text-gray-800' : 'text-white'} size={24} />
            )}
          </button>

          {/* Desktop Navigation */}
          <motion.nav 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="fixed left-0 top-0 h-screen w-64 hidden lg:flex flex-col z-40"
          >
            <div className="pt-6 px-16">
              <motion.a
                href="/"
                onClick={handleLogoClick}
                className="block text-3xl font-medium tracking-wider text-[#CC2114] transition-colors duration-300 hover:opacity-80 cursor-pointer select-none relative z-50"
                style={{ 
                  fontFamily: 'Geist',
                  letterSpacing: '0.05em'
                }}
              >
                尊 室
              </motion.a>
            </div>

            <div className="flex-1 flex flex-col justify-center -mt-16">
              <div className="space-y-16 px-16">
                {links.slice(1).map((link) => (
                  <motion.div 
                    key={link.text}
                    animate={{ x: activeLink === link.id ? 20 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <a
                      href={link.href}
                      onClick={(e) => handleScroll(e, link.id)}
                      className={`block transition-colors duration-300 relative group
                        ${getTextColorClasses(activeLink === link.id)}
                        font-light text-3xl tracking-wide cursor-pointer select-none`}
                      style={{ 
                        fontFamily: 'Geist',
                        letterSpacing: '0.05em'
                      }}
                    >
                      {link.text}
                      <motion.span
                        className={`absolute -left-4 top-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full
                          ${isDayTime ? 'bg-gray-800' : 'bg-white'}`}
                        animate={{ opacity: activeLink === link.id ? 1 : 0 }}
                      />
                    </a>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.nav>

          {/* Mobile Navigation */}
          <AnimatePresence>
            {isOpen && (
              <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                className="fixed inset-0 bg-black bg-opacity-90 z-40 lg:hidden flex flex-col items-center justify-center"
              >
                <div className="space-y-8 text-center">
                  {links.map((link) => (
                    <motion.div
                      key={link.text}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: link.isLogo ? 0 : 0.1 * links.indexOf(link) }}
                    >
                      <a
                        href={link.href}
                        onClick={link.isLogo ? handleLogoClick : (e) => handleScroll(e, link.id)}
                        className={`block text-2xl cursor-pointer select-none ${
                          link.isLogo ? 'text-[#CC2114] mb-8' : 'text-white'
                        }`}
                      >
                        {link.text}
                      </a>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </>
      )}
    </AnimatePresence>
  );
};

export default MinimalNav;