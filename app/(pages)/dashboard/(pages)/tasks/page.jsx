"use client";

import { useState } from "react";
import { ActionButton } from "@/components/dashboard/ActionButtons";
import { Plus } from "lucide-react";
import TaskForm from "@/components/dashboard/Taskform";

const Tasks = () => {
  const [sorting, setSorting] = useState({ field: "title", direction: "asc" });
  const [filters, setFilters] = useState({ status: "all", priority: "all" });
  const [showForm, setShowForm] = useState(false);

  return (
    <div className="w-full">
      {" "}
      <div className="mb-6">
        <h1 className="font-bold text-2xl md:text-3xl mb-1">Tasks</h1>
        <p className="text-sm md:text-base text-gray-500 dark:text-gray-400">
          Organize and track your daily work
        </p>
      </div>
      {/* Task Management Controls */}
      <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
        {" "}
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
              <option value="high">High</option>
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
        <div className="mt-4 absolute">
          {showForm && (
            <TaskForm
              onClose={() => setShowForm(false)}
              className="absolute top-0 left-0 right-0 bottom-0 border border-gray-400 bg-gray-800 p-6"
              handleClose={() => setShowForm(false)}
            />
          )}
        </div>
      </div>
      {/* Tasks Table */}
      <div className="bg-transparent rounded-md border border-gray-200 dark:border-gray-700 overflow-hidden">
        {" "}
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th
                  scope="col"
                  className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
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
                  className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Status
                </th>
                <th
                  scope="col"
                  className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Priority
                </th>
                <th
                  scope="col"
                  className="px-4 py-2.5 text-left text-xs font-medium text-gray-500 dark:text-gray-400 hidden md:table-cell"
                >
                  <div
                    className="flex items-center gap-1.5 cursor-pointer"
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
                  className="px-4 py-2.5 text-right text-xs font-medium text-gray-500 dark:text-gray-400"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white dark:bg-gray-800 divide-y divide-gray-200 dark:divide-gray-700">
              {/* Table will be populated dynamically in the future */}
            </tbody>
          </table>
        </div>{" "}
        {/* Empty state */}
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
      </div>
      {/* Pagination */}
      <div className="flex items-center justify-between mt-4 text-xs">
        <div className="text-gray-500 dark:text-gray-400">
          <span className="font-medium">0</span> tasks
        </div>
        <div className="flex items-center gap-1">
          <button
            className="px-2 py-1 bg-transparent border border-gray-200 dark:border-gray-700 rounded text-gray-400 dark:text-gray-500 disabled:opacity-40 disabled:cursor-not-allowed"
            disabled
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
            disabled
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
