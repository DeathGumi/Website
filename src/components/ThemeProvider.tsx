'use client';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

// Define the context type
type ThemeContextType = {
  isDayTime: boolean;
  toggleTheme: () => void;
};

// Create theme context with the type
const ThemeContext = createContext<ThemeContextType>({
  isDayTime: true,
  toggleTheme: () => {},
});

// Custom hook for using theme
export const useTheme = () => useContext(ThemeContext);

// Define props type for ThemeProvider
interface ThemeProviderProps {
  children: ReactNode;
}

// Theme provider component with typed props
export default function ThemeProvider({ children }: ThemeProviderProps) {
  const [isDayTime, setIsDayTime] = useState(true);
  const [show, setShow] = useState(false);
  
  const toggleTheme = () => setIsDayTime(prev => !prev);

  React.useEffect(() => {
    const timer = setTimeout(() => {
      setShow(true);
    }, 3000); 
    
    return () => clearTimeout(timer);
  }, []);

  return (
    <ThemeContext.Provider value={{ isDayTime, toggleTheme }}>
      {children}
      <AnimatePresence>
        {show && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{
              duration: 0.6,
              ease: [0.215, 0.610, 0.355, 1.000]
            }}
            className="fixed top-0 right-0 p-4 z-50"
          >
            <motion.button
              onClick={toggleTheme}
              className={`p-3 rounded-full backdrop-blur-sm border transition-colors flex items-center gap-2 group
                ${isDayTime 
                  ? 'bg-gray-800/90 border-gray-700 hover:bg-gray-800/95' 
                  : 'bg-white/10 border-white/20 hover:bg-white/20'}`}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.div
                initial={false}
                animate={{ rotate: isDayTime ? 0 : 180 }}
                transition={{ duration: 0.6 }}
                className="relative w-5 h-5"
              >
                <motion.div
                  animate={{ opacity: isDayTime ? 1 : 0 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Moon className="w-5 h-5 text-white" />
                </motion.div>
                <motion.div
                  animate={{ opacity: isDayTime ? 0 : 1 }}
                  transition={{ duration: 0.3 }}
                  className="absolute inset-0"
                >
                  <Sun className="w-5 h-5 text-yellow-400" />
                </motion.div>
              </motion.div>
              <span className="text-white text-sm opacity-60 group-hover:opacity-100 transition-opacity">
                {isDayTime ? 'Dark Mode' : 'Light Mode'}
              </span>
            </motion.button>
          </motion.div>
        )}
      </AnimatePresence>
    </ThemeContext.Provider>
  );
}