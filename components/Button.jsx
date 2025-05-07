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
      "bg-[#15803d] text-white hover:bg-[#15803d]/90 border border-[#15803d] hover:border-[#15803d]/80 hover:shadow-lg hover:shadow-[#15803d]/20",
    secondary:
      "bg-white text-gray-700 hover:text-gray-900 border border-gray-200 hover:border-gray-300 hover:shadow-md",
    outline:
      "bg-transparent text-[#15803d] border border-[#15803d] hover:bg-[#15803d]/5",
    ghost:
      "bg-transparent text-white border border-white/30 hover:border-white/50 hover:bg-white/10 hover:shadow-lg hover:shadow-black/5",
    white:
      "bg-white text-[#15803d] hover:bg-gray-50 hover:shadow-lg hover:shadow-white/10",
  };

  // Define size variants
  const sizeStyles = {
    sm: "px-4 py-2 text-sm",
    md: "px-5 py-2.5 text-base",
    lg: "px-6 py-3.5 text-base",
  };

  // Compose the classes
  const buttonClasses = `
    inline-flex items-center justify-center 
    font-medium rounded-lg 
    transition-all duration-200 
    ${baseStyles[variant]} 
    ${sizeStyles[size]} 
    ${
      variant !== "ghost" && variant !== "outline"
        ? "hover:-translate-y-0.5"
        : ""
    }
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
