"use client";

import { ChevronRight } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";

export const PageHeader = ({ title, className = "" }) => {
  const pathname = usePathname();

  const breadcrumbs = useMemo(() => {
    // Remove the first empty string from splitting the path
    const segments = pathname.split("/").filter(Boolean);

    // Create breadcrumb items
    return segments.map((segment, index) => {
      const href = `/${segments.slice(0, index + 1).join("/")}`;
      const label = segment.charAt(0).toUpperCase() + segment.slice(1);

      return {
        href,
        label,
        isLast: index === segments.length - 1,
      };
    });
  }, [pathname]);

  return (
    <div className={`flex gap-4 space-y-1 ${className}`}>
      {" "}
      <h1 className="text-xl sm:text-2xl lg:text-2xl font-semibold text-gray-900 dark:text-white truncate">
        {title}
      </h1>
      {breadcrumbs.length > 0 && (
        <div className="flex items-center flex-wrap space-x-1 text-sm sm:text-base lg:text-base text-gray-500 dark:text-gray-400">
          <Link
            href="/"
            className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors whitespace-nowrap"
          >
            Home
          </Link>

          {breadcrumbs.map((breadcrumb, index) => (
            <div key={index} className="flex items-center">
              {" "}
              <ChevronRight className="w-4 h-4 sm:w-3 sm:h-3 lg:w-3 lg:h-3 mx-1 flex-shrink-0" />{" "}
              {breadcrumb.isLast ? (
                <span className="text-gray-700 dark:text-gray-300 truncate max-w-[120px] sm:max-w-[150px] lg:max-w-none font-medium">
                  {breadcrumb.label}
                </span>
              ) : (
                <Link
                  href={breadcrumb.href}
                  className="hover:text-gray-700 dark:hover:text-gray-300 transition-colors truncate max-w-[120px] sm:max-w-none"
                >
                  {breadcrumb.label}
                </Link>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
