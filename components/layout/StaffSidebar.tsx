"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Ticket,
  BookOpen,
  HelpCircle,
  MessageSquare,
  LogOut,
  Sparkles,
  GraduationCap,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";

const STAFF_NAV = [
  { href: "/staff", label: "My Dashboard", icon: LayoutDashboard },
  { href: "/staff/tickets", label: "Ticket Queue", icon: Ticket },
  { href: "/staff/knowledge", label: "Knowledge Base", icon: BookOpen },
  { href: "/staff/faqs", label: "FAQs", icon: HelpCircle },
];

interface StaffSidebarProps {
  onClose?: () => void;
}

export function StaffSidebar({ onClose }: StaffSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-full shrink-0">
      {/* Brand */}
      <div className="h-16 px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <Link
          href="/staff"
          onClick={onClose}
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Staff Portal Logo"
              width={64}
              height={64}
              className="w-full h-full object-contain dark:hidden"
            />
            <Image
              src="/logo2.png"
              alt="Staff Portal Logo"
              width={64}
              height={64}
              className="w-full h-full object-contain hidden dark:block"
            />
          </div>
          <div>
            <span className="font-bold text-sm text-slate-900 dark:text-white tracking-tight flex items-center gap-1">
              Staff Portal
              <span className="text-[9px] uppercase tracking-wider font-bold px-1.5 rounded-md bg-blue-100 dark:bg-blue-900/60 text-blue-700 dark:text-blue-300">
                Advisor
              </span>
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              {user?.department_name || "Academic Services"}
            </p>
          </div>
        </Link>

        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Advisor Tools
        </div>
        {STAFF_NAV.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/staff" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                isActive
                  ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100",
              )}
            >
              <Icon
                className={cn(
                  "w-4 h-4 transition-colors",
                  isActive
                    ? "text-blue-600 dark:text-blue-400"
                    : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300",
                )}
              />
              <span>{item.label}</span>
            </Link>
          );
        })}

        <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
          <Link
            href="/dashboard"
            onClick={onClose}
            className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-medium text-slate-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
          >
            <Sparkles className="w-3.5 h-3.5 text-blue-500" />
            <span>Student Portal (Chat AI)</span>
          </Link>
        </div>
      </nav>

      {/* Staff Profile & Logout */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3 overflow-hidden">
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0">
              {user?.name ? user.name[0].toUpperCase() : "S"}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate">
                {user?.name || "Course Advisor"}
              </p>
              <p className="text-[10px] text-slate-400 uppercase tracking-wider truncate">
                {user?.position || "Staff Advisor"}
              </p>
            </div>
          </div>
          <button
            onClick={() => logout()}
            className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/50 transition-colors shrink-0"
            title="Sign out"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      </div>
    </aside>
  );
}
