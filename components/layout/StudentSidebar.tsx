"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import {
  LayoutDashboard,
  Bot,
  MessageSquare,
  Ticket,
  Bell,
  User,
  GraduationCap,
  LogOut,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import { useNotifications } from "@/hooks/use-notifications";

const NAV_ITEMS = [
  { href: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { href: "/dashboard/chat", label: "AI Assistant", icon: Bot },
  {
    href: "/dashboard/conversations",
    label: "Conversations",
    icon: MessageSquare,
  },
  { href: "/dashboard/tickets", label: "Support Requests", icon: Ticket },
  {
    href: "/dashboard/notifications",
    label: "Notifications",
    icon: Bell,
    hasBadge: true,
  },
  { href: "/dashboard/profile", label: "Profile", icon: User },
];

interface StudentSidebarProps {
  onClose?: () => void;
}

export function StudentSidebar({ onClose }: StudentSidebarProps) {
  const pathname = usePathname();
  const { user, logout } = useAuth();
  const { unreadCount } = useNotifications(true);

  return (
    <aside className="w-64 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-full shrink-0">
      {/* Brand */}
      <div className="h-16 px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
        <Link
          href="/dashboard"
          onClick={onClose}
          className="flex items-center gap-3"
        >
          <div className="w-11 h-11 flex items-center justify-center">
            <Image
              src="/logo.png"
              alt="Academic Portal Logo"
              width={64}
              height={64}
              className="w-full h-full object-contain dark:hidden"
            />
            <Image
              src="/logo2.png"
              alt="Academic Portal Logo"
              width={64}
              height={64}
              className="w-full h-full object-contain hidden dark:block"
            />
          </div>
          <div>
            <span className="font-bold text-sm text-slate-900 dark:text-white tracking-tight">
              Academic Portal
            </span>
            <p className="text-[11px] text-slate-500 dark:text-slate-400 font-medium">
              Student Assistant
            </p>
          </div>
        </Link>

        {onClose && (
          <button
            onClick={onClose}
            className="lg:hidden p-1.5 rounded-xl text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-800"
            title="Close menu"
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Navigation Links */}
      <nav className="flex-1 p-4 space-y-1.5 overflow-y-auto">
        <div className="px-3 py-1.5 text-[11px] font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-wider">
          Student Menu
        </div>
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon;
          const isActive =
            pathname === item.href ||
            (item.href !== "/dashboard" && pathname.startsWith(item.href));
          return (
            <Link
              key={item.href}
              href={item.href}
              onClick={onClose}
              className={cn(
                "flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium transition-all group",
                isActive
                  ? "bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 font-semibold shadow-xs"
                  : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-slate-100",
              )}
            >
              <div className="flex items-center gap-3">
                <Icon
                  className={cn(
                    "w-4 h-4 transition-colors",
                    isActive
                      ? "text-blue-600 dark:text-blue-400"
                      : "text-slate-400 group-hover:text-slate-600 dark:group-hover:text-slate-300",
                  )}
                />
                <span>{item.label}</span>
              </div>
              {item.hasBadge && unreadCount > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-bold rounded-full bg-blue-600 text-white">
                  {unreadCount}
                </span>
              )}
            </Link>
          );
        })}

        {user &&
          (user.role === "staff" ||
            user.role === "admin" ||
            user.role === "super_admin") && (
            <div className="pt-4 mt-4 border-t border-slate-200 dark:border-slate-800">
              <Link
                href={user.role === "staff" ? "/staff" : "/admin"}
                onClick={onClose}
                className="flex items-center gap-3 px-3 py-2 rounded-xl text-xs font-semibold text-blue-600 dark:text-blue-400 bg-blue-50/60 dark:bg-blue-950/40 hover:bg-blue-100 dark:hover:bg-blue-900/60 transition-colors"
              >
                <GraduationCap className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                <span>
                  Switch to{" "}
                  {user.role === "staff" ? "Staff Portal" : "Admin Suite"}
                </span>
              </Link>
            </div>
          )}
      </nav>

      {/* Student Profile Quick View & Sign Out */}
      <div className="p-4 border-t border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50">
        <div className="flex items-center justify-between">
          <Link
            href="/dashboard/profile"
            onClick={onClose}
            className="flex items-center gap-3 overflow-hidden group"
          >
            <div className="w-8 h-8 rounded-full bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 flex items-center justify-center font-bold text-xs shrink-0 group-hover:scale-105 transition-transform">
              {user?.name ? user.name[0].toUpperCase() : "S"}
            </div>
            <div className="truncate">
              <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400">
                {user?.name || "Student"}
              </p>
              <p className="text-[10px] text-slate-400 truncate">
                {user?.matric_number || user?.email || "Student Portal"}
              </p>
            </div>
          </Link>
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
