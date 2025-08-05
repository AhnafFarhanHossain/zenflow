"use client";

import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const Calendar = ({ onDateSelect, markedDates = [], selectedDate = null }) => {
  const [currentMonth, setCurrentMonth] = useState(new Date());

  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }

    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }

    return days;
  };

  const isToday = (date) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date) => {
    if (!date || !selectedDate) return false;
    return date.toDateString() === new Date(selectedDate).toDateString();
  };
  const isMarked = (date) => {
    if (!date) return false;
    // Fix timezone issue by using local date formatting
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    return markedDates.some((markedDate) => {
      const markedDateObj = new Date(markedDate.date || markedDate.due_date);
      const markedYear = markedDateObj.getFullYear();
      const markedMonth = String(markedDateObj.getMonth() + 1).padStart(2, "0");
      const markedDay = String(markedDateObj.getDate()).padStart(2, "0");
      const markedDateStr = `${markedYear}-${markedMonth}-${markedDay}`;
      return markedDateStr === dateStr;
    });
  };
  const getMarkedData = (date) => {
    if (!date) return null;
    // Fix timezone issue by using local date formatting
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    const dateStr = `${year}-${month}-${day}`;

    return markedDates.filter((markedDate) => {
      const markedDateObj = new Date(markedDate.date || markedDate.due_date);
      const markedYear = markedDateObj.getFullYear();
      const markedMonth = String(markedDateObj.getMonth() + 1).padStart(2, "0");
      const markedDay = String(markedDateObj.getDate()).padStart(2, "0");
      const markedDateStr = `${markedYear}-${markedMonth}-${markedDay}`;
      return markedDateStr === dateStr;
    });
  };

  const handleDateClick = (date) => {
    if (!date) return;
    const today = new Date();
    today.setHours(0, 0, 0, 0); // Reset time part to avoid time-based comparison issues
    if (date < today) {
      // Don't allow selection of past dates
      return;
    }
    onDateSelect(date);
  };

  const goToPreviousMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1)
    );
  };

  const goToNextMonth = () => {
    setCurrentMonth(
      (prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1)
    );
  };

  const goToToday = () => {
    setCurrentMonth(new Date());
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="w-full">
      {/* Calendar Header */}
      <div className="mb-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
            {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
          </h3>
          <div className="flex items-center gap-2">
            <button
              onClick={goToToday}
              className="px-3 py-1 text-sm bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300 rounded-md hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors"
            >
              Today
            </button>
            <div className="flex items-center gap-1">
              <button
                onClick={goToPreviousMonth}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
              <button
                onClick={goToNextMonth}
                className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-600 dark:text-gray-400" />
              </button>
            </div>
          </div>
        </div>

        {/* Days of week header */}
        <div className="grid grid-cols-7 gap-1 mb-2">
          {daysOfWeek.map((day) => (
            <div key={day} className="p-2 text-center">
              <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                {day}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Calendar Grid */}
      <div className="grid grid-cols-7 gap-1">
        {days.map((date, index) => {
          if (!date) {
            return <div key={index} className="p-2"></div>;
          }

          const markedData = getMarkedData(date);
          const hasEvents = markedData && markedData.length > 0;
          const taskCount = markedData
            ? markedData.filter((item) => item.type === "task" || item.due_date)
                .length
            : 0;
          const scheduleCount = markedData
            ? markedData.filter((item) => item.type === "schedule" || item.date)
                .length
            : 0;

          return (
            <button
              key={index}
              onClick={() => handleDateClick(date)}
              className={`
                relative p-2 min-h-[40px] text-sm rounded-md transition-all duration-200
                hover:bg-gray-100 dark:hover:bg-gray-800
                ${
                  isToday(date)
                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400 font-semibold"
                    : ""
                }
                ${
                  isSelected(date)
                    ? "ring-2 ring-blue-500 bg-blue-50 dark:bg-blue-900/20"
                    : ""
                }
                ${
                  date.getMonth() !== currentMonth.getMonth()
                    ? "text-gray-400 dark:text-gray-600"
                    : "text-gray-900 dark:text-gray-100"
                }
                ${date < new Date().setHours(0, 0, 0, 0)
                    ? "cursor-not-allowed opacity-50"
                    : ""}
              `}
            >
              <span className="block">{date.getDate()}</span>

              {/* Event indicators */}
              {hasEvents && (
                <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 flex gap-1">
                  {taskCount > 0 && (
                    <div className="w-1.5 h-1.5 bg-blue-500 rounded-full"></div>
                  )}
                  {scheduleCount > 0 && (
                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full"></div>
                  )}
                </div>
              )}
            </button>
          );
        })}
      </div>
    </div>
  );
};

export default Calendar;
