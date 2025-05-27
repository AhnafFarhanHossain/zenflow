"use client";
import { useState, useEffect } from "react";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import ActivityBar from "@/components/ActivityBar";
import { TaskFormProvider } from "@/contexts/TaskFormContext";
import { AnalyticsProvider } from "@/contexts/AnalyticsContext";
import GlobalTaskForm from "@/components/GlobalTaskForm";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // Close sidebar when route changes (mobile)
  useEffect(() => {
    setSidebarOpen(false);
  }, [pathname]);

  // Lock body scroll when sidebar is open on mobile
  useEffect(() => {
    if (sidebarOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup on unmount
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [sidebarOpen]);
  return (
    <TaskFormProvider>
      <AnalyticsProvider>
        <div className="flex h-screen w-screen bg-gray-50 dark:bg-gray-900 antialiased dashboard-container">
          {/* Mobile backdrop */}
          {sidebarOpen && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 z-40 lg:hidden transition-opacity duration-300 ease-in-out"
              onClick={() => setSidebarOpen(false)}
            />
          )}
          <Sidebar
            activePath={pathname}
            mobileOpen={sidebarOpen}
            onMobileClose={() => setSidebarOpen(false)}
          />
          <div className="flex flex-col h-screen w-full">
            <ActivityBar onMobileMenuClick={() => setSidebarOpen(true)} />{" "}
            <main className="flex-1 overflow-auto p-4 sm:p-6 lg:p-6 text-sm sm:text-base lg:text-base">
              {children}
            </main>
          </div>{" "}
          {/* Global TaskForm */}
          <GlobalTaskForm />
        </div>
      </AnalyticsProvider>
    </TaskFormProvider>
  );
}
