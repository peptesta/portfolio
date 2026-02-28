'use client';

import { motion, AnimatePresence } from 'framer-motion';
import { usePathname } from 'next/navigation';

export default function Template({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={pathname}
        initial={{ opacity: 0, y: 80, scale: 0.95, filter: 'blur(10px)' }}
        animate={{ 
          opacity: 1, 
          y: 0, 
          scale: 1, 
          filter: 'blur(0px)',
          transition: {
            duration: 0.6,
            ease: [0.22, 1, 0.36, 1],
            opacity: { duration: 0.4 },
            y: { duration: 0.6 },
            scale: { duration: 0.5 },
            filter: { duration: 0.4 },
          }
        }}
        exit={{ 
          opacity: 0, 
          y: -60, 
          scale: 0.98, 
          filter: 'blur(8px)',
          transition: {
            duration: 0.35,
            ease: [0.33, 0, 0.67, 0],
          }
        }}
        style={{
          willChange: 'transform, opacity, filter',
        }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}