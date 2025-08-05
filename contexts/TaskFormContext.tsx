"use client";

import { createContext, useContext, useState, useRef } from "react";
import { Task, TaskFormContextType, ChildrenProps } from "@/types";

const TaskFormContext = createContext<TaskFormContextType | undefined>(undefined);

export const useTaskForm = (): TaskFormContextType => {
  const context = useContext(TaskFormContext);
  if (!context) {
    throw new Error("useTaskForm must be used within a TaskFormProvider");
  }
  return context;
};

export const TaskFormProvider = ({ children }: ChildrenProps) => {
  const [showTaskForm, setShowTaskForm] = useState(false);
  const taskCreatedCallbackRef = useRef<((task: Task) => void) | null>(null);

  const openTaskForm = (onTaskCreated?: (task: Task) => void) => {
    if (onTaskCreated) {
      taskCreatedCallbackRef.current = onTaskCreated;
    }
    setShowTaskForm(true);
  };

  const closeTaskForm = () => {
    setShowTaskForm(false);
    taskCreatedCallbackRef.current = null;
  };

  const handleTaskCreated = (newTask: Task) => {
    if (taskCreatedCallbackRef.current) {
      taskCreatedCallbackRef.current(newTask);
    }
    closeTaskForm();
  };

  const value: TaskFormContextType = {
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
