"use client";
import { useUser } from "@clerk/nextjs";
import { Calendar, CheckSquare, Clock, BarChartHorizontal } from "lucide-react";

const Dashboard = () => {
  const { user } = useUser();

  const stats = [
    { title: "Tasks Pending", value: "5", icon: CheckSquare },
    { title: "Calendar Events", value: "3", icon: Calendar },
    { title: "Time Tracked", value: "4.5h", icon: Clock },
    { title: "Productivity", value: "85%", icon: BarChartHorizontal },
  ];

  return (
    <div className="space-y-6" style={{ fontFamily: "var(--font-chakra)" }}>
      {" "}
      {/* Welcome section */}
      <header className="bg-white border border-gray-200 rounded-sm p-4 dark:bg-black dark:border-gray-800">
        <h1 className="text-base md:text-lg font-medium text-gray-900 dark:text-white">
          Welcome back, {user?.firstName || "User"}
        </h1>
        <p className="text-xs md:text-sm text-gray-500 dark:text-gray-400 mt-1">
          Here's what's happening with your tasks today.
        </p>
      </header>
      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-sm p-4 flex justify-between items-center dark:bg-black dark:border-gray-800"
            >
              {" "}
              <div>
                <p className="text-xs md:text-sm font-medium text-gray-500 dark:text-gray-400">
                  {stat.title}
                </p>
                <p className="text-lg md:text-xl font-semibold mt-1 dark:text-white">
                  {stat.value}
                </p>
              </div>
              <div className="w-8 h-8 rounded-sm bg-gray-100 flex items-center justify-center dark:bg-gray-900">
                <Icon className="h-4 w-4 text-gray-700 dark:text-gray-300 cursor-pointer" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
