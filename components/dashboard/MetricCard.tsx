import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import React from "react";

interface MetricCardProps {
  title: string;
  value: string | number;
  icon: React.ComponentType<{ className?: string }>;
  trend?: "up" | "down" | "neutral";
  trendValue?: string | number;
  color?: "gray" | "blue" | "green" | "red" | "yellow";
  loading?: boolean;
}

const MetricCard = ({
  title,
  value,
  icon: Icon,
  trend,
  trendValue,
  color = "gray",
  loading = false,
}: MetricCardProps) => {
  const colorClasses = {
    gray: {
      bg: "bg-gray-100 dark:bg-gray-800",
      text: "text-gray-600 dark:text-gray-300",
      icon: "text-gray-600 dark:text-gray-300",
    },
    blue: {
      bg: "bg-blue-100 dark:bg-blue-900/30",
      text: "text-blue-600 dark:text-blue-400",
      icon: "text-blue-600 dark:text-blue-400",
    },
    green: {
      bg: "bg-green-100 dark:bg-green-900/30",
      text: "text-green-600 dark:text-green-400",
      icon: "text-green-600 dark:text-green-400",
    },
    red: {
      bg: "bg-red-100 dark:bg-red-900/30",
      text: "text-red-600 dark:text-red-400",
      icon: "text-red-600 dark:text-red-400",
    },
    yellow: {
      bg: "bg-yellow-100 dark:bg-yellow-900/30",
      text: "text-yellow-600 dark:text-yellow-400",
      icon: "text-yellow-600 dark:text-yellow-400",
    },
  };

  const getTrendIcon = () => {
    if (trend === "up") return TrendingUp;
    if (trend === "down") return TrendingDown;
    return Minus;
  };

  const getTrendColor = () => {
    if (trend === "up") return "text-green-500";
    if (trend === "down") return "text-red-500";
    return "text-gray-500";
  };

  const TrendIcon = getTrendIcon();
  const classes = colorClasses[color] || colorClasses.gray;

  if (loading) {
    return (
      <div className="bg-white border border-gray-200 rounded-lg p-6 dark:bg-gray-900 dark:border-gray-700 animate-pulse">
        <div className="flex justify-between items-start">
          <div className="space-y-3 flex-1">
            <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-24"></div>
            <div className="h-8 bg-gray-300 dark:bg-gray-600 rounded w-16"></div>
          </div>
          <div className="w-12 h-12 bg-gray-300 dark:bg-gray-600 rounded-lg"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white border border-gray-200 rounded-lg p-6 hover:shadow-md transition-shadow duration-200 dark:bg-gray-900 dark:border-gray-700">
      <div className="flex justify-between items-start">
        <div className="space-y-1">
          <p className="text-sm font-medium text-gray-600 dark:text-gray-300">
            {title}
          </p>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold text-gray-900 dark:text-gray-100">
              {value}
            </p>
            {trend && trendValue && (
              <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
                <TrendIcon className="h-4 w-4" />
                <span className="text-sm font-medium">{trendValue}</span>
              </div>
            )}
          </div>
        </div>
        <div
          className={`w-12 h-12 rounded-lg flex items-center justify-center ${classes.bg}`}
        >
          <Icon className={`h-6 w-6 ${classes.icon}`} />
        </div>
      </div>
    </div>
  );
};

export default MetricCard;
