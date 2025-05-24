"use client";

import { usePathname } from "next/navigation";
import { useMemo } from "react";
import { Plus, FileText } from "lucide-react";

// Import the dashboard-specific components
import { PageHeader } from "./dashboard/PageHeader";
import { Clock } from "./dashboard/Clock";
import {
  ActionButton,
  NotificationBell,
  HelpButton,
} from "./dashboard/ActionButtons";

const ActivityBar = ({ className = "" }) => {
  const pathname = usePathname();

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
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
        {/* Left side - Page title and breadcrumbs */}
        <PageHeader title={pageTitle} />
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
            onClick={() => setShowForm(true)}
          >
            Create Task
          </ActionButton>
          <ActionButton
            variant="primary"
            icon={<Plus className="w-4 h-4" />}
            className="sm:hidden"
            aria-label="Create Task"
          />
          <ActionButton
            variant="secondary"
            icon={<FileText className="w-4 h-4" />}
            className="hidden sm:flex"
          >
            Create Note
          </ActionButton>
          <ActionButton
            variant="secondary"
            icon={<FileText className="w-4 h-4" />}
            className="sm:hidden"
            aria-label="Create Note"
          />
          <div className="h-6 mx-1 border-l border-gray-200 dark:border-gray-700 hidden md:block" />
          <NotificationBell />
          <HelpButton className="hidden sm:block" />
        </div>
      </div>
    </div>
  );
};

export default ActivityBar;
