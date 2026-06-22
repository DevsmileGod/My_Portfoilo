'use client';

import React from 'react';
import { motion, useReducedMotion } from 'motion';

interface RevealOnScrollProps {
  children: React.ReactNode;
  className?: string;
  style?: React.CSSProperties;
}

export default function RevealOnScroll({
  children,
  className,
  style,
}: RevealOnScrollProps) {
  const shouldReduce = useReducedMotion();

  if (shouldReduce) {
    return (
      <div className={className} style={style}>
        {children}
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.35, easing: [0.0, 0.0, 0.2, 1.0] }}
      className={className}
      style={style}
    >
      {children}
    </motion.div>
  );
}
