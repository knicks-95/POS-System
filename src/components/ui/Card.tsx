import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
  hoverEffect?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  onClick,
  hoverEffect = false,
  padding = 'md',
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-4',
    lg: 'p-6',
  };
  
  const baseClasses = 'bg-white rounded-lg shadow-sm border border-slate-200';
  const hoverClasses = hoverEffect 
    ? 'cursor-pointer transition-shadow hover:shadow-md' 
    : '';
  
  const allClasses = `
    ${baseClasses}
    ${paddingClasses[padding]}
    ${hoverClasses}
    ${className}
  `;
  
  if (onClick) {
    return (
      <motion.div
        className={allClasses}
        onClick={onClick}
        whileHover={hoverEffect ? { scale: 1.02 } : {}}
        whileTap={hoverEffect ? { scale: 0.98 } : {}}
      >
        {children}
      </motion.div>
    );
  }
  
  return <div className={allClasses}>{children}</div>;
};

export default Card;