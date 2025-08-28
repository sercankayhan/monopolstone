import React from 'react';
import { motion } from 'framer-motion';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: 'none' | 'sm' | 'md' | 'lg';
  shadow?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  rounded?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  border?: boolean;
  onClick?: () => void;
  as?: React.ElementType;
}

const Card: React.FC<CardProps> = ({
  children,
  className = '',
  hover = false,
  padding = 'md',
  shadow = 'md',
  rounded = 'lg',
  border = true,
  onClick,
  as: Component = 'div',
}) => {
  const paddingClasses = {
    none: '',
    sm: 'p-3',
    md: 'p-6',
    lg: 'p-8',
  };

  const shadowClasses = {
    none: '',
    sm: 'shadow-sm',
    md: 'shadow-md',
    lg: 'shadow-lg',
    xl: 'shadow-xl',
  };

  const roundedClasses = {
    none: '',
    sm: 'rounded-sm',
    md: 'rounded-md',
    lg: 'rounded-lg',
    xl: 'rounded-xl',
  };

  const baseClasses = `
    bg-white transition-all duration-200
    ${paddingClasses[padding]}
    ${shadowClasses[shadow]}
    ${roundedClasses[rounded]}
    ${border ? 'border border-gray-200' : ''}
    ${onClick ? 'cursor-pointer' : ''}
    ${hover ? 'hover:shadow-lg hover:-translate-y-1' : ''}
    ${className}
  `;

  if (hover && onClick) {
    return (
      <motion.div
        className={baseClasses}
        onClick={onClick}
        whileHover={{ y: -4, boxShadow: '0 10px 25px -3px rgba(0, 0, 0, 0.1)' }}
        whileTap={{ y: -2 }}
        transition={{ type: 'spring', stiffness: 400, damping: 17 }}
      >
        {children}
      </motion.div>
    );
  }

  return (
    <Component className={baseClasses} onClick={onClick}>
      {children}
    </Component>
  );
};

export default Card;