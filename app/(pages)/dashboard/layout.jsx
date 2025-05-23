"use client";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";
import ActivityBar from "@/components/ActivityBar";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();
  return (
    <div className="flex h-screen w-screen bg-gray-100 dark:bg-black antialiased dashboard-container">
      <Sidebar activePath={pathname} />
      <div className="flex flex-col h-screen w-full">
        <ActivityBar />
        <main className="flex-1 overflow-auto p-4 md:p-6 text-sm md:text-base">
          {children}
        </main>
      </div>
    </div>
  );
}
