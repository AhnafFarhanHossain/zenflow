"use client";

import { useTaskForm } from "@/contexts/TaskFormContext";
import TaskForm from "@/components/dashboard/Taskform";

const GlobalTaskForm = () => {
  const { showTaskForm, closeTaskForm, handleTaskCreated } = useTaskForm();

  if (!showTaskForm) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 dark:bg-black dark:bg-opacity-60 z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 shadow-xl w-full max-w-xl relative overflow-hidden border border-gray-200 dark:border-gray-700 rounded-lg">
        <TaskForm
          onClose={closeTaskForm}
          handleClose={closeTaskForm}
          onTaskCreated={handleTaskCreated}
        />
      </div>
    </div>
  );
};

export default GlobalTaskForm;
