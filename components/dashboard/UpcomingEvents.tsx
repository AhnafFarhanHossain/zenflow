"use client";

import {
  Calendar,
  CheckSquare,
  Clock,
  Trash2,
  AlertCircle,
  Check,
  Edit3,
  X,
} from "lucide-react";

const UpcomingEvents = ({
  tasks = [],
  schedules = [],
  onClearSchedules,
  onClearTasks,
  onTaskComplete,
  onDeleteTask,
  onDeleteSchedule,
  onEditTask,
  onEditSchedule,
}) => {
  const formatDate = (date) => {
    const eventDate = new Date(date);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    if (eventDate.toDateString() === today.toDateString()) {
      return "Today";
    } else if (eventDate.toDateString() === tomorrow.toDateString()) {
      return "Tomorrow";
    } else {
      return eventDate.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year:
          eventDate.getFullYear() !== today.getFullYear()
            ? "numeric"
            : undefined,
      });
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "Extreme":
        return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
      case "Medium":
        return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
      default:
        return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
    }
  };

  const getTaskStatusColor = (task) => {
    if (task.status === "done") return "text-green-600 dark:text-green-400";
    if (new Date(task.due_date) < new Date() && task.status !== "done")
      return "text-red-600 dark:text-red-400";
    if (task.status === "in-progress")
      return "text-blue-600 dark:text-blue-400";
    return "text-gray-600 dark:text-gray-400";
  };

  // Sort tasks and schedules by date
  const sortedTasks = [...tasks]
    .filter(task => new Date(task.due_date) >= new Date() || task.status === "done")
    .sort((a, b) => new Date(a.due_date) - new Date(b.due_date))
    .slice(0, 8);
  const sortedSchedules = [...schedules]
    .filter(schedule => new Date(schedule.date) >= new Date())
    .sort((a, b) => new Date(a.date) - new Date(b.date))
    .slice(0, 8);

  return (
    <div className="space-y-6">
      {/* Tasks Section */}
      <div className="bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <CheckSquare className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Upcoming Tasks
              </h3>
            </div>
            {tasks.length > 0 && onClearTasks && (
              <button
                onClick={onClearTasks}
                className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                title="Clear all tasks"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {tasks.length} total tasks
          </p>
        </div>

        <div className="p-4">
          {sortedTasks.length === 0 ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-3">
                <CheckSquare className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No tasks yet
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Create tasks to see them here
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {sortedTasks.map((task, index) => {
                const isOverdue =
                  new Date(task.due_date) < new Date() &&
                  task.status !== "done";
                return (
                  <div
                    key={`task-${task.id}-${index}`}
                    className={`p-3 rounded-lg border transition-colors ${
                      task.status === "done"
                        ? "bg-green-50 border-green-200 dark:bg-green-900/10 dark:border-green-800/30"
                        : isOverdue
                        ? "bg-red-50 border-red-200 dark:bg-red-900/10 dark:border-red-800/30"
                        : "bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700"
                    }`}
                  >
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-2 flex-1">
                        <button
                          onClick={() =>
                            onTaskComplete &&
                            onTaskComplete(task.id, task.status !== "done")
                          }
                          className={`p-1.5 rounded-md transition-colors mt-0.5 ${
                            task.status === "done"
                              ? "bg-green-100 dark:bg-green-900/30 hover:bg-green-200 dark:hover:bg-green-900/50"
                              : "bg-blue-100 dark:bg-blue-900/30 hover:bg-blue-200 dark:hover:bg-blue-900/50"
                          }`}
                          title={
                            task.status === "done"
                              ? "Mark as incomplete"
                              : "Mark as complete"
                          }
                        >
                          {task.status === "done" ? (
                            <Check className="w-3 h-3 text-green-600 dark:text-green-400" />
                          ) : (
                            <CheckSquare className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                          )}
                        </button>

                        <div className="flex-1 min-w-0">
                          <h4
                            className={`font-medium text-sm truncate ${
                              task.status === "done"
                                ? "text-gray-500 dark:text-gray-400 line-through"
                                : "text-gray-900 dark:text-gray-100"
                            }`}
                          >
                            {task.title}
                          </h4>
                          <div className="flex items-center gap-2 mt-1">
                            <span
                              className={`text-xs ${getTaskStatusColor(task)}`}
                            >
                              {formatDate(task.due_date)}
                            </span>
                            {isOverdue && task.status !== "done" && (
                              <AlertCircle className="w-3 h-3 text-red-500" />
                            )}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-1 ml-2">
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(
                            task.priority
                          )}`}
                        >
                          {task.priority}
                        </span>

                        <div className="flex items-center gap-1 ml-2">
                          <button
                            onClick={() => onEditTask && onEditTask(task)}
                            className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                            title="Edit task"
                          >
                            <Edit3 className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() =>
                              onDeleteTask && onDeleteTask(task.id)
                            }
                            className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                            title="Delete task"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </div>

      {/* Schedules Section */}
      <div className="bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:border-gray-700">
        <div className="p-4 border-b border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Calendar className="w-5 h-5 text-green-600 dark:text-green-400" />
              <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Upcoming Events
              </h3>
            </div>
            {schedules.length > 0 && onClearSchedules && (
              <button
                onClick={onClearSchedules}
                className="p-1.5 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                title="Clear all schedules"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
            {schedules.length} marked dates
          </p>
        </div>

        <div className="p-4">
          {sortedSchedules.length === 0 ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center mx-auto mb-3">
                <Calendar className="w-6 h-6 text-gray-400" />
              </div>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                No events scheduled
              </p>
              <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                Mark important dates to see them here
              </p>
            </div>
          ) : (
            <div className="space-y-3 max-h-80 overflow-y-auto">
              {sortedSchedules.map((schedule, index) => (
                <div
                  key={`schedule-${schedule.id}-${index}`}
                  className="p-3 rounded-lg border bg-gray-50 border-gray-200 dark:bg-gray-800/50 dark:border-gray-700 transition-colors"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-start gap-2 flex-1">
                      <div className="p-1.5 rounded-md bg-green-100 dark:bg-green-900/30 mt-0.5">
                        <Calendar className="w-3 h-3 text-green-600 dark:text-green-400" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h4 className="font-medium text-sm text-gray-900 dark:text-gray-100 truncate">
                          {schedule.title}
                        </h4>
                        <p className="text-xs text-gray-600 dark:text-gray-400 mt-1">
                          {formatDate(schedule.date)}
                        </p>
                        {schedule.description && (
                          <p className="text-xs text-gray-500 dark:text-gray-500 mt-1 truncate">
                            {schedule.description}
                          </p>
                        )}
                      </div>
                    </div>

                    <div className="flex items-center gap-1 ml-2">
                      <button
                        onClick={() =>
                          onEditSchedule && onEditSchedule(schedule)
                        }
                        className="p-1 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
                        title="Edit event"
                      >
                        <Edit3 className="w-3 h-3" />
                      </button>
                      <button
                        onClick={() =>
                          onDeleteSchedule && onDeleteSchedule(schedule.id)
                        }
                        className="p-1 text-gray-400 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                        title="Delete event"
                      >
                        <X className="w-3 h-3" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
