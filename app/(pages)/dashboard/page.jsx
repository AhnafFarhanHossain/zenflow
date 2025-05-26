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
    <div
      className="space-y-6"
      style={{ fontFamily: "var(--font-baiJamjuree)" }}
    >
      {" "}
      {/* Welcome section */}
      <header className="bg-white border border-gray-200 rounded-md p-4 sm:p-6 dark:bg-gray-900 dark:border-gray-700">
        <h1 className="text-lg sm:text-xl lg:text-lg font-semibold text-gray-900 dark:text-gray-100">
          Welcome back, {user?.firstName || "User"}
        </h1>
        <p className="text-sm sm:text-base lg:text-sm text-gray-600 dark:text-gray-300 mt-1 leading-relaxed">
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
              className="bg-white border border-gray-200 rounded-md p-4 sm:p-5 flex justify-between items-center dark:bg-gray-900 dark:border-gray-700"
            >
              {" "}
              <div>
                <p className="text-sm sm:text-sm lg:text-sm font-medium text-gray-600 dark:text-gray-300">
                  {stat.title}
                </p>
                <p className="text-xl sm:text-2xl lg:text-xl font-bold mt-1 text-gray-900 dark:text-gray-100">
                  {stat.value}
                </p>
              </div>
              <div className="w-10 h-10 sm:w-8 sm:h-8 lg:w-8 lg:h-8 rounded-md bg-gray-100 flex items-center justify-center dark:bg-gray-800">
                <Icon className="h-5 w-5 sm:h-4 sm:w-4 lg:h-4 lg:w-4 text-gray-600 dark:text-gray-300 cursor-pointer" />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
