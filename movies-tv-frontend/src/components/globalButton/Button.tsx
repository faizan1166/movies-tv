import React from 'react';
import './Button.css'
interface ButtonProps {
  children: React.ReactNode;
  onClick?:  (e: React.MouseEvent<HTMLButtonElement>) => void; 
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
  icon?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  size = 'md',
  disabled = false,
  className = '',
  icon,
}) => {

  const variantStyles = {
    primary: 'shine-button button-purple',
    secondary: 'shine-button button-chrome',
    danger: 'shine-button button-fire',
    ghost: 'bg-transparent hover:bg-white/10 text-white border border-white/20 hover:border-white/30',
  };

  const sizeStyles = {
    sm: 'px-3 py-1.5 text-sm gap-1.5',
    md: 'px-4 py-2 text-base gap-2',
    lg: 'px-6 py-3 text-lg gap-2.5',
  };

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={` h-full inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
};

export default Button;