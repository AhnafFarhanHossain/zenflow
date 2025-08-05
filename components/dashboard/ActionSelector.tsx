"use client";

import { Calendar, CheckSquare, X } from "lucide-react";

const ActionSelector = ({
  selectedDate,
  onClose,
  onCreateTask,
  onCreateSchedule,
  position = null,
}) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString("en-US", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <div
      className="fixed inset-0 z-40 bg-black/50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg p-6 min-w-80 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
              Create Event
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
              {formatDate(selectedDate)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
          >
            <X className="w-5 h-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        {/* Action Options */}
        <div className="space-y-3">
          <button
            onClick={onCreateTask}
            className="w-full flex items-center gap-3 p-4 bg-blue-50 border border-blue-200 dark:bg-blue-900/20 dark:border-blue-800/30 rounded-lg hover:bg-blue-100 dark:hover:bg-blue-900/30 transition-colors group"
          >
            <div className="p-2 bg-blue-100 dark:bg-blue-900/50 rounded-lg">
              <CheckSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Create Task
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Add a task with due date and priority
              </p>
            </div>
          </button>

          <button
            onClick={onCreateSchedule}
            className="w-full flex items-center gap-3 p-4 bg-green-50 border border-green-200 dark:bg-green-900/20 dark:border-green-800/30 rounded-lg hover:bg-green-100 dark:hover:bg-green-900/30 transition-colors group"
          >
            <div className="p-2 bg-green-100 dark:bg-green-900/50 rounded-lg">
              <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
            </div>
            <div className="text-left">
              <h4 className="text-sm font-medium text-gray-900 dark:text-gray-100">
                Schedule Event
              </h4>
              <p className="text-xs text-gray-600 dark:text-gray-400">
                Mark an important date or event
              </p>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ActionSelector;
