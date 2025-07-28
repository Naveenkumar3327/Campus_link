import React from 'react';
import { motion } from 'framer-motion';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', hover = true }) => {
  return (
    <motion.div
      whileHover={hover ? { scale: 1.02, y: -5 } : {}}
      transition={{ type: 'spring', stiffness: 300, damping: 30 }}
      className={`
        bg-white/20 backdrop-blur-lg rounded-2xl border border-white/30 
        shadow-xl shadow-purple-200/20 hover:shadow-2xl hover:shadow-purple-300/30
        transition-all duration-300 ${className}
      `}
    >
      {children}
    </motion.div>
  );
};

export default GlassCard;