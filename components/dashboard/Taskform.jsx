"use client";

import { useState } from "react";
import { X } from "lucide-react";
import Button from "./Button";
import { toast } from "sonner";
import { createTask } from "@/utils/createTask";
import { useUser, useAuth } from "@clerk/nextjs";

const TaskForm = ({ handleClose }) => {
  const { user } = useUser();
  const { getToken } = useAuth();
  const user_id = user?.id;
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [due_date, setdue_date] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    priority: "",
    due_date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset errors first
    setErrors({
      title: "",
      priority: "",
      due_date: "",
    });

    // Validate form fields
    if (!title.trim()) {
      setErrors((prev) => ({ ...prev, title: "Task title is required" }));
      return;
    }

    if (!priority) {
      setErrors((prev) => ({
        ...prev,
        priority: "Priority selection is required",
      }));
      return;
    }

    if (!due_date) {
      setErrors((prev) => ({ ...prev, due_date: "Due date is required" }));
      return;
    }

    if (!user_id) {
      toast.error("User not authenticated");
      return;
    }

    setIsSubmitting(true);

    try {
      const taskdata = {
        user_id,
        title: title.trim(),
        priority,
        due_date,
        status: "todo",
      };
      console.log("Creating task with data:", taskdata); // Debug log

      const result = await createTask({ taskdata }, getToken);

      if (result.error) {
        console.error("Task creation error:", result.error);
        toast.error("Error: " + result.error.message);
      } else {
        toast.success("Task created successfully!");

        // Reset form
        setTitle("");
        setPriority("");
        setdue_date("");

        // Close the form
        handleClose();
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error(err.message || "Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="max-w-md w-full p-5 sm:p-6 rounded-lg shadow-lg bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 relative">
        <div className="flex items-center justify-between">
          {" "}
          <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
            Create New Task
          </h2>{" "}
          <X
            onClick={handleClose}
            className="absolute top-5 right-5 sm:top-6 sm:right-6 cursor-pointer text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200 transition-colors w-5 h-5 sm:w-6 sm:h-6"
          />
        </div>
        <form className="space-y-4" onSubmit={handleSubmit}>
          {" "}
          <div>
            {" "}
            <label
              htmlFor="task-title"
              className="block text-sm sm:text-base lg:text-base font-medium text-gray-900 dark:text-gray-100 mb-1"
            >
              Task Title
            </label>{" "}
            <input
              type="text"
              onChange={(e) => setTitle(e.target.value)}
              value={title}
              id="task-title"
              className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-base sm:text-base lg:text-sm"
              placeholder="Enter task title"
            />{" "}
            {errors.title && (
              <p className="mt-2 text-sm sm:text-sm font-medium text-red-600 dark:text-red-400 px-2 py-1 bg-red-50 dark:bg-red-900/20 rounded-md">
                {errors.title}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="priority"
              className="block text-sm sm:text-base lg:text-base font-medium text-gray-900 dark:text-gray-100 mb-1"
            >
              Priority
            </label>{" "}
            <select
              onChange={(e) => setPriority(e.target.value)}
              value={priority}
              id="priority"
              className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-base sm:text-base lg:text-sm"
            >
              <option value="">Select priority</option>
              <option value="Easy">Easy</option>
              <option value="Medium">Medium</option>
              <option value="Extreme">Extreme</option>
            </select>
            {errors.priority && (
              <p className="mt-2 text-sm sm:text-sm font-medium text-red-600 dark:text-red-400 px-2 py-1 bg-red-50 dark:bg-red-900/20 rounded-md">
                {errors.priority}
              </p>
            )}
          </div>
          <div>
            <label
              htmlFor="due-date"
              className="block text-sm sm:text-base lg:text-base font-medium text-gray-900 dark:text-gray-100 mb-1"
            >
              Due Date
            </label>{" "}
            <input
              type="date"
              id="due-date"
              onChange={(e) => setdue_date(e.target.value)}
              value={due_date || ""}
              min={new Date().toISOString().split("T")[0]} // Block past dates
              className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-base sm:text-base lg:text-sm"
            />
            {errors.due_date && (
              <p className="mt-2 text-sm sm:text-sm font-medium text-red-600 dark:text-red-400 px-2 py-1 bg-red-50 dark:bg-red-900/20 rounded-md">
                {errors.due_date}
              </p>
            )}
          </div>
          <Button
            variant="primary"
            size="md"
            type="submit"
            disabled={isSubmitting}
            className="flex-1 w-full mt-2 cursor-pointer"
          >
            {isSubmitting ? "Creating..." : "Create Task"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export default TaskForm;
