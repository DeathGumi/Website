import { motion } from 'framer-motion';

interface SlidingTitleProps {
  show: boolean;
  onAnimationComplete: () => void;
}

const SlidingTitle = ({ show, onAnimationComplete }: SlidingTitleProps) => {
  return (
    <motion.div 
      initial={{ x: '100vw', opacity: 0 }}
      animate={show ? { 
        x: 0, 
        opacity: 1,
        transition: {
          type: "spring",
          stiffness: 150,  // Increased stiffness for more bounce
          damping: 12,     // Reduced damping for more bounce
          mass: 1,         // Added mass for better bounce physics
          delay: 0.5
        }
      } : {}}
      onAnimationComplete={onAnimationComplete}
      className="mt-8 bg-gray-800/50 backdrop-blur-sm px-6 py-3 rounded-lg" 
    >
      <motion.h2 
        className="text-2xl font-light tracking-wider" 
        style={{ fontFamily: 'Optima, Candara, sans-serif' }}
      >
        <span className="text-white">Designer</span>
        <span className="text-gray-400 mx-2">&</span> 
        <span className="text-[#CC2114]">Developer</span>
      </motion.h2>
    </motion.div>
  );
};

export default SlidingTitle;