"use client";

import { useState, useEffect } from "react";
import { ActionButton } from "@/components/dashboard/ActionButtons";
import { Plus, Trash2, Trash } from "lucide-react"; // Added Trash2 and Trash import
import { getTasks } from "@/utils/getTasks";
import { toast } from "sonner";
import { updateTaskStatus } from "@/utils/updateTaskStatus";
import { deleteTask } from "@/utils/deleteTask"; // Import deleteTask
import { useUser, useAuth } from "@clerk/nextjs";
import { useTaskForm } from "@/contexts/TaskFormContext";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import { deleteAllTasks } from "@/utils/deleteAllTasks";
import SearchBar from "@/components/Searchbar";

const Tasks = () => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const { openTaskForm } = useTaskForm();
  const { refreshAnalytics } = useAnalytics();
  const [sorting, setSorting] = useState({ field: "title", direction: "asc" });
  const [filters, setFilters] = useState({ status: "all", priority: "all" });
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (query) => {
    setSearchQuery(query);
  };
  const fetchTasks = async () => {
    if (!user?.id) {
      console.log("No user ID available");
      setTasks([]);
      setLoading(false);
      return;
    }

    setLoading(true);
    try {
      console.log("Fetching tasks for user:", user.id);
      const fetchedTasks = await getTasks(getToken, user.id);
      const processedTasks = (fetchedTasks || []).map((task) => {
        const priorityString = String(task.priority || "").trim(); // Trim once
        let priorityValue = "Easy"; // Default to 'Easy'

        if (priorityString === "Extreme") {
          priorityValue = "Extreme";
        } else if (priorityString === "Medium") {
          priorityValue = "Medium";
        } else if (priorityString === "Easy") {
          priorityValue = "Easy";
        }

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
      setSearchQuery(""); // Reset search when fetching new tasks
    } catch (error) {
      console.error("Error fetching tasks:", error);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (isLoaded && user?.id) {
      fetchTasks();
    } else if (isLoaded && !user) {
      setLoading(false);
      setTasks([]);
    }
  }, [user?.id, isLoaded]);

  const handleTaskCreated = (newTask) => {
    // Refresh tasks after task creation
    if (user?.id) {
      fetchTasks();
      refreshAnalytics(); // Refresh analytics when task is created
    }
  };

  const handleToggleComplete = async (taskId) => {
    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    const taskToUpdate = tasks.find((task) => task.id === taskId);
    if (!taskToUpdate) {
      toast.error("Task not found.");
      return;
    } // Call the utility function to update task status
    const { data, error } = await updateTaskStatus(
      getToken,
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
                priority: data.priority || taskToUpdate.priority || "Easy",
              }
            : task
        )
      );
      // toast.success("Task status updated!"); // Optional: Consider if needed, as util might show toast
      refreshAnalytics(); // Refresh analytics when task status is updated
    }
  };
  const handleDeleteTask = async (taskId) => {
    // Optimistically update UI or show a confirmation dialog first (optional)
    // For example, you could set a temporary state to indicate deletion

    const { error } = await deleteTask(getToken, taskId);

    if (error) {
      // Error toast is handled in deleteTask, but you can add more specific UI updates here
      // For example, re-enable a delete button if it was disabled
    } else {
      // Remove the task from the local state to update the UI
      setTasks((currentTasks) =>
        currentTasks.filter((task) => task.id !== taskId)
      );
      toast.success("Task deleted successfully!");
      refreshAnalytics(); // Refresh analytics when task is deleted
    }
  };

  const handleDeleteAllTasks = async () => {
    if (!user?.id) {
      toast.error("User not authenticated");
      return;
    }

    // Show confirmation dialog
    if (
      !window.confirm(
        "Are you sure you want to delete all tasks? This action cannot be undone."
      )
    ) {
      return;
    }

    const { error } = await deleteAllTasks(getToken);

    if (error) {
      // Error toast is handled in deleteAllTasks function
    } else {
      // Clear all tasks from local state
      setTasks([]);
      refreshAnalytics(); // Refresh analytics when all tasks are deleted
    }
  };
  const filteredAndSortedTasks = tasks
    .filter((task) => {
      // Search filter
      const matchesSearch =
        searchQuery === "" ||
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        (task.description &&
          task.description.toLowerCase().includes(searchQuery.toLowerCase()));

      // Status filter
      const statusMatch =
        filters.status === "all" ||
        (filters.status === "done" && task.status === "done") ||
        (filters.status === "todo" && task.status === "todo") ||
        (filters.status === "in-progress" && task.status === "in-progress");

      // Priority filter
      const priorityMatch =
        filters.priority === "all" || task.priority === filters.priority;

      return matchesSearch && statusMatch && priorityMatch;
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
        <h1 className="font-bold text-2xl md:text-3xl mb-1 text-gray-900 dark:text-white">
          Tasks
        </h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          Organize and track your daily work
        </p>
      </div>
      {/* Task Management Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        <div className="flex flex-wrap items-center gap-2">
          <div className="relative">
            <select
              className="h-9 appearance-none bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md py-1 pl-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-gray-500 cursor-pointer text-gray-900 dark:text-gray-100"
              style={{ fontFamily: "var(--font-baiJamjuree)" }}
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
              className="h-9 appearance-none bg-white dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-md py-1 pl-2 pr-8 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 dark:focus:ring-gray-500 cursor-pointer text-gray-900 dark:text-gray-100"
              style={{ fontFamily: "var(--font-baiJamjuree)" }}
              value={filters.priority}
              onChange={(e) =>
                setFilters({ ...filters, priority: e.target.value })
              }
            >
              {" "}
              <option value="all">Priority</option>
              <option value="Extreme">Extreme</option>
              <option value="Medium">Medium</option>
              <option value="Easy">Easy</option>
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
        </div>{" "}
        <div className="flex gap-4">
          <SearchBar
            placeholder={"Search through your tasks..."}
            onSearch={handleSearch}
          />
          <ActionButton
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            className="hidden sm:flex"
            onClick={() => openTaskForm(handleTaskCreated)}
          >
            New Task
          </ActionButton>
          {tasks.length > 0 && (
            <ActionButton
              variant="danger"
              icon={<Trash className="w-4 h-4" />}
              className="hidden sm:flex"
              onClick={handleDeleteAllTasks}
            >
              Delete All Tasks
            </ActionButton>
          )}{" "}
        </div>
        <div className="flex gap-2 sm:hidden">
          <button
            className="p-2 bg-gray-900 hover:bg-gray-800 dark:bg-gray-800 dark:hover:bg-gray-700 text-white shadow-sm border border-gray-700 dark:border-gray-600 rounded-md"
            onClick={() => openTaskForm(handleTaskCreated)}
            aria-label="New Task"
          >
            <Plus className="w-4 h-4" />
          </button>
          {tasks.length > 0 && (
            <button
              className="p-2 bg-red-600 hover:bg-red-700 dark:bg-red-600 dark:hover:bg-red-700 text-white shadow-sm border border-red-500 dark:border-red-500 rounded-md"
              onClick={handleDeleteAllTasks}
              aria-label="Delete All Tasks"
            >
              <Trash className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
      {/* Tasks Table */}
      <div className="bg-white dark:bg-gray-900 shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden rounded-lg">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="border-b border-gray-200 dark:border-gray-700">
                <th scope="col" className="w-12 px-6 py-4">
                  {/* Empty header for checkbox column */}
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
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
                    Task
                    {sorting.field === "title" && (
                      <svg
                        className={`w-4 h-4 transition-transform ${
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
                  className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-200 hidden sm:table-cell"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-200 hidden lg:table-cell"
                >
                  Priority
                </th>
                <th
                  scope="col"
                  className="px-6 py-4 text-left text-sm font-medium text-gray-700 dark:text-gray-200 hidden xl:table-cell"
                >
                  <div
                    className="flex items-center gap-2 cursor-pointer hover:text-gray-900 dark:hover:text-white transition-colors"
                    onClick={() =>
                      setSorting({
                        field: "dueDate",
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
                        className={`w-4 h-4 transition-transform ${
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
                  className="px-6 py-4 text-right text-sm font-medium text-gray-700 dark:text-gray-200"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center">
                    <div className="flex flex-col items-center justify-center">
                      <div className="animate-spin rounded-full h-10 w-10 border-2 border-gray-200 border-t-blue-500 dark:border-gray-700 dark:border-t-blue-400 mb-4"></div>
                      <p className="text-gray-500 dark:text-gray-400 text-sm font-medium">
                        Loading tasks...
                      </p>
                    </div>
                  </td>
                </tr>
              ) : filteredAndSortedTasks.length > 0 ? (
                filteredAndSortedTasks.map((task, index) => (
                  <tr
                    key={task.id}
                    className="group hover:bg-gray-50 dark:hover:bg-gray-800 transition-all duration-200 border-b border-gray-200 dark:border-gray-700 last:border-b-0"
                  >
                    <td className="px-6 py-4">
                      <input
                        type="checkbox"
                        checked={task.status === "done"}
                        onChange={() => handleToggleComplete(task.id)}
                        className="h-5 w-5 text-blue-600 border-2 border-gray-300 bg-white rounded focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 dark:border-gray-500 dark:bg-gray-900 dark:focus:ring-blue-400 cursor-pointer transition-all"
                      />
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex flex-col gap-1">
                        <span
                          className={`text-sm font-medium transition-all ${
                            task.status === "done"
                              ? "line-through text-gray-500 dark:text-gray-500"
                              : "text-gray-900 dark:text-gray-100"
                          }`}
                        >
                          {task.title}
                        </span>
                        {/* Mobile-only status and priority */}
                        <div className="flex items-center gap-2 sm:hidden">
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium ${
                              task.status === "done"
                                ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400"
                                : task.status === "in-progress"
                                ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400"
                                : "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300"
                            }`}
                          >
                            {task.status === "done"
                              ? "Done"
                              : task.status === "in-progress"
                              ? "In Progress"
                              : "To-Do"}
                          </span>{" "}
                          <span
                            className={`inline-flex items-center px-2 py-1 rounded-md text-xs font-medium lg:hidden ${
                              task.priority === "Extreme"
                                ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400"
                                : task.priority === "Medium"
                                ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400"
                                : "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400"
                            }`}
                          >
                            {task.priority === "Extreme"
                              ? "Extreme"
                              : task.priority === "Medium"
                              ? "Medium"
                              : "Easy"}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 hidden sm:table-cell">
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                          task.status === "done"
                            ? "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400"
                            : task.status === "in-progress"
                            ? "bg-blue-100 text-blue-800 dark:bg-blue-900/50 dark:text-blue-400"
                            : "bg-gray-100 text-gray-800 dark:bg-gray-800/50 dark:text-gray-300"
                        }`}
                      >
                        {task.status === "done"
                          ? "Done"
                          : task.status === "in-progress"
                          ? "In Progress"
                          : "To-Do"}
                      </span>
                    </td>
                    <td className="px-6 py-4 hidden lg:table-cell">
                      {" "}
                      <span
                        className={`inline-flex items-center px-3 py-1 rounded-md text-sm font-medium ${
                          task.priority === "Extreme"
                            ? "bg-red-100 text-red-800 dark:bg-red-900/50 dark:text-red-400"
                            : task.priority === "Medium"
                            ? "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-400"
                            : "bg-green-100 text-green-800 dark:bg-green-900/50 dark:text-green-400"
                        }`}
                      >
                        {task.priority === "Extreme"
                          ? "Extreme"
                          : task.priority === "Medium"
                          ? "Medium"
                          : "Easy"}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 hidden xl:table-cell">
                      {task.due_date
                        ? new Date(task.due_date).toLocaleDateString("en-US", {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })
                        : "No due date"}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => handleDeleteTask(task.id)}
                        className="inline-flex items-center justify-center w-8 h-8 text-gray-500 hover:text-red-400 hover:bg-red-900/20 dark:hover:bg-red-900/30 transition-all duration-200 group-hover:opacity-100 opacity-60 border border-gray-700 hover:border-red-600"
                        title="Delete task"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="text-center py-16">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-16 h-16 bg-gray-800 dark:bg-gray-900 flex items-center justify-center mb-4">
                        <svg
                          className="w-8 h-8 text-gray-500 dark:text-gray-600"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="1.5"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h4.125M8.25 8.25l13.5 0"
                          ></path>
                        </svg>
                      </div>
                      <h3 className="text-lg font-medium text-gray-200 dark:text-gray-100 mb-2">
                        No tasks yet
                      </h3>
                      <p className="text-gray-400 dark:text-gray-500 text-sm max-w-sm text-center mb-6">
                        Create your first task to start organizing your work and
                        boost your productivity.
                      </p>
                      <ActionButton
                        onClick={() => openTaskForm(handleTaskCreated)}
                        variant="secondary"
                      >
                        <Plus className="w-4 h-4" />
                        Create Task
                      </ActionButton>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between mt-6 px-2">
        <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-gray-500">
          <span className="font-medium text-gray-200 dark:text-gray-100">
            {filteredAndSortedTasks.length}
          </span>
          <span>{filteredAndSortedTasks.length === 1 ? "task" : "tasks"}</span>
          {filters.status !== "all" || filters.priority !== "all" ? (
            <span className="text-gray-500">
              (filtered from {tasks.length} total)
            </span>
          ) : null}
        </div>
        <div className="flex items-center gap-1">
          <button
            className="p-2 border border-gray-700 dark:border-gray-600 text-gray-400 dark:text-gray-500 hover:text-gray-300 dark:hover:text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-800/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            disabled={tasks.length === 0}
            title="Previous page"
          >
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
                strokeWidth="2"
                d="M15 19l-7-7 7-7"
              ></path>
            </svg>
          </button>
          <button
            className="p-2 border border-gray-700 dark:border-gray-600 text-gray-400 dark:text-gray-500 hover:text-gray-300 dark:hover:text-gray-300 hover:bg-gray-800 dark:hover:bg-gray-800/50 disabled:opacity-40 disabled:cursor-not-allowed transition-all"
            disabled={tasks.length === 0}
            title="Next page"
          >
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
