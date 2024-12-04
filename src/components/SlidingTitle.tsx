import { motion } from 'framer-motion';

interface SlidingTitleProps {
  show: boolean;
  onAnimationComplete: () => void;
}

const SlidingTitle = ({ show, onAnimationComplete }: SlidingTitleProps) => {
  const words = [
    { text: "Designer", className: "text-white" },
    { text: "&", className: "text-gray-400" },
    { text: "Developer", className: "text-[#CC2114]" }
  ];

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={show ? { opacity: 1 } : {}}
      onAnimationComplete={onAnimationComplete}
      className="mt-8 relative" 
    >
      <div className="flex items-center gap-3">
        {words.map((word, index) => (
          <motion.span
            key={word.text}
            initial={{ opacity: 0, y: 20 }}
            animate={show ? {
              opacity: 1,
              y: 0,
            } : {}}
            transition={{
              duration: 0.6,
              delay: index * 0.2,
              ease: [0.215, 0.610, 0.355, 1.000], // Cubic bezier for smooth fade
            }}
            className={`text-2xl font-light tracking-wider ${word.className}`}
            style={{ fontFamily: 'Optima, Candara, sans-serif' }}
          >
            {word.text}
          </motion.span>
        ))}
      </div>
      
      {/* Animated underline */}
      <motion.div
        initial={{ scaleX: 0 }}
        animate={show ? { scaleX: 1 } : {}}
        transition={{
          duration: 0.8,
          delay: 0.9,
          ease: [0.215, 0.610, 0.355, 1.000]
        }}
        className="absolute -bottom-2 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-gray-500 to-transparent"
        style={{ transformOrigin: 'left' }}
      />
    </motion.div>
  );
};

export default SlidingTitle;