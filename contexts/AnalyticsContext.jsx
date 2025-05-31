"use client";

import { createContext, useContext, useState, useEffect } from "react";
import { useUser, useAuth } from "@clerk/nextjs";
import { getTasks } from "@/utils/getTasks";
import { getNotes } from "@/utils/getNotes";

const AnalyticsContext = createContext();

export const useAnalytics = () => {
  const context = useContext(AnalyticsContext);
  if (!context) {
    throw new Error("useAnalytics must be used within an AnalyticsProvider");
  }
  return context;
};

export const AnalyticsProvider = ({ children }) => {
  const { user, isLoaded } = useUser();
  const { getToken } = useAuth();
  const [tasks, setTasks] = useState([]);
  const [notes, setNotes] = useState([]);
  const [analytics, setAnalytics] = useState({
    // Task analytics
    totalTasks: 0,
    completedTasks: 0,
    pendingTasks: 0,
    inProgressTasks: 0,
    overdueTasks: 0,
    tasksByPriority: {
      Extreme: 0,
      Medium: 0,
      Easy: 0,
    },
    tasksByStatus: {
      todo: 0,
      "in-progress": 0,
      done: 0,
    },
    completionRate: 0,
    thisWeekTasks: 0,
    thisWeekCompleted: 0,
    productivity: 0,
    weeklyData: [],
    priorityData: [],
    statusData: [], // Note analytics
    totalNotes: 0,
    thisWeekNotes: 0,
    notesCreatedToday: 0,
    notesUpdatedToday: 0,
    recentlyModifiedNotes: 0,
    notesWeeklyData: [],
  });
  const [loading, setLoading] = useState(true);
  const fetchAndAnalyzeTasks = async () => {
    if (!user?.id) {
      setTasks([]);
      setNotes([]);
      setLoading(false);
      return;
    }

    try {
      setLoading(true);

      // Fetch both tasks and notes
      const [fetchedTasks, fetchedNotes] = await Promise.all([
        getTasks(getToken, user.id),
        getNotes(getToken, user.id),
      ]);

      const processedTasks = (fetchedTasks || []).map((task) => {
        const priorityString = String(task.priority || "").trim();
        let priorityValue = "Easy";

        if (priorityString === "Extreme") {
          priorityValue = "Extreme";
        } else if (priorityString === "Medium") {
          priorityValue = "Medium";
        } else if (priorityString === "Easy") {
          priorityValue = "Easy";
        }

        const currentStatus = task.status || "todo";

        return {
          ...task,
          completed: currentStatus === "done",
          status: currentStatus,
          priority: priorityValue,
        };
      });

      setTasks(processedTasks);
      setNotes(fetchedNotes || []);
      calculateAnalytics(processedTasks, fetchedNotes || []);
    } catch (error) {
      console.error("Error fetching data for analytics:", error);
      setTasks([]);
      setNotes([]);
    } finally {
      setLoading(false);
    }
  };
  const calculateAnalytics = (taskList, notesList) => {
    const now = new Date();
    const startOfWeek = new Date(now.setDate(now.getDate() - now.getDay()));
    startOfWeek.setHours(0, 0, 0, 0);
    const startOfDay = new Date();
    startOfDay.setHours(0, 0, 0, 0);

    // === TASK ANALYTICS ===
    const totalTasks = taskList.length;
    const completedTasks = taskList.filter(
      (task) => task.status === "done"
    ).length;
    const pendingTasks = taskList.filter(
      (task) => task.status === "todo"
    ).length;
    const inProgressTasks = taskList.filter(
      (task) => task.status === "in-progress"
    ).length;

    // Overdue tasks calculation
    const overdueTasks = taskList.filter((task) => {
      if (!task.due_date || task.status === "done") return false;
      return new Date(task.due_date) < new Date();
    }).length;

    // Tasks by priority
    const tasksByPriority = {
      Extreme: taskList.filter((task) => task.priority === "Extreme").length,
      Medium: taskList.filter((task) => task.priority === "Medium").length,
      Easy: taskList.filter((task) => task.priority === "Easy").length,
    };

    // Tasks by status
    const tasksByStatus = {
      todo: pendingTasks,
      "in-progress": inProgressTasks,
      done: completedTasks,
    };

    // This week's tasks
    const thisWeekTasks = taskList.filter((task) => {
      const taskDate = new Date(task.created_at);
      return taskDate >= startOfWeek;
    }).length;

    const thisWeekCompleted = taskList.filter((task) => {
      const taskDate = new Date(task.created_at);
      return taskDate >= startOfWeek && task.status === "done";
    }).length;

    // Completion rate
    const completionRate =
      totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;

    // Productivity score (based on completion rate, overdue tasks, and recent activity)
    let productivity = completionRate;
    if (overdueTasks > 0) {
      productivity -= Math.min(overdueTasks * 5, 20); // Reduce up to 20% for overdue tasks
    }
    if (thisWeekTasks > 0) {
      productivity += Math.min(thisWeekTasks * 2, 15); // Boost up to 15% for recent activity
    }
    productivity = Math.max(0, Math.min(100, productivity)); // Keep between 0-100

    // Weekly data for chart (last 7 days)
    const weeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

      const dayTasks = taskList.filter((task) => {
        const taskDate = new Date(task.created_at);
        return (
          taskDate.getFullYear() === date.getFullYear() &&
          taskDate.getMonth() === date.getMonth() &&
          taskDate.getDate() === date.getDate()
        );
      });

      const dayCompleted = dayTasks.filter(
        (task) => task.status === "done"
      ).length;

      weeklyData.push({
        day: dayName,
        tasks: dayTasks.length,
        completed: dayCompleted,
      });
    }

    // Priority data for pie chart
    const priorityData = [
      { name: "Extreme", value: tasksByPriority.Extreme, color: "#ef4444" },
      { name: "Medium", value: tasksByPriority.Medium, color: "#f59e0b" },
      { name: "Easy", value: tasksByPriority.Easy, color: "#10b981" },
    ].filter((item) => item.value > 0);

    // Status data for pie chart
    const statusData = [
      { name: "To-Do", value: tasksByStatus.todo, color: "#6b7280" },
      {
        name: "In Progress",
        value: tasksByStatus["in-progress"],
        color: "#3b82f6",
      },
      { name: "Completed", value: tasksByStatus.done, color: "#10b981" },
    ].filter((item) => item.value > 0);

    // === NOTE ANALYTICS ===
    const totalNotes = notesList.length;

    // This week's notes
    const thisWeekNotes = notesList.filter((note) => {
      const noteDate = new Date(note.created_at);
      return noteDate >= startOfWeek;
    }).length;

    // Notes created today
    const notesCreatedToday = notesList.filter((note) => {
      const noteDate = new Date(note.created_at);
      return noteDate >= startOfDay;
    }).length; // Notes updated today
    const notesUpdatedToday = notesList.filter((note) => {
      const updatedDate = new Date(note.updated_at || note.created_at);
      return (
        updatedDate >= startOfDay && updatedDate > new Date(note.created_at)
      );
    }).length;

    // Recently modified notes (last 3 days)
    const threeDaysAgo = new Date();
    threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);
    const recentlyModifiedNotes = notesList.filter((note) => {
      const updatedDate = new Date(note.updated_at || note.created_at);
      return updatedDate >= threeDaysAgo;
    }).length;

    // Weekly notes data for chart (last 7 days)
    const notesWeeklyData = [];
    for (let i = 6; i >= 0; i--) {
      const date = new Date();
      date.setDate(date.getDate() - i);
      const dayName = date.toLocaleDateString("en-US", { weekday: "short" });

      const dayNotes = notesList.filter((note) => {
        const noteDate = new Date(note.created_at);
        return (
          noteDate.getFullYear() === date.getFullYear() &&
          noteDate.getMonth() === date.getMonth() &&
          noteDate.getDate() === date.getDate()
        );
      });
      notesWeeklyData.push({
        day: dayName,
        notes: dayNotes.length,
        modified: dayNotes.filter((note) => {
          const updatedDate = new Date(note.updated_at || note.created_at);
          return updatedDate > new Date(note.created_at);
        }).length,
      });
    }

    setAnalytics({
      // Task analytics
      totalTasks,
      completedTasks,
      pendingTasks,
      inProgressTasks,
      overdueTasks,
      tasksByPriority,
      tasksByStatus,
      completionRate,
      thisWeekTasks,
      thisWeekCompleted,
      productivity: Math.round(productivity),
      weeklyData,
      priorityData,
      statusData, // Note analytics
      totalNotes,
      thisWeekNotes,
      notesCreatedToday,
      notesUpdatedToday,
      recentlyModifiedNotes,
      notesWeeklyData,
    });
  };

  useEffect(() => {
    if (isLoaded) {
      fetchAndAnalyzeTasks();
    }
  }, [user?.id, isLoaded]);
  const value = {
    tasks,
    notes,
    analytics,
    loading,
    refreshAnalytics: fetchAndAnalyzeTasks,
  };

  return (
    <AnalyticsContext.Provider value={value}>
      {children}
    </AnalyticsContext.Provider>
  );
};
