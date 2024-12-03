import { motion } from 'framer-motion';
import { ArrowDown } from 'lucide-react';

const ScrollIndicator = ({ show = false }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: show ? 1 : 0 }}
      transition={{ 
        duration: 1.5,    
        delay: 0.5       
      }}
      className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex flex-col items-center gap-2"
    >
      <motion.p 
        className="text-gray-400 text-sm"
        animate={{ y: [0, 4, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        Scroll Down
      </motion.p>
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 1.5, repeat: Infinity }}
      >
        <ArrowDown className="text-gray-400 w-6 h-6" />
      </motion.div>
    </motion.div>
  );
};

export default ScrollIndicator;