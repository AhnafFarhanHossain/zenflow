"use client";

import { useState, useEffect } from "react";
import { ActionButton } from "@/components/dashboard/ActionButtons";
import { Plus, Trash2 } from "lucide-react"; // Added Trash2 import
import { getTasks } from "@/utils/getTasks";
import TaskForm from "@/components/dashboard/Taskform";
import { supabase } from "@/utils/supabase"; // Added Supabase client import
import { toast } from "sonner"; // Added toast import
import { updateTaskStatus } from "@/utils/updateTaskStatus"; // Added import

const Tasks = () => {
  const [sorting, setSorting] = useState({ field: "title", direction: "asc" });
  const [filters, setFilters] = useState({ status: "all", priority: "all" });
  const [showForm, setShowForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTasks = async () => {
      setLoading(true);
      try {
        const fetchedTasks = await getTasks();
        const processedTasks = (fetchedTasks || []).map((task) => {
          const priorityValue =
            task.priority &&
            ["high", "medium", "low"].includes(
              String(task.priority).toLowerCase()
            )
              ? String(task.priority).toLowerCase()
              : "low"; // Default to 'low'

          // Ensure status has a default value if undefined/null
          const currentStatus = task.status || "todo";

          return {
            ...task,
            // Derive completed directly from status
            completed: currentStatus === "done",
            status: currentStatus,
            priority: priorityValue,
          };
        });
        setTasks(processedTasks);
      } catch (error) {
        console.error("Error fetching tasks:", error);
        setTasks([]); // Set to empty array on error to avoid undefined issues
      } finally {
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const handleToggleComplete = async (taskId) => {
    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) {
      toast.error("Task not found.");
      return;
    }

    // Call the utility function to update task status
    const { data, error } = await updateTaskStatus(
      supabase,
      taskId,
      taskToUpdate.status
    );

    if (error) {
      // Error handling is largely done within updateTaskStatus,
      // but you can add component-specific error handling here if needed.
      return;
    }

    if (data) {
      // Update local state with the confirmed data from Supabase
      setTasks((currentTasks) =>
        currentTasks.map((task) =>
          task.id === taskId
            ? {
                ...task,
                status: data.status, // Update status from response
                completed: data.status === "done", // Re-derive completed
                // Ensure priority is preserved or defaulted if not in `data`
                priority: data.priority || taskToUpdate.priority || "low",
              }
            : task
        )
      );
      // toast.success("Task status updated!"); // Optional: Consider if needed, as util might show toast
    }
  };

  const filteredAndSortedTasks = tasks
    .filter((task) => {
      const statusMatch =
        filters.status === "all" ||
        (filters.status === "done" && task.status === "done") ||
        (filters.status === "todo" && task.status === "todo") ||
        (filters.status === "in-progress" && task.status === "in-progress");
      const priorityMatch =
        filters.priority === "all" || task.priority === filters.priority;
      return statusMatch && priorityMatch;
    })
    .sort((a, b) => {
      if (sorting.field) {
        let fieldA = a[sorting.field];
        let fieldB = b[sorting.field];

        if (sorting.field === "dueDate") {
          fieldA = a.due_date ? new Date(a.due_date) : new Date(0); // Handle null/undefined due dates
          fieldB = b.due_date ? new Date(b.due_date) : new Date(0);
        }

        if (fieldA < fieldB) {
          return sorting.direction === "asc" ? -1 : 1;
        }
        if (fieldA > fieldB) {
          return sorting.direction === "asc" ? 1 : -1;
        }
      }
      return 0;
    });

  return (
    <div className="w-full">
      <div className="mb-6">
        <h1 className="font-bold text-2xl md:text-3xl mb-1">Tasks</h1>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
          Organize and track your daily work
        </p>
      </div>

      {/* Task Management Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <select
              className="h-9 appearance-none bg-transparent border border-gray-200 dark:border-gray-700 rounded-md py-1 pl-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer dark:bg-gray-900 dark:text-gray-100"
              style={{ fontFamily: "var(--font-chakra)" }}
              value={filters.status}
              onChange={(e) =>
                setFilters({ ...filters, status: e.target.value })
              }
            >
              <option value="all">All Status</option>
              <option value="todo">To-Do</option>
              <option value="in-progress">In Progress</option>
              <option value="done">Done</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>

          <div className="relative">
            <select
              className="h-9 appearance-none bg-transparent border border-gray-200 dark:border-gray-700 rounded-md py-1 pl-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 cursor-pointer dark:bg-gray-900 dark:text-gray-100"
              style={{ fontFamily: "var(--font-chakra)" }}
              value={filters.priority}
              onChange={(e) =>
                setFilters({ ...filters, priority: e.target.value })
              }
            >
              <option value="all">Priority</option>
              <option value="high">Extreme</option>{" "}
              {/* Changed from High to Extreme */}
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-500">
              <svg
                className="w-4 h-4"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                  d="M19 9l-7 7-7-7"
                ></path>
              </svg>
            </div>
          </div>
        </div>

        <ActionButton
          variant="primary"
          icon={<Plus className="w-4 h-4" />}
          className="hidden sm:flex"
          onClick={() => setShowForm(true)}
        >
          New Task
        </ActionButton>
        <button
          className="sm:hidden p-2 bg-blue-600 hover:bg-blue-700 dark:bg-blue-600 dark:hover:bg-blue-700 text-white rounded-full shadow-sm"
          onClick={() => setShowForm(true)}
          aria-label="New Task"
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>

      {/* Task Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-60 z-40 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-xl w-full max-w-xl relative overflow-hidden border border-gray-200 dark:border-gray-700">
            <TaskForm
              onClose={() => setShowForm(false)}
              handleClose={() => setShowForm(false)}
            />
          </div>
        </div>
      )}

      {/* Tasks Table */}
      <div className="bg-transparent rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead className="bg-gray-50 dark:bg-gray-700/50">
              <tr>
                <th scope="col" className="w-12 px-4 py-3">
                  {" "}
                  {/* Added width for checkbox column */}
                  {/* Empty header for checkbox column or a general icon if preferred */}
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                >
                  <div
                    className="flex items-center gap-1.5 cursor-pointer"
                    onClick={() =>
                      setSorting({
                        field: "title",
                        direction:
                          sorting.field === "title" &&
                          sorting.direction === "asc"
                            ? "desc"
                            : "asc",
                      })
                    }
                  >
                    Title
                    {sorting.field === "title" && (
                      <svg
                        className={`w-3.5 h-3.5 ${
                          sorting.direction === "asc"
                            ? ""
                            : "transform rotate-180"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 15l7-7 7 7"
                        ></path>
                      </svg>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                >
                  Priority
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider hidden md:table-cell"
                >
                  <div
                    className="flex items-center gap-1.5 cursor-pointer"
                    onClick={() =>
                      setSorting({
                        field: "dueDate", // Ensure this matches the data field, e.g., 'due_date'
                        direction:
                          sorting.field === "dueDate" &&
                          sorting.direction === "asc"
                            ? "desc"
                            : "asc",
                      })
                    }
                  >
                    Due Date
                    {sorting.field === "dueDate" && (
                      <svg
                        className={`w-3.5 h-3.5 ${
                          sorting.direction === "asc"
                            ? ""
                            : "transform rotate-180"
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M5 15l7-7 7 7"
                        ></path>
                      </svg>
                    )}
                  </div>
                </th>
                <th
                  scope="col"
                  className="px-4 py-3 text-left text-xs font-semibold text-gray-600 dark:text-gray-300 uppercase tracking-wider"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-4 py-8 text-center">
                    {" "}
                    {/* Adjusted colSpan */}
                    <div className="flex flex-col items-center justify-center">
                      <div className="animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-gray-300 dark:border-gray-600 mb-2"></div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm">
                        Loading tasks...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredAndSortedTasks.length > 0 ? (
                filteredAndSortedTasks.map((task) => (
                  <tr
                    key={task.id}
                    className="hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors duration-150"
                  >
                    <td className="px-4 py-3 whitespace-nowrap">
                      <input
                        type="checkbox"
                        checked={task.status === "done"} // Bind to task.status
                        onChange={() => handleToggleComplete(task.id)}
                        className="h-4 w-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:focus:ring-blue-600 dark:focus:ring-offset-gray-800 cursor-pointer"
                      />
                    </td>
                    <td
                      className={`px-4 py-3 text-sm whitespace-nowrap font-medium ${
                        task.status === "done" // Use task.status for styling
                          ? "line-through text-gray-400 dark:text-gray-500"
                          : "text-gray-900 dark:text-gray-100"
                      }`}
                    >
                      {task.title}
                    </td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 ${
                          task.status === "done" // Use task.status for badge styling
                            ? "bg-green-100 text-green-800 dark:bg-green-700 dark:text-green-100"
                            : task.status === "in-progress"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-700 dark:text-blue-100"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-600 dark:text-gray-300" // To-Do or other statuses
                        }`}
                      >
                        {task.status === "done" // Use task.status for badge text
                          ? "Done"
                          : task.status === "in-progress"
                          ? "In Progress"
                          : "To-Do"}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap">
                      <span
                        className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium leading-4 capitalize ${
                          task.priority === "high"
                            ? "bg-red-100 text-red-700 dark:bg-red-600/40 dark:text-red-200"
                            : task.priority === "medium"
                            ? "bg-yellow-100 text-yellow-700 dark:bg-yellow-600/40 dark:text-yellow-200"
                            : "bg-green-100 text-green-700 dark:bg-green-600/40 dark:text-green-200"
                        }`}
                      >
                        {task.priority === "high"
                          ? "Extreme"
                          : task.priority === "medium"
                          ? "Medium"
                          : "Low"}
                        {/* Adjusted display text */}
                      </span>
                    </td>
                    <td className="px-4 py-3 text-sm text-gray-500 dark:text-gray-400 whitespace-nowrap hidden md:table-cell">
                      {task.due_date
                        ? new Date(task.due_date).toLocaleDateString()
                        : "N/A"}
                    </td>
                    <td className="px-4 py-3 text-sm whitespace-nowrap text-right">
                      {" "}
                      {/* Adjusted for right alignment */}
                      <button
                        // onClick={() => handleDelete(task.id)} // Functionality to be added later
                        className="text-red-500 hover:text-red-700 dark:text-red-400 dark:hover:text-red-500 p-1 rounded-md hover:bg-red-100 dark:hover:bg-red-900/30 transition-colors cursor-pointer"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center">
                    {" "}
                    {/* Adjusted colSpan */}
                    <div className="flex flex-col items-center justify-center py-10 px-4">
                      <svg
                        className="w-12 h-12 text-gray-300 dark:text-gray-600 mb-3"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 01-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 011.5.124m7.5 10.376h3.375c.621 0 1.125-.504 1.125-1.125V11.25c0-4.46-3.243-8.161-7.5-8.876a9.06 9.06 0 00-1.5-.124H9.375c-.621 0-1.125.504-1.125 1.125v3.5m7.5 10.375H9.375a1.125 1.125 0 01-1.125-1.125v-9.25m12 6.625v-1.875a3.375 3.375 0 00-3.375-3.375h-1.5a1.125 1.125 0 01-1.125-1.125v-1.5a3.375 3.375 0 00-3.375-3.375H9.75"
                        ></path>
                      </svg>
                      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium mb-1">
                        No tasks yet
                      </p>
                      <p className="text-gray-400 dark:text-gray-500 text-xs text-center max-w-xs">
                        Create your first task to start organizing your work
                      </p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-xs">
        <div className="text-gray-500 dark:text-gray-400">
          <span className="font-medium">{filteredAndSortedTasks.length}</span>{" "}
          tasks
        </div>
        <div className="flex items-center gap-1">
          <button
            className="px-2 py-1 bg-transparent border border-gray-200 dark:border-gray-700 rounded text-gray-400 dark:text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={tasks.length === 0}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <button
            className="px-2 py-1 bg-transparent border border-gray-200 dark:border-gray-700 rounded text-gray-400 dark:text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled={tasks.length === 0}
          >
            <svg
              className="w-3.5 h-3.5"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M9 5l7 7-7 7"
              ></path>
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tasks;
