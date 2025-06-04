"use client";

import { useState, useEffect } from "react";
import Button from "./Button";
import { toast } from "sonner";
import { createTask } from "@/utils/createTask";
import { useUser, useAuth } from "@clerk/nextjs";

const TaskForm = ({
  handleClose,
  onTaskCreated,
  onSuccess,
  onClose,
  selectedDate = null,
  editTask = null,
}) => {
  // Use onClose if provided, otherwise fallback to handleClose
  const closeForm = onClose || handleClose;
  const { user } = useUser();
  const { getToken } = useAuth();
  const user_id = user?.id;
  const [title, setTitle] = useState("");
  const [priority, setPriority] = useState("");
  const [due_date, setdue_date] = useState("");
  const [due_time, setDueTime] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    priority: "",
    due_date: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false); // Set the due date from selectedDate prop if provided
  useEffect(() => {
    if (editTask) {
      // Populate form with existing task data for editing
      setTitle(editTask.title || "");
      setPriority(editTask.priority || "");
      if (editTask.due_date) {
        const date = new Date(editTask.due_date);
        const year = date.getFullYear();
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const day = String(date.getDate()).padStart(2, "0");
        const dateStr = `${year}-${month}-${day}`;
        setdue_date(dateStr);

        // Extract time if it exists
        const hours = String(date.getHours()).padStart(2, "0");
        const minutes = String(date.getMinutes()).padStart(2, "0");
        setDueTime(`${hours}:${minutes}`);
      }
    } else if (selectedDate) {
      // Fix timezone issue by using local date formatting
      const year = selectedDate.getFullYear();
      const month = String(selectedDate.getMonth() + 1).padStart(2, "0");
      const day = String(selectedDate.getDate()).padStart(2, "0");
      const dateStr = `${year}-${month}-${day}`;
      setdue_date(dateStr);
    }
  }, [selectedDate, editTask]);
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
      // Combine date and time if time is provided
      let finalDueDate = due_date;
      if (due_time) {
        finalDueDate = `${due_date}T${due_time}:00`;
      }

      const taskdata = {
        user_id,
        title: title.trim(),
        priority,
        due_date: finalDueDate,
        status: editTask?.status || "todo",
      };

      console.log(
        editTask ? "Updating task with data:" : "Creating task with data:",
        taskdata
      );

      let result;
      if (editTask) {
        // Import updateTask utility
        const { updateTask } = await import("@/utils/updateTask");
        result = await updateTask(getToken, editTask.id, taskdata);
      } else {
        result = await createTask({ taskdata }, getToken);
      }

      if (result.error) {
        console.error("Task operation error:", result.error);
        toast.error("Error: " + result.error.message);
      } else {
        toast.success(
          editTask ? "Task updated successfully!" : "Task created successfully!"
        );

        // Reset form
        setTitle("");
        setPriority("");
        setdue_date("");
        setDueTime("");

        // Call success callback if provided
        if (onSuccess) {
          onSuccess();
        } else {
          // Close the form (fallback)
          closeForm();
        }
      }
    } catch (err) {
      console.error("Unexpected error:", err);
      toast.error(err.message || "Failed to create task");
    } finally {
      setIsSubmitting(false);
    }
  };
  return (
    <div className="max-h-[80vh] overflow-y-auto p-6">
      <div className="flex justify-between items-center border-b border-gray-200 dark:border-gray-700 pb-4 mb-6">
        <h2 className="text-xl font-bold text-gray-900 dark:text-white">
          {editTask ? "Edit Task" : "Create Task"}
        </h2>
        <button
          onClick={closeForm}
          className="text-gray-400 hover:text-gray-500 dark:text-gray-400 dark:hover:text-gray-300"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      <form className="space-y-6" onSubmit={handleSubmit}>
        <div>
          <label
            htmlFor="task-title"
            className="block text-sm sm:text-base lg:text-base font-medium text-gray-900 dark:text-gray-100 mb-2"
          >
            Task Title
          </label>
        <input
          type="text"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
          id="task-title"
          className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-base sm:text-base lg:text-sm"
          placeholder="Enter task title"
        />
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
        </label>
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
        </label>
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
        )}{" "}
      </div>

      <div>
        <label
          htmlFor="due-time"
          className="block text-sm sm:text-base lg:text-base font-medium text-gray-900 dark:text-gray-100 mb-1"
        >
          Due Time (Optional)
        </label>
        <input
          type="time"
          id="due-time"
          onChange={(e) => setDueTime(e.target.value)}
          value={due_time || ""}
          className="w-full px-3 py-2.5 sm:py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-400 bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 text-base sm:text-base lg:text-sm"
        />
      </div>

      <Button
        variant="primary"
        size="md"
        type="submit"
        disabled={isSubmitting}
        className="flex-1 w-full mt-2 cursor-pointer"
      >
        {isSubmitting
          ? editTask
            ? "Updating..."
            : "Creating..."
          : editTask
          ? "Update Task"
          : "Create Task"}
      </Button>
      </form>
    </div>
  );
};

export default TaskForm;
