import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

interface AnimatedThemeToggleProps {
  show: boolean;
  isDayTime: boolean;
  onToggle: () => void;
}

const AnimatedThemeToggle = ({ show = false, isDayTime, onToggle }: AnimatedThemeToggleProps) => {
  // Track if the component has faded in
  const [hasAppeared, setHasAppeared] = useState(false);

  useEffect(() => {
    if (show && !hasAppeared) {
      // Add a slight delay before starting the entry animation
      const timeout = setTimeout(() => {
        setHasAppeared(true);
      }, 800);
      return () => clearTimeout(timeout);
    }
  }, [show]);

  return (
    <AnimatePresence>
      {hasAppeared && (
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
            onClick={onToggle}
            className="p-3 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 hover:bg-white/20 transition-colors flex items-center gap-2 group"
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
                <Sun className="w-5 h-5 text-white" />
              </motion.div>
            </motion.div>
            <span className="text-white text-sm opacity-60 group-hover:opacity-100 transition-opacity">
              {isDayTime ? 'Dark Mode' : 'Light Mode'}
            </span>
          </motion.button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default AnimatedThemeToggle;