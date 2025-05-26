"use client";

import { createContext, useContext, useState, useRef } from "react";

const TaskFormContext = createContext();

export const useTaskForm = () => {
  const context = useContext(TaskFormContext);
  if (!context) {
    throw new Error("useTaskForm must be used within a TaskFormProvider");
  }
  return context;
};

export const TaskFormProvider = ({ children }) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const taskCreatedCallbackRef = useRef(null);

  const openTaskForm = (onTaskCreated) => {
    if (onTaskCreated) {
      taskCreatedCallbackRef.current = onTaskCreated;
    }
    setShowTaskForm(true);
  };

  const closeTaskForm = () => {
    setShowTaskForm(false);
    taskCreatedCallbackRef.current = null;
  };

  const handleTaskCreated = (newTask) => {
    if (taskCreatedCallbackRef.current) {
      taskCreatedCallbackRef.current(newTask);
    }
    closeTaskForm();
  };

  const value = {
    showTaskForm,
    openTaskForm,
    closeTaskForm,
    handleTaskCreated,
  };

  return (
    <TaskFormContext.Provider value={value}>
      {children}
    </TaskFormContext.Provider>
  );
};
