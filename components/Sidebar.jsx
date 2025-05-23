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

const Sidebar = ({ activePath }) => {
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
      className={`h-screen ${
        collapsed ? "w-24" : "w-64"
      } bg-white border-r border-gray-200 flex flex-col transition-all duration-200 dark:bg-black dark:border-gray-800 py-3`}
      style={{
        boxShadow: "0 1px 3px 0 rgba(0, 0, 0, 0.1)",
        fontFamily: "var(--font-chakra)",
      }}
    >
      <div className={`mb-6 pt-3 ${collapsed ? "px-2" : "px-4"}`}>
        <Link
          href="/dashboard"
          className={`flex items-center group ${
            collapsed ? "justify-center px-2" : "space-x-2"
          }`}
        >
          {/* The logo placeholder */}{" "}
          <div className="w-7 h-7 bg-gray-800 dark:bg-gray-200 rounded flex items-center justify-center text-white dark:text-gray-900 text-xs font-bold">
            Z
          </div>
          {!collapsed && (
            <span className="text-sm font-semibold text-gray-800 dark:text-white">
              ZenFlow
            </span>
          )}
        </Link>
      </div>

      <nav className="flex-grow px-2">
        <ul className="space-y-1">
          {navItems.map((item, index) => {
            const Icon = item.icon;
            const isActive = activePath === item.href;
            const isDashboard = item.name === "Dashboard";

            return (
              <li key={item.name}>
                <Link
                  href={item.href}
                  className={`flex items-center ${
                    collapsed ? "justify-center" : "space-x-3"
                  } px-2 py-1.5 rounded transition-colors duration-150 group border
                    ${
                      isActive
                        ? "bg-gray-100 text-gray-900 border-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-700"
                        : "text-gray-500 border-transparent hover:bg-gray-50 hover:text-gray-800 dark:text-gray-300 dark:hover:bg-gray-800 dark:hover:text-white"
                    }`}
                  title={collapsed ? item.name : ""}
                >
                  <Icon
                    className={`h-4 w-4 ${
                      isActive
                        ? "text-gray-900 dark:text-white"
                        : "text-gray-400 group-hover:text-gray-600 dark:text-gray-500 dark:group-hover:text-gray-300"
                    }`}
                  />{" "}
                  {!collapsed && (
                    <span
                      className={`${
                        isDashboard
                          ? "text-[13px] md:text-sm"
                          : "text-xs md:text-sm"
                      }`}
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

      <div className="mt-auto border-t border-gray-200 pt-4 px-2 space-y-2 dark:border-zinc-800">
        {/* Settings link */}
        <Link
          href="/dashboard/settings"
          className={`flex items-center ${
            collapsed ? "justify-center" : "space-x-3"
          } px-2 py-1.5 rounded-sm text-gray-500 hover:bg-gray-50 hover:text-gray-800 transition-colors duration-150 border border-transparent dark:text-gray-400 dark:hover:bg-zinc-900 dark:hover:text-white`}
          title={collapsed ? "Settings" : ""}
        >
          {" "}
          <Settings className="h-4 w-4" />
          {!collapsed && <span className="text-xs md:text-sm">Settings</span>}
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
              className="p-1 rounded-sm border border-gray-200 hover:bg-gray-100 text-gray-400 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-400 dark:hover:text-white"
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
              className="p-1 rounded-sm border border-gray-200 hover:bg-gray-100 text-gray-400 hover:text-gray-700 dark:border-gray-700 dark:hover:bg-gray-800 dark:text-gray-400 dark:hover:text-white"
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
