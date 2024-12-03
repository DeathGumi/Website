'use client';
import { motion, AnimatePresence } from 'framer-motion';
import { useEffect, useState } from 'react';
import ScrollIndicator from './ScrollIndicator';

const NameAnimation = () => {
  const [letters, setLetters] = useState<string[]>(Array(6).fill(''));
  const [isComplete, setIsComplete] = useState<boolean>(false);
  
  const multilingualChars: string[] = [
    // Vietnamese
    'Ă', 'Â', 'Đ', 'Ê', 'Ô', 'Ơ', 'Ư', 'Ị', 'Ạ', 'Ỉ',
    // Japanese (Katakana & Hiragana)
    'ナ', 'マ', 'ア', 'ム', 'ン', 'の', 'て', 'む', 'な', 'み',
    // Chinese
    '米', '南', '北', '東', '西', '中', '外', '内', '上', '下',
    // Korean
    '나', '머', '아', '모', '누', '네', '미', '마', '무', '노',
    // Thai
    'ก', 'ข', 'ค', 'ง', 'จ', 'ฉ', 'ช', 'ซ', 'ฌ', 'ญ'
  ];

  const namLetters: string[] = ['N', 'A', 'M'];
  const tonLetters: string[] = ['T', 'O', 'N'];
  const totalDuration: number = 2000; // 2 seconds
  
  useEffect(() => {
    // Single interval for cycling all letters
    const cycleInterval = setInterval(() => {
      if (!isComplete) {
        setLetters(current => 
          current.map(() => multilingualChars[
            Math.floor(Math.random() * multilingualChars.length)
          ])
        );
      }
    }, 50); // Cycle speed

    // Set final state after 2 seconds
    const finalTimeout = setTimeout(() => {
      setIsComplete(true);
      setLetters([...namLetters, ...tonLetters]);
      clearInterval(cycleInterval);
    }, totalDuration);

    return () => {
      clearInterval(cycleInterval);
      clearTimeout(finalTimeout);
    };
  }, []);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800 relative">
      <div className="flex gap-8"> 
        {/* NAM - vertical, white */}
        <div className="flex flex-col gap-4">
          {letters.slice(0, 3).map((letter, index) => (
            <AnimatePresence mode="wait" key={`nam-${index}`}>
              <motion.div
                key={`${letter}-nam-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  scale: isComplete ? 1.2 : 1,
                }}
                transition={{ 
                  duration: 0.15,
                  scale: { 
                    duration: 0.3,
                    type: "spring",
                    stiffness: 200
                  }
                }}
                style={{
                  fontFamily: 'Optima, Candara, sans-serif',
                  fontWeight: 700,  
                  letterSpacing: '0.01em'
                }}
                className="text-8xl text-center w-24 h-24 flex items-center justify-center text-white"
              >
                {letter || ' '}
              </motion.div>
            </AnimatePresence>
          ))}
        </div>

        {/* TON - vertical, red */}
        <div className="flex flex-col gap-4">
          {letters.slice(3).map((letter, index) => (
            <AnimatePresence mode="wait" key={`ton-${index}`}>
              <motion.div
                key={`${letter}-ton-${index}`}
                initial={{ opacity: 0, x: -20 }}
                animate={{ 
                  opacity: 1, 
                  x: 0,
                  scale: isComplete ? 1.2 : 1,
                }}
                transition={{ 
                  duration: 0.15,
                  scale: { 
                    duration: 0.3,
                    type: "spring",
                    stiffness: 200
                  }
                }}
                style={{
                  fontFamily: 'Optima, Candara, sans-serif',
                  fontWeight: 700,  
                  letterSpacing: '0.01em'
                }}
                className="text-8xl text-center w-24 h-24 flex items-center justify-center text-[#CC2114]"
              >
                {letter || ' '}
              </motion.div>
            </AnimatePresence>
          ))}
        </div>
      </div>
      <ScrollIndicator show={isComplete} />
    </div>
  );
};

export default NameAnimation;