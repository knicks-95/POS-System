import React from 'react';

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  error?: string;
  fullWidth?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  error,
  fullWidth = false,
  className = '',
  id,
  ...props
}) => {
  const inputId = id || label?.toLowerCase().replace(/\s+/g, '-');
  
  const baseClasses = 'rounded-md border border-slate-300 py-2 px-3 text-slate-900 focus:outline-none focus:ring-2 focus:ring-red-800 focus:border-transparent';
  const errorClasses = error ? 'border-red-500 focus:ring-red-500' : '';
  const widthClass = fullWidth ? 'w-full' : '';
  
  const allClasses = `
    ${baseClasses}
    ${errorClasses}
    ${widthClass}
    ${className}
  `;
  
  return (
    <div className={`${fullWidth ? 'w-full' : ''} mb-4`}>
      {label && (
        <label 
          htmlFor={inputId}
          className="block text-sm font-medium text-slate-700 mb-1"
        >
          {label}
        </label>
      )}
      <input
        id={inputId}
        className={allClasses}
        {...props}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600">{error}</p>
      )}
    </div>
  );
};

export default Input;