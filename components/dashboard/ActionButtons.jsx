"use client";

import { Bell, HelpCircle, Plus } from "lucide-react";
import { useState } from "react";

export const NotificationBell = ({ className = "", ...props }) => {
  const [count, setCount] = useState(3); // Just a dummy value for demonstration
  return (
    <button
      className={`relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer ${className}`}
      aria-label="Notifications"
      {...props}
    >
      {" "}
      <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />{" "}
      {count > 0 && (
        <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 text-xs md:text-[10px] font-bold text-white bg-red-500 dark:bg-red-600 rounded-full">
          {count}
        </span>
      )}
    </button>
  );
};

export const HelpButton = ({ className = "", ...props }) => {
  return (
    <button
      className={`p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer ${className}`}
      aria-label="Help"
      {...props}
    >
      <HelpCircle className="w-5 h-5 text-gray-600 dark:text-gray-300" />
    </button>
  );
};

export const ActionButton = ({
  children,
  variant = "primary",
  icon,
  onClick,
  className = "",
  ...props
}) => {
  const baseClasses =
    "flex items-center gap-1.5 px-3 py-1.5 text-sm md:text-base font-medium rounded-md transition-colors";
  const variants = {
    primary:
      "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white",
    secondary:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700",
  };

  return (
    <button
      onClick={onClick}
      className={`${baseClasses} ${variants[variant]} ${className} cursor-pointer`}
      {...props}
    >
      {icon && icon}
      {children}
    </button>
  );
};
