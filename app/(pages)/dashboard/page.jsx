"use client";
import { useUser } from "@clerk/nextjs";
import {
  Calendar,
  CheckSquare,
  Clock,
  BarChartHorizontal,
  AlertTriangle,
  TrendingUp,
  FileText,
  PenTool,
  BookOpen,
  Edit3,
} from "lucide-react";
import { useAnalytics } from "@/contexts/AnalyticsContext";
import MetricCard from "@/components/dashboard/MetricCard";
import CustomPieChart from "@/components/dashboard/CustomPieChart";
import CustomBarChart from "@/components/dashboard/CustomBarChart";
import ProgressRing from "@/components/dashboard/ProgressRing";

const Dashboard = () => {
  const { user } = useUser();
  const { analytics, loading } = useAnalytics();

  // Calculate time tracked based on completed tasks (mock calculation)
  const timeTracked = analytics.completedTasks * 0.9; // Assume 0.9 hours per completed task
  const stats = [
    {
      title: "Tasks Pending",
      value: analytics.pendingTasks,
      icon: CheckSquare,
      color: "blue",
      trend: analytics.thisWeekTasks > 0 ? "up" : "neutral",
      trendValue:
        analytics.thisWeekTasks > 0
          ? `+${analytics.thisWeekTasks} this week`
          : null,
    },
    {
      title: "Total Notes",
      value: analytics.totalNotes,
      icon: FileText,
      color: "purple",
      trend: analytics.thisWeekNotes > 0 ? "up" : "neutral",
      trendValue:
        analytics.thisWeekNotes > 0
          ? `+${analytics.thisWeekNotes} this week`
          : null,
    },
    {
      title: "Time Tracked",
      value: `${timeTracked.toFixed(1)}h`,
      icon: Clock,
      color: "yellow",
    },
    {
      title: "Productivity",
      value: `${analytics.productivity}%`,
      icon: BarChartHorizontal,
      color:
        analytics.productivity >= 80
          ? "green"
          : analytics.productivity >= 60
          ? "yellow"
          : "red",
      trend:
        analytics.productivity >= 75
          ? "up"
          : analytics.productivity >= 50
          ? "neutral"
          : "down",
    },
  ];
  return (
    <div
      className="space-y-6"
      style={{ fontFamily: "var(--font-baiJamjuree)" }}
    >
      {/* Welcome section */}
      <header className="bg-white border border-gray-200 rounded-md p-4 sm:p-6 dark:bg-gray-900 dark:border-gray-700">
        <h1 className="text-lg sm:text-xl lg:text-lg font-semibold text-gray-900 dark:text-gray-100">
          Welcome back, {user?.firstName || "User"}
        </h1>{" "}
        <p className="text-sm sm:text-base lg:text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
          Here's what's happening with your tasks and notes today.
        </p>
      </header>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <MetricCard
            key={index}
            title={stat.title}
            value={stat.value}
            icon={stat.icon}
            color={stat.color}
            trend={stat.trend}
            trendValue={stat.trendValue}
            loading={loading}
          />
        ))}
      </div>
      {/* Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Productivity Ring */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 dark:bg-gray-900 dark:border-gray-700">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 text-center">
            Overall Productivity
          </h3>
          <div className="flex justify-center">
            <ProgressRing
              percentage={analytics.productivity}
              size={140}
              strokeWidth={10}
              color={
                analytics.productivity >= 80
                  ? "#10B981"
                  : analytics.productivity >= 60
                  ? "#F59E0B"
                  : "#EF4444"
              }
            >
              <div className="text-center">
                <div className="text-2xl font-bold text-gray-900 dark:text-gray-100">
                  {analytics.productivity}%
                </div>
                <div className="text-xs text-gray-500 dark:text-gray-400">
                  Productivity
                </div>
              </div>
            </ProgressRing>
          </div>
          <div className="mt-4 text-center">
            <p className="text-sm text-gray-600 dark:text-gray-300">
              {analytics.completedTasks} of {analytics.totalTasks} tasks
              completed
            </p>
          </div>
        </div>
        {/* Task Priority Distribution */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 dark:bg-gray-900 dark:border-gray-700">
          <CustomPieChart
            data={analytics.priorityData}
            title="Tasks by Priority"
            height={250}
          />
        </div>
        {/* Task Status Distribution */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 dark:bg-gray-900 dark:border-gray-700">
          <CustomPieChart
            data={analytics.statusData}
            title="Tasks by Status"
            height={250}
          />
        </div>{" "}
      </div>
      {/* Note Analytics Section */}
      <div className="space-y-6">
        <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 flex items-center gap-2">
          <BookOpen className="w-5 h-5" />
          Note Analytics
        </h2>
        {/* Note Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <MetricCard
            title="Total Notes"
            value={analytics.totalNotes}
            icon={FileText}
            color="purple"
            loading={loading}
          />
          <MetricCard
            title="Notes Created Today"
            value={analytics.notesCreatedToday}
            icon={Edit3}
            color="green"
            loading={loading}
          />
          <MetricCard
            title="Active Notes"
            value={analytics.recentlyModifiedNotes}
            icon={PenTool}
            color="indigo"
            loading={loading}
          />
          <MetricCard
            title="Updated Today"
            value={analytics.notesUpdatedToday}
            icon={BarChartHorizontal}
            color="blue"
            loading={loading}
          />
        </div>{" "}
        {/* Note Weekly Progress */}
        <div className="bg-white border border-gray-200 rounded-lg p-6 dark:bg-gray-900 dark:border-gray-700">
          <CustomBarChart
            data={analytics.notesWeeklyData}
            title="Weekly Note Activity"
            height={250}
            dataKey="notes"
            secondaryDataKey="modified"
            secondaryLabel="Modified"
          />
        </div>
      </div>
      {/* Weekly Progress Chart */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 dark:bg-gray-900 dark:border-gray-700">
        <CustomBarChart
          data={analytics.weeklyData}
          title="Weekly Task Progress"
          height={300}
        />
      </div>
      {/* Additional Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Total Tasks"
          value={analytics.totalTasks}
          icon={CheckSquare}
          color="blue"
          loading={loading}
        />
        <MetricCard
          title="Completed"
          value={analytics.completedTasks}
          icon={TrendingUp}
          color="green"
          loading={loading}
        />
        <MetricCard
          title="In Progress"
          value={analytics.inProgressTasks}
          icon={Clock}
          color="yellow"
          loading={loading}
        />
        <MetricCard
          title="Overdue"
          value={analytics.overdueTasks}
          icon={AlertTriangle}
          color="red"
          loading={loading}
        />
      </div>{" "}
      {/* Quick Insights */}
      {!loading && (analytics.totalTasks > 0 || analytics.totalNotes > 0) && (
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-3">
            📊 Quick Insights
          </h3>
          <div className="space-y-2 text-sm text-gray-700 dark:text-gray-300">
            {analytics.totalTasks > 0 && (
              <>
                <p>
                  • You have completed{" "}
                  <strong>{analytics.completionRate}%</strong> of your tasks
                </p>
                <p>
                  • <strong>{analytics.thisWeekTasks}</strong> tasks created
                  this week, <strong>{analytics.thisWeekCompleted}</strong>{" "}
                  completed
                </p>
                {analytics.overdueTasks > 0 && (
                  <p className="text-red-600 dark:text-red-400">
                    • ⚠️ You have <strong>{analytics.overdueTasks}</strong>{" "}
                    overdue task{analytics.overdueTasks > 1 ? "s" : ""} that
                    need attention
                  </p>
                )}
                {analytics.productivity >= 80 && (
                  <p className="text-green-600 dark:text-green-400">
                    • 🎉 Great job! Your productivity is excellent
                  </p>
                )}
              </>
            )}{" "}
            {analytics.totalNotes > 0 && (
              <>
                <p>
                  • You have <strong>{analytics.totalNotes}</strong> note
                  {analytics.totalNotes > 1 ? "s" : ""} in your collection
                </p>
                <p>
                  • <strong>{analytics.thisWeekNotes}</strong> notes created
                  this week
                </p>
                {analytics.notesCreatedToday > 0 && (
                  <p className="text-green-600 dark:text-green-400">
                    • ✍️ You've been productive today with{" "}
                    <strong>{analytics.notesCreatedToday}</strong> new note
                    {analytics.notesCreatedToday > 1 ? "s" : ""}
                  </p>
                )}
                {analytics.notesUpdatedToday > 0 && (
                  <p className="text-blue-600 dark:text-blue-400">
                    • 📝 <strong>{analytics.notesUpdatedToday}</strong> note
                    {analytics.notesUpdatedToday > 1 ? "s" : ""} updated today
                  </p>
                )}
                {analytics.recentlyModifiedNotes > 0 && (
                  <p className="text-purple-600 dark:text-purple-400">
                    • 🔄 <strong>{analytics.recentlyModifiedNotes}</strong> note
                    {analytics.recentlyModifiedNotes > 1 ? "s" : ""} recently
                    modified (last 3 days)
                  </p>
                )}
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
