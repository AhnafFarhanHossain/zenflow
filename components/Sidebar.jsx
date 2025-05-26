"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import {
  LayoutDashboard,
  CheckSquare,
  Calendar,
  StickyNote,
  BarChart,
  Settings,
  ChevronLeft,
  ChevronRight,
  Moon,
  Sun,
} from "lucide-react";
import { UserButton } from "@clerk/nextjs";
import { useTheme } from "next-themes";

const Sidebar = ({ activePath, mobileOpen = false, onMobileClose }) => {
  const [collapsed, setCollapsed] = useState(false);
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  // Wait for component to mount to avoid hydration mismatch
  useEffect(() => {
    setMounted(true);
  }, []);

  const navItems = [
    {
      name: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      name: "Tasks",
      href: "/dashboard/tasks",
      icon: CheckSquare,
    },
    {
      name: "Schedule",
      href: "/dashboard/schedule",
      icon: Calendar,
    },
    {
      name: "Notes",
      href: "/dashboard/notes",
      icon: StickyNote,
    },
    {
      name: "Analytics",
      href: "/dashboard/analytics",
      icon: BarChart,
    },
  ];
  return (
    <div
      className={`h-screen bg-white border-r border-gray-200 flex flex-col dark:bg-gray-900 dark:border-gray-700 py-3
      ${
        mobileOpen
          ? "fixed inset-y-0 left-0 z-50 w-full sm:w-80 transform translate-x-0 transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0" +
            (collapsed ? " lg:w-16 xl:w-20" : " lg:w-64")
          : "fixed inset-y-0 left-0 z-50 w-full sm:w-80 transform -translate-x-full transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 lg:flex" +
            (collapsed ? " lg:w-16 xl:w-20" : " lg:w-64")
      }
      lg:transition-all lg:duration-200
      `}
      style={{
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        fontFamily: "var(--font-baiJamjuree)",
      }}
    >
      <div className={`mb-6 pt-3 ${collapsed ? "px-2" : "px-4"}`}>
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard"
            className={`flex items-center group ${
              collapsed ? "justify-center px-2" : "space-x-2"
            }`}
            onClick={onMobileClose}
          >
            {" "}
            {/* The logo placeholder */}{" "}
            <div className="w-7 h-7 sm:w-8 sm:h-8 bg-gray-100 dark:bg-gray-800 rounded-md flex items-center justify-center text-gray-900 dark:text-gray-100 text-xs sm:text-sm font-bold">
              Z
            </div>
            {!collapsed && (
              <span className="text-base sm:text-lg font-semibold text-gray-900 dark:text-white">
                ZenFlow
              </span>
            )}
          </Link>
          {/* Mobile close button */}
          {mobileOpen && (
            <button
              onClick={onMobileClose}
              className="lg:hidden p-1 rounded-md hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300 transition-all duration-200 hover:scale-105 active:scale-95"
              aria-label="Close sidebar"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
          )}
        </div>
      </div>

      <nav className="flex-grow px-2">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activePath === item.href;
            const isDashboard = item.name === "Dashboard";

            return (
              <li key={item.name}>
                {" "}
                <Link
                  href={item.href}
                  onClick={onMobileClose}
                  className={`flex items-center ${
                    collapsed ? "justify-center" : "space-x-3"
                  } px-2 py-1.5 rounded-md transition-colors duration-150 group border
                    ${
                      isActive
                        ? "bg-gray-100 text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                        : "text-gray-600 border-transparent hover:bg-gray-50 hover:text-gray-900 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                    }`}
                  title={collapsed ? item.name : ""}
                >
                  {" "}
                  <Icon
                    className={`h-5 w-5 sm:h-4 sm:w-4 lg:h-4 lg:w-4 ${
                      isActive
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-500 group-hover:text-gray-700 dark:text-gray-400 dark:group-hover:text-gray-300"
                    }`}
                  />{" "}
                  {!collapsed && (
                    <span
                      className={`${
                        isDashboard
                          ? "text-base sm:text-sm lg:text-sm"
                          : "text-sm sm:text-sm lg:text-xs"
                      } font-medium`}
                    >
                      {item.name}
                    </span>
                  )}
                </Link>
              </li>
            );
          })}
        </ul>
      </nav>

      <div className="mt-auto border-t border-gray-200 pt-4 px-2 space-y-2 dark:border-gray-700">
        {/* Settings link */}{" "}
        <Link
          href="/dashboard/settings"
          onClick={onMobileClose}
          className={`flex items-center ${
            collapsed ? "justify-center" : "space-x-3"
          } px-2 py-1.5 rounded-md text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors duration-150 border border-transparent dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-white`}
          title={collapsed ? "Settings" : ""}
        >
          {" "}
          <Settings className="h-5 w-5 sm:h-4 sm:w-4 lg:h-4 lg:w-4" />
          {!collapsed && (
            <span className="text-sm sm:text-sm lg:text-xs font-medium">
              Settings
            </span>
          )}
        </Link>
        {/* Footer with profile, theme toggle, and sidebar toggle */}
        <div
          className={`flex items-center ${
            collapsed ? "flex-col space-y-2" : "justify-between"
          } py-2`}
        >
          <UserButton
            afterSignOutUrl="/"
            appearance={{
              elements: {
                userButtonAvatarBox: "w-7 h-7",
              },
            }}
          />
          <div
            className={`flex ${
              collapsed ? "flex-col space-y-2 mt-2" : "items-center gap-1.5"
            }`}
          >
            {/* Dark mode toggle */}{" "}
            <button
              onClick={() =>
                mounted && setTheme(theme === "dark" ? "light" : "dark")
              }
              className="p-1 rounded-md border border-gray-200 hover:bg-gray-50 text-gray-600 hover:text-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-400 dark:hover:text-white"
              title="Toggle theme"
              aria-label="Toggle theme"
            >
              {mounted &&
                (theme === "dark" ? (
                  <Sun className="h-3.5 w-3.5" />
                ) : (
                  <Moon className="h-3.5 w-3.5" />
                ))}
            </button>
            {/* Sidebar toggle */}{" "}
            <button
              onClick={() => setCollapsed(!collapsed)}
              className="p-1 rounded-md border border-gray-200 hover:bg-gray-50 text-gray-600 hover:text-gray-900 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-400 dark:hover:text-white"
              aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
              title={collapsed ? "Expand sidebar" : "Collapse sidebar"}
            >
              {collapsed ? (
                <ChevronRight className="h-3.5 w-3.5" />
              ) : (
                <ChevronLeft className="h-3.5 w-3.5" />
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
