"use client";
import { useState, useEffect } from "react";
import { useUser } from "@clerk/nextjs";
import Calendar from "@/components/dashboard/Calendar";
import ActionSelector from "@/components/dashboard/ActionSelector";
import UpcomingEvents from "@/components/dashboard/UpcomingEvents";
import TaskForm from "@/components/dashboard/Taskform";
import ScheduleForm from "@/components/dashboard/ScheduleForm";
import MetricCard from "@/components/dashboard/MetricCard";
import CustomPieChart from "@/components/dashboard/CustomPieChart";
import {
  CheckCircle,
  Clock,
  Calendar as CalendarIcon,
  Target,
  TrendingUp,
  AlertCircle,
} from "lucide-react";

const SchedulePage = () => {
  const { user, isLoaded } = useUser();
  const [selectedDate, setSelectedDate] = useState(null);
  const [showActionSelector, setShowActionSelector] = useState(false);
  const [showTaskForm, setShowTaskForm] = useState(false);
  const [showScheduleForm, setShowScheduleForm] = useState(false);
  const [tasks, setTasks] = useState([]);
  const [schedules, setSchedules] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [editingTask, setEditingTask] = useState(null);
  const [editingSchedule, setEditingSchedule] = useState(null);

  // Static mock data
  const mockTasks = [
    {
      id: 1,
      title: "Complete project proposal",
      priority: "Extreme",
      status: "todo",
      due_date: "2025-08-15T10:00:00",
      completed: false,
      user_id: user?.id,
    },
    {
      id: 2,
      title: "Review team feedback",
      priority: "Medium",
      status: "in-progress",
      due_date: "2025-08-10T14:30:00",
      completed: false,
      user_id: user?.id,
    },
  ];

  const mockSchedules = [
    {
      id: 1,
      title: "Team Meeting",
      date: "2025-08-08T09:00:00",
      user_id: user?.id,
    },
    {
      id: 2,
      title: "Project Review",
      date: "2025-08-12T15:00:00",
      user_id: user?.id,
    },
  ];

  // Load static data on component mount
  useEffect(() => {
    const loadData = async () => {
      if (!isLoaded || !user) return;

      setIsLoading(true);
      try {
        // Simulate API call delay
        await new Promise((resolve) => setTimeout(resolve, 500));

        console.log("Loading mock data for user:", user?.id);
        setTasks(mockTasks);
        setSchedules(mockSchedules);
      } catch (error) {
        console.error("Error loading data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadData();
  }, [isLoaded, user]); // Handle date selection from calendar
  const handleDateSelect = (date, event) => {
    console.log("Date selected from calendar:", date);
    console.log("Date string:", date?.toISOString?.());
    setSelectedDate(date);
    setShowActionSelector(true);
  };

  // Handle action selection (task or schedule)
  const handleActionSelect = (action) => {
    setShowActionSelector(false);
    if (action === "task") {
      setShowTaskForm(true);
    } else if (action === "schedule") {
      setShowScheduleForm(true);
    }
  };
  // Handle form closures with cleanup
  const handleCloseAllForms = () => {
    setShowActionSelector(false);
    setShowTaskForm(false);
    setShowScheduleForm(false);
    setSelectedDate(null);
    setEditingTask(null);
    setEditingSchedule(null);
  }; // Handle successful form submissions - static behavior
  const handleFormSuccess = async () => {
    handleCloseAllForms();
    console.log("Form submitted successfully (static)");
  };

  // Handle clearing all tasks - static behavior
  const handleClearTasks = async () => {
    if (!user) return;
    console.log("All tasks cleared (static)");
  };

  // Handle clearing all schedules - static behavior
  const handleClearSchedules = async () => {
    if (!user) return;
    console.log("All schedules cleared (static)");
  };

  // Handle task completion toggle - static behavior
  const handleTaskComplete = async (taskId, completed) => {
    if (!user) return;
    console.log("Task completion toggled (static):", taskId, completed);
  };

  // Handle individual task deletion - static behavior
  const handleDeleteTask = async (taskId) => {
    if (!user) return;

    if (!confirm("Are you sure you want to delete this task?")) return;

    console.log("Task deleted (static):", taskId);
  };

  // Handle individual schedule deletion - static behavior
  const handleDeleteSchedule = async (scheduleId) => {
    if (!user) return;

    if (!confirm("Are you sure you want to delete this event?")) return;

    console.log("Schedule deleted (static):", scheduleId);
  };

  // Handle task editing
  const handleEditTask = (task) => {
    setEditingTask(task);
    setShowTaskForm(true);
  };

  // Handle schedule editing
  const handleEditSchedule = (schedule) => {
    setEditingSchedule(schedule);
    setShowScheduleForm(true);
  };
  // Get events for calendar display
  const getCalendarEvents = () => {
    const events = [];

    // Add tasks as events
    tasks.forEach((task) => {
      if (task.due_date) {
        events.push({
          date: new Date(task.due_date),
          type: "task",
          title: task.title,
          id: task.id,
        });
      }
    });

    // Add schedules as events
    schedules.forEach((schedule) => {
      if (schedule.date) {
        events.push({
          date: new Date(schedule.date),
          type: "schedule",
          title: schedule.title,
          id: schedule.id,
        });
      }
    });

    return events;
  };

  // Analytics helper functions
  const getTaskAnalytics = () => {
    const total = tasks.length;
    const completed = tasks.filter((task) => task.status === "done").length;
    const pending = tasks.filter((task) => task.status === "todo").length;
    const overdue = tasks.filter((task) => {
      if (task.status === "done") return false;
      if (!task.due_date) return false;
      return new Date(task.due_date) < new Date();
    }).length;

    const completionRate =
      total > 0 ? Math.round((completed / total) * 100) : 0;

    return {
      total,
      completed,
      pending,
      overdue,
      completionRate,
    };
  };

  const getScheduleAnalytics = () => {
    const total = schedules.length;
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const upcoming = schedules.filter((schedule) => {
      if (!schedule.date) return false;
      const scheduleDate = new Date(schedule.date);
      scheduleDate.setHours(0, 0, 0, 0);
      return scheduleDate >= today;
    }).length;

    const past = schedules.filter((schedule) => {
      if (!schedule.date) return false;
      const scheduleDate = new Date(schedule.date);
      scheduleDate.setHours(0, 0, 0, 0);
      return scheduleDate < today;
    }).length;

    const thisWeek = schedules.filter((schedule) => {
      if (!schedule.date) return false;
      const scheduleDate = new Date(schedule.date);
      const weekFromNow = new Date();
      weekFromNow.setDate(weekFromNow.getDate() + 7);
      return scheduleDate >= today && scheduleDate <= weekFromNow;
    }).length;

    return {
      total,
      upcoming,
      past,
      thisWeek,
    };
  };

  const getTaskStatusData = () => {
    const analytics = getTaskAnalytics();
    return [
      { name: "Completed", value: analytics.completed, color: "#10B981" },
      { name: "Pending", value: analytics.pending, color: "#F59E0B" },
      { name: "Overdue", value: analytics.overdue, color: "#EF4444" },
    ].filter((item) => item.value > 0);
  };

  const getUpcomingTasksData = () => {
    const today = new Date();
    const tasksByDate = {};

    tasks
      .filter((task) => task.status !== "done" && task.due_date)
      .forEach((task) => {
        const dueDate = new Date(task.due_date);
        const daysDiff = Math.ceil((dueDate - today) / (1000 * 60 * 60 * 24));

        let category;
        if (daysDiff < 0) category = "Overdue";
        else if (daysDiff === 0) category = "Today";
        else if (daysDiff <= 3) category = "Next 3 Days";
        else if (daysDiff <= 7) category = "This Week";
        else category = "Later";

        tasksByDate[category] = (tasksByDate[category] || 0) + 1;
      });

    const colors = {
      Overdue: "#EF4444",
      Today: "#F59E0B",
      "Next 3 Days": "#3B82F6",
      "This Week": "#8B5CF6",
      Later: "#6B7280",
    };

    return Object.entries(tasksByDate).map(([name, value]) => ({
      name,
      value,
      color: colors[name],
    }));
  };

  if (isLoading) {
    return (
      <div className="w-full min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">
            Loading your schedule...
          </p>
        </div>
      </div>
    );
  }
  return (
    <div
      className="space-y-6"
      style={{ fontFamily: "var(--font-baiJamjuree)" }}
    >
      {/* Header section matching dashboard style */}
      <div className="mb-6">
        <h1 className="font-bold text-2xl md:text-3xl mb-1 text-gray-900 dark:text-white">
          Tasks
        </h1>
        <p className="text-sm md:text-base text-gray-600 dark:text-gray-400">
          Organize and track your daily work
        </p>
      </div>
      {/* Main Content */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {" "}
        {/* Calendar Section */}
        <div className="xl:col-span-2">
          <div className="bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:border-gray-700">
            <div className="p-4 sm:p-6">
              <div className="flex items-center gap-3 mb-6">
                <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                  Calendar
                </h2>
              </div>
              <Calendar
                markedDates={getCalendarEvents()}
                onDateSelect={handleDateSelect}
                selectedDate={selectedDate}
              />
            </div>
          </div>

          {/* Analytics Section */}
          <div className="mt-6 space-y-6">
            {/* Key Metrics */}
            <div className="bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:border-gray-700">
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-6">
                  <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Overview
                  </h2>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                  <MetricCard
                    title="Total Tasks"
                    value={getTaskAnalytics().total}
                    icon={Target}
                    color="blue"
                  />
                  <MetricCard
                    title="Completion Rate"
                    value={`${getTaskAnalytics().completionRate}%`}
                    icon={CheckCircle}
                    color={
                      getTaskAnalytics().completionRate >= 70
                        ? "green"
                        : getTaskAnalytics().completionRate >= 40
                        ? "yellow"
                        : "red"
                    }
                  />
                  <MetricCard
                    title="Upcoming Events"
                    value={getScheduleAnalytics().upcoming}
                    icon={CalendarIcon}
                    color="yellow"
                  />
                  <MetricCard
                    title="Overdue Tasks"
                    value={getTaskAnalytics().overdue}
                    icon={AlertCircle}
                    color={getTaskAnalytics().overdue > 0 ? "red" : "green"}
                  />
                </div>
              </div>
            </div>{" "}
            {/* Charts Section */}
            <div className="grid grid-cols-1 gap-6">
              {/* Task Status Distribution */}
              <div className="bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:border-gray-700">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Task Status
                    </h3>
                  </div>{" "}
                  <div className="flex justify-center">
                    <div className="w-full">
                      <CustomPieChart
                        data={getTaskStatusData()}
                        title="Task Status Distribution"
                        height={300}
                      />
                    </div>
                  </div>
                </div>
              </div>

              {/* Upcoming Tasks Timeline */}
              <div className="bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:border-gray-700">
                <div className="p-4 sm:p-6">
                  <div className="flex items-center gap-3 mb-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                      Task Timeline
                    </h3>
                  </div>{" "}
                  <div className="flex justify-center">
                    <div className="w-full">
                      <CustomPieChart
                        data={getUpcomingTasksData()}
                        title="Upcoming Tasks"
                        height={300}
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
            {/* Additional Insights */}
            <div className="bg-white border border-gray-200 rounded-md dark:bg-gray-900 dark:border-gray-700">
              <div className="p-4 sm:p-6">
                <div className="flex items-center gap-3 mb-6">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    Quick Insights
                  </h3>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {/* Task Insights */}
                  <div className="space-y-4">
                    <h4 className="text-md font-medium text-gray-900 dark:text-gray-100">
                      Task Management
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Active Tasks
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {getTaskAnalytics().pending}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Completed Today
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {
                            tasks.filter((task) => {
                              if (task.status !== "done") return false;
                              const today = new Date();
                              const taskDate = new Date(
                                task.updated_at || task.created_at
                              );
                              return (
                                taskDate.toDateString() === today.toDateString()
                              );
                            }).length
                          }
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Average per Day
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {tasks.length > 0
                            ? Math.round(getTaskAnalytics().completed / 7)
                            : 0}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Schedule Insights */}
                  <div className="space-y-4">
                    <h4 className="text-md font-medium text-gray-900 dark:text-gray-100">
                      Schedule Planning
                    </h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          This Week
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {getScheduleAnalytics().thisWeek}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Total Events
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {getScheduleAnalytics().total}
                        </span>
                      </div>
                      <div className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-800 rounded-lg">
                        <span className="text-sm text-gray-600 dark:text-gray-400">
                          Past Events
                        </span>
                        <span className="text-sm font-medium text-gray-900 dark:text-gray-100">
                          {getScheduleAnalytics().past}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>{" "}
        {/* Upcoming Events Sidebar */}
        <div className="xl:col-span-1">
          <UpcomingEvents
            tasks={tasks}
            schedules={schedules}
            onClearTasks={handleClearTasks}
            onClearSchedules={handleClearSchedules}
            onTaskComplete={handleTaskComplete}
            onDeleteTask={handleDeleteTask}
            onDeleteSchedule={handleDeleteSchedule}
            onEditTask={handleEditTask}
            onEditSchedule={handleEditSchedule}
          />
        </div>
      </div>{" "}
      {/* Modern Action Selector Modal */}
      {showActionSelector && (
        <ActionSelector
          selectedDate={selectedDate}
          onCreateTask={() => handleActionSelect("task")}
          onCreateSchedule={() => handleActionSelect("schedule")}
          onClose={handleCloseAllForms}
        />
      )}
      {/* Task Form Modal */}
      {showTaskForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-hidden">
            <TaskForm
              selectedDate={selectedDate}
              editTask={editingTask}
              onSuccess={handleFormSuccess}
              onClose={handleCloseAllForms}
            />
          </div>
        </div>
      )}
      {/* Schedule Form Modal */}
      {showScheduleForm && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-w-md w-full max-h-[90vh] overflow-hidden">
            <div className="p-6">
              <div className="flex justify-between items-center mb-6">
                {" "}
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                    {editingSchedule ? "Edit Event" : "Schedule Event"}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                    {editingSchedule
                      ? "Update your existing event"
                      : "Mark an important date or event"}
                  </p>
                </div>
                <button
                  onClick={handleCloseAllForms}
                  className="p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md transition-colors"
                >
                  <span className="text-xl text-gray-400">×</span>
                </button>
              </div>{" "}
              <div className="overflow-y-auto max-h-[calc(90vh-8rem)]">
                <ScheduleForm
                  selectedDate={selectedDate}
                  editSchedule={editingSchedule}
                  onSuccess={handleFormSuccess}
                  onClose={handleCloseAllForms}
                />
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SchedulePage;
