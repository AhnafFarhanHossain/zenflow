"use client";
import Sidebar from "@/components/Sidebar";
import { usePathname } from "next/navigation";

export default function DashboardLayout({ children }) {
  const pathname = usePathname();

  return (
    <div className="flex h-screen w-screen bg-gray-100 dark:bg-black antialiased dashboard-container">
      <Sidebar activePath={pathname} />
      <main className="flex-1 overflow-auto p-6">{children}</main>
    </div>
  );
};