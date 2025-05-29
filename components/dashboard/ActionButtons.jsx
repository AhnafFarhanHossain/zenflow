"use client";

import { Bell, HelpCircle, Plus } from "lucide-react";
import { useState, useEffect, useRef } from "react";

export const NotificationBell = ({
  className = "",
  upcomingTasks = [],
  ...props
}) => {
  const [isPanelOpen, setIsPanelOpen] = useState(false);
  const panelRef = useRef(null);

  // Close panel when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (panelRef.current && !panelRef.current.contains(event.target)) {
        setIsPanelOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={panelRef}>
      <button
        onClick={() => setIsPanelOpen(!isPanelOpen)}
        className={`relative p-2 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors cursor-pointer ${className}`}
        aria-label="Notifications"
        {...props}
      >
        {" "}
        <Bell className="w-5 h-5 text-gray-600 dark:text-gray-300" />{" "}
        {upcomingTasks.length > 0 && (
          <span className="absolute top-1 right-1 flex items-center justify-center w-4 h-4 sm:w-4 sm:h-4 text-[10px] sm:text-xs font-bold text-white bg-red-500 dark:bg-red-600 rounded-full">
            {upcomingTasks.length}
          </span>
        )}
      </button>
      {isPanelOpen && (
        <div className="absolute right-0 mt-2 w-72 sm:w-80 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-md shadow-lg z-50">
          <div className="p-4">
            <h3 className="text-sm font-medium text-gray-900 dark:text-white mb-3">
              Upcoming Task Reminders
            </h3>
            {upcomingTasks.length > 0 ? (
              <ul className="space-y-2.5 max-h-60 overflow-y-auto pr-2">
                {upcomingTasks.map((task) => (
                  <li
                    key={task.id}
                    className="text-xs text-gray-700 dark:text-gray-300 border-b border-gray-200 dark:border-gray-600 pb-2 last:border-b-0 last:pb-0"
                  >
                    <p className="font-semibold text-gray-800 dark:text-gray-100 truncate mb-0.5">
                      {task.title}
                    </p>
                    <p className="text-red-600 dark:text-red-400 font-medium">
                      Due:{" "}
                      {new Date(task.due_date).toLocaleTimeString([], {
                        hour: "2-digit",
                        minute: "2-digit",
                      })}{" "}
                      -{" "}
                      {new Date(task.due_date).toLocaleDateString([], {
                        month: "short",
                        day: "numeric",
                      })}
                    </p>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-xs text-gray-600 dark:text-gray-300">
                No upcoming tasks due soon.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
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
    "flex items-center gap-1.5 px-3 py-2 text-sm sm:text-base lg:text-sm font-medium rounded-md transition-colors min-h-[40px] sm:min-h-[36px]";
  const variants = {
    primary:
      "bg-gray-900 text-white hover:bg-gray-800 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-white",
    secondary:
      "bg-white text-gray-700 border border-gray-300 hover:bg-gray-50 dark:bg-gray-800 dark:text-gray-200 dark:border-gray-600 dark:hover:bg-gray-700",
    danger:
      "bg-none text-red-400 border border-red-400 hover:bg-red-950 transition dark:text-red-500 dark:border-red-500 dark:hover:bg-red-950",
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
