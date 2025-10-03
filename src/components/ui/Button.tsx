import React from 'react';
import { motion } from 'framer-motion';

type ButtonVariant = 'primary' | 'secondary' | 'danger' | 'success' | 'outline' | 'ghost';
type ButtonSize = 'sm' | 'md' | 'lg';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: ButtonVariant;
  size?: ButtonSize;
  fullWidth?: boolean;
  icon?: React.ReactNode;
  isLoading?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  icon,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses = 'rounded-md font-medium focus:outline-none transition-colors duration-200 flex items-center justify-center gap-2';
  
  const variantClasses: Record<ButtonVariant, string> = {
    primary: 'bg-red-900 text-white hover:bg-red-800 active:bg-red-950',
    secondary: 'bg-amber-600 text-white hover:bg-amber-500 active:bg-amber-700',
    danger: 'bg-red-600 text-white hover:bg-red-500 active:bg-red-700',
    success: 'bg-emerald-600 text-white hover:bg-emerald-500 active:bg-emerald-700',
    outline: 'border border-slate-300 text-slate-700 hover:bg-slate-100 active:bg-slate-200',
    ghost: 'text-slate-700 hover:bg-slate-100 active:bg-slate-200',
  };
  
  const sizeClasses: Record<ButtonSize, string> = {
    sm: 'text-sm py-1 px-3',
    md: 'text-base py-2 px-4',
    lg: 'text-lg py-3 px-6',
  };
  
  const disabledClasses = 'opacity-50 cursor-not-allowed';
  const widthClass = fullWidth ? 'w-full' : '';
  
  const allClasses = `
    ${baseClasses}
    ${variantClasses[variant]}
    ${sizeClasses[size]}
    ${disabled || isLoading ? disabledClasses : ''}
    ${widthClass}
    ${className}
  `;
  
  return (
    <motion.button
      className={allClasses}
      disabled={disabled || isLoading}
      whileTap={{ scale: disabled || isLoading ? 1 : 0.97 }}
      {...props}
    >
      {isLoading && (
        <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-current" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
        </svg>
      )}
      {icon && !isLoading && icon}
      {children}
    </motion.button>
  );
};

export default Button;