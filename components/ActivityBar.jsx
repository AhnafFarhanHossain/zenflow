"use client";

import { usePathname } from "next/navigation";
import { useMemo, useState, useEffect } from "react";
import { Plus, FileText, Menu } from "lucide-react";
import { useTaskForm } from "@/contexts/TaskFormContext";
import { useNoteForm } from "@/contexts/NoteFormContext";

// Import the dashboard-specific components
import { PageHeader } from "./dashboard/PageHeader";
import { Clock } from "./dashboard/Clock";
import {
  ActionButton,
  NotificationBell,
  HelpButton,
} from "./dashboard/ActionButtons";
import { useUser, useAuth } from "@clerk/nextjs";
import { getSupabaseWithAuth } from "@/utils/supabaseWithAuth";

const ActivityBar = ({ className = "", onMobileMenuClick }) => {
  const pathname = usePathname();
  const { openTaskForm } = useTaskForm();
  const { openNoteForm } = useNoteForm();
  const { user } = useUser();
  const { getToken } = useAuth();
  const [upcomingTasks, setUpcomingTasks] = useState([]);
  useEffect(() => {
    const fetchUpcomingTasks = async () => {
      if (!user) return;

      try {
        const now = new Date();
        const tomorrow = new Date(now);
        tomorrow.setDate(now.getDate() + 1);

        const supabase = await getSupabaseWithAuth(getToken);
        const { data, error } = await supabase
          .from("tasks")
          .select("id, title, due_date")
          .eq("user_id", user.id)
          .lt("due_date", tomorrow.toISOString())
          .gte("due_date", now.toISOString()) // Tasks due from now until tomorrow
          .neq("status", "done") // Exclude completed tasks
          .order("due_date", { ascending: true }); // Order by due date

        if (error) {
          console.error("Error fetching upcoming tasks:", error);
          setUpcomingTasks([]); // Set to empty array on error
          return;
        }
        setUpcomingTasks(data || []);
      } catch (error) {
        console.error("Error in fetchUpcomingTasks:", error);
        setUpcomingTasks([]);
      }
    };

    fetchUpcomingTasks();
    // Optionally, set up a poller or real-time listener if tasks can change frequently
    const intervalId = setInterval(fetchUpcomingTasks, 60000); // Refresh every minute

    return () => clearInterval(intervalId);
  }, [user]);

  // Get current page title from path
  const pageTitle = useMemo(() => {
    const segments = pathname.split("/").filter(Boolean);
    if (segments.length === 0) return "Dashboard";

    // Get the last segment and capitalize it
    const lastSegment = segments[segments.length - 1];
    return lastSegment.charAt(0).toUpperCase() + lastSegment.slice(1);
  }, [pathname]);
  return (
    <div
      className={`py-4 px-4 md:px-6 border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-900 ${className}`}
    >
      {" "}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Left side - Mobile menu button and Page title */}
        <div className="flex items-center gap-3">
          {/* Mobile menu button */}{" "}
          <button
            onClick={onMobileMenuClick}
            className="lg:hidden p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-md text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-gray-300 transition-all duration-200 hover:scale-105 active:scale-95"
            aria-label="Open sidebar"
          >
            <Menu className="w-5 h-5" />
          </button>
          <PageHeader title={pageTitle} />
        </div>
        {/* Right side - Actions and utilities */}
        <div className="flex items-center gap-2 md:gap-3 self-end sm:self-center">
          {" "}
          <div className="hidden md:flex">
            <Clock />
          </div>
          <div className="h-6 mx-1 border-l border-gray-200 dark:border-gray-700 hidden md:block" />{" "}
          <ActionButton
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            className="hidden sm:flex"
            onClick={() => openTaskForm()}
          >
            Create Task
          </ActionButton>
          <ActionButton
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            className="sm:hidden"
            onClick={() => openTaskForm()}
            aria-label="Create Task"
          />{" "}
          <ActionButton
            variant="secondary"
            icon={<FileText className="w-4 h-4" />}
            className="hidden sm:flex"
            onClick={() => openNoteForm()}
          >
            Create Note
          </ActionButton>
          <ActionButton
            variant="secondary"
            icon={<FileText className="w-4 h-4" />}
            className="sm:hidden"
            onClick={() => openNoteForm()}
            aria-label="Create Note"
          />
          <div className="h-6 mx-1 border-l border-gray-200 dark:border-gray-700 hidden md:block" />
          <NotificationBell upcomingTasks={upcomingTasks} />
          <HelpButton className="hidden sm:block" />
        </div>
      </div>
    </div>
  );
};

export default ActivityBar;
