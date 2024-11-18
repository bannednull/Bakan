'use client';

import { useRef } from 'react';
import { motion, useInView } from 'framer-motion';

function ScrollAnimate({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 100 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 100 }}
      transition={{ duration: 1 }}
    >
      {children}
    </motion.div>
  );
}

export default ScrollAnimate;
