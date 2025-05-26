"use client";

import Link from "next/link";

const Button = ({
  href,
  variant = "primary",
  size = "md",
  className = "",
  children,
  onClick,
  ...props
}) => {
  // Define base styles based on variant
  const baseStyles = {
    primary:
      "bg-black text-white hover:bg-gray-900 border border-black hover:border-gray-900 dark:bg-black dark:text-white dark:hover:bg-gray-900 dark:border-black dark:hover:border-gray-900",
    secondary:
      "bg-white text-gray-900 hover:bg-gray-50 border border-gray-300 hover:border-gray-400 dark:bg-gray-800 dark:text-gray-100 dark:hover:bg-gray-700 dark:border-gray-600 dark:hover:border-gray-500",
    outline:
      "bg-transparent text-black border border-black hover:bg-black/5 dark:text-white dark:border-white dark:hover:bg-white/10",
    ghost:
      "bg-transparent text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-gray-400 dark:hover:text-gray-100 dark:hover:bg-gray-800",
    white:
      "bg-white text-gray-900 hover:bg-gray-50 border border-gray-200 hover:border-gray-300 dark:bg-gray-900 dark:text-gray-100 dark:hover:bg-gray-800 dark:border-gray-700 dark:hover:border-gray-600",
  };

  // Define size variants
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-sm",
    lg: "px-6 py-3 text-base",
  };

  // Compose the classes
  const buttonClasses = `
    inline-flex items-center justify-center 
    font-medium rounded-md 
    transition-all duration-200 
    focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2
    dark:focus:ring-blue-400 dark:focus:ring-offset-gray-900
    disabled:opacity-50 disabled:cursor-not-allowed
    ${baseStyles[variant]} 
    ${sizeStyles[size]} 
    ${className}
  `;

  // If href is provided, render as Link
  if (href) {
    return (
      <Link href={href} className={buttonClasses} {...props}>
        {children}
      </Link>
    );
  }

  // Otherwise render as button
  return (
    <button className={buttonClasses} onClick={onClick} {...props}>
      {children}
    </button>
  );
};

export default Button;
