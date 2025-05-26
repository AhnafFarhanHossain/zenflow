import React from "react";

const Button = ({
  children,
  onClick,
  type = "button",
  variant = "primary",
  size = "md",
  disabled = false,
  className = "",
  ...props
}) => {
  const baseStyles =
    "inline-flex items-center justify-center font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 dark:focus:ring-offset-gray-800 transition-colors duration-150 ease-in-out";

  const variantStyles = {
    primary:
      "bg-blue-600 hover:bg-blue-700 focus:ring-blue-500 text-white dark:bg-blue-500 dark:hover:bg-blue-600 dark:focus:ring-blue-600",
    secondary:
      "bg-gray-200 hover:bg-gray-300 focus:ring-gray-400 text-gray-800 dark:bg-gray-700 dark:hover:bg-gray-600 dark:focus:ring-gray-500 dark:text-gray-100",
    danger:
      "bg-red-600 hover:bg-red-700 focus:ring-red-500 text-white dark:bg-red-500 dark:hover:bg-red-600 dark:focus:ring-red-600",
    outline:
      "border border-gray-300 hover:bg-gray-50 focus:ring-blue-500 text-gray-700 dark:border-gray-600 dark:hover:bg-gray-700 dark:focus:ring-blue-600 dark:text-gray-200",
    ghost:
      "hover:bg-gray-100 focus:ring-blue-500 text-gray-700 dark:hover:bg-gray-700 dark:focus:ring-blue-600 dark:text-gray-200",
  };
  const sizeStyles = {
    sm: "px-3 py-1.5 text-sm sm:text-xs",
    md: "px-4 py-2.5 sm:py-2 text-base sm:text-sm font-medium",
    lg: "px-6 py-3 sm:py-2.5 text-lg sm:text-base font-medium",
  };

  const disabledStyles = disabled ? "opacity-50 cursor-not-allowed" : "";

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${disabledStyles} ${className}`.trim()}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;
