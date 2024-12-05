import { useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion';

const ParallaxBackground = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const springConfig = { damping: 25, stiffness: 150 };
  const x = useSpring(mouseX, springConfig);
  const y = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { clientX, clientY } = e;
      const centerX = window.innerWidth / 2;
      const centerY = window.innerHeight / 2;
      
      mouseX.set((clientX - centerX) / centerX);
      mouseY.set((clientY - centerY) / centerY);
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden">
      {/* Container with scale to prevent edge showing */}
      <div className="absolute inset-[-10%] scale-[1.2]">
        {/* Sky gradient background */}
        <motion.div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(180deg, #2C5282 0%, #4299E1 100%)',
            x: useTransform(x, [-1, 1], [-5, 5]),
            y: useTransform(y, [-1, 1], [-5, 5])
          }}
        />

        {/* Sun */}
        <motion.div
          className="absolute inset-0"
          style={{
            x: useTransform(x, [-1, 1], [-10, 10]),
            y: useTransform(y, [-1, 1], [-10, 10])
          }}
        >
          <svg viewBox="0 0 800 600" className="w-full h-full opacity-30">
            <defs>
              <radialGradient id="sunGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#FDB813" stopOpacity="0.7" />
                <stop offset="100%" stopColor="#FDB813" stopOpacity="0" />
              </radialGradient>
            </defs>
            <circle cx="400" cy="250" r="80" fill="url(#sunGlow)" />
            <circle cx="400" cy="250" r="40" fill="#FDB813" opacity="0.8" />
          </svg>
        </motion.div>

        {/* Far mountains */}
        <motion.div
          className="absolute inset-0"
          style={{
            x: useTransform(x, [-1, 1], [-20, 20]),
            y: useTransform(y, [-1, 1], [-5, 5])
          }}
        >
          <svg viewBox="0 0 800 600" className="w-full h-full opacity-30">
            <path
              d="M-100 600 L200 280 L400 450 L600 300 L900 600 Z"
              fill="#1A365D"
            />
          </svg>
        </motion.div>

        {/* Mid mountains */}
        <motion.div
          className="absolute inset-0"
          style={{
            x: useTransform(x, [-1, 1], [-35, 35]),
            y: useTransform(y, [-1, 1], [-10, 10])
          }}
        >
          <svg viewBox="0 0 800 600" className="w-full h-full opacity-30">
            <path
              d="M-200 600 L100 350 L300 450 L500 320 L700 400 L1000 600 Z"
              fill="#2A4365"
            />
          </svg>
        </motion.div>

        {/* Close mountains */}
        <motion.div
          className="absolute inset-0"
          style={{
            x: useTransform(x, [-1, 1], [-50, 50]),
            y: useTransform(y, [-1, 1], [-15, 15])
          }}
        >
          <svg viewBox="0 0 800 600" className="w-full h-full opacity-30">
            <path
              d="M-300 600 L0 380 L200 480 L400 350 L600 450 L1100 600 Z"
              fill="#2C5282"
            />
          </svg>
        </motion.div>

        {/* Clouds */}
        {[...Array(5)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute inset-0"
            style={{
              x: useTransform(x, [-1, 1], [-40 - i * 10, 40 + i * 10]),
              y: useTransform(y, [-1, 1], [-10 - i * 2, 10 + i * 2])
            }}
          >
            <svg viewBox="0 0 800 600" className="w-full h-full opacity-10">
              <path
                d={`M${200 + i * 100} ${150 + i * 30} q30 -40 60 0t60 0t60 0t60 0t60 0t60 0`}
                fill="white"
              />
            </svg>
          </motion.div>
        ))}
      </div>
    </div>
  );
};

export default ParallaxBackground;