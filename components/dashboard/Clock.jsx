"use client";

import { useState, useEffect } from "react";

export const Clock = ({ className = "" }) => {
  const [time, setTime] = useState(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    setTime(new Date());

    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format time as HH:MM:SS with 12-hour format
  const formattedTime =
    time?.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: true,
    }) || "00:00:00 AM";
  // Only show the clock after mounting to prevent hydration mismatch
  if (!mounted) {
    return (
      <div
        className={`text-sm md:text-base font-medium text-gray-600 dark:text-gray-300 ${className}`}
      ></div>
    );
  }

  return (
    <div
      className={`text-sm md:text-base font-medium text-gray-600 dark:text-gray-300 ${className}`}
    >
      {formattedTime}
    </div>
  );
};
