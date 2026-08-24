"use client";

import Link from "next/link";
import { ThemeToggle } from "./ThemeToggle";
import { useAuth } from "@/hooks/use-auth";
import { useNotifications } from "@/hooks/use-notifications";
import { Bell, Menu, Search, User as UserIcon } from "lucide-react";
import { useState } from "react";
import { formatRelativeTime } from "@/lib/utils";

interface HeaderProps {
  title?: string;
  subtitle?: string;
  onMenuClick?: () => void;
  showSearch?: boolean;
}

export function Header({ title, subtitle, onMenuClick, showSearch = false }: HeaderProps) {
  const { user } = useAuth();
  const { notifications, unreadCount, markAsRead } = useNotifications();
  const [showNotifs, setShowNotifs] = useState(false);

  return (
    <header className="h-16 border-b border-slate-200 dark:border-slate-800 bg-white/80 dark:bg-slate-900/80 backdrop-blur-md px-4 sm:px-6 flex items-center justify-between sticky top-0 z-30">
      {/* Left: Hamburger + Title */}
      <div className="flex items-center gap-3 min-w-0">
        {/* Hamburger — always visible on lg and below */}
        <button
          onClick={onMenuClick}
          className="lg:hidden p-2 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
          aria-label="Open menu"
        >
          <Menu className="w-5 h-5" />
        </button>

        <div className="min-w-0">
          {title && (
            <h1 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white tracking-tight truncate">
              {title}
            </h1>
          )}
          {subtitle && (
            <p className="text-[11px] text-slate-500 dark:text-slate-400 hidden sm:block truncate">
              {subtitle}
            </p>
          )}
        </div>
      </div>

      {/* Right Controls */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {showSearch && (
          <div className="relative hidden md:block">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              placeholder="Search..."
              className="pl-9 pr-4 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 w-40 focus:w-56 transition-all outline-none"
            />
          </div>
        )}

        <ThemeToggle />

        {/* Notifications Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowNotifs(!showNotifs)}
            className="relative p-2 rounded-xl text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800 border border-slate-200 dark:border-slate-800 transition-colors"
            title="Notifications"
          >
            <Bell className="w-4 h-4" />
            {unreadCount > 0 && (
              <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-600 text-white rounded-full text-[9px] font-bold flex items-center justify-center animate-pulse">
                {unreadCount}
              </span>
            )}
          </button>

          {showNotifs && (
            <>
              {/* Backdrop dismiss */}
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowNotifs(false)}
              />
              <div className="absolute right-0 mt-2 w-72 sm:w-80 rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 shadow-xl p-3 z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
                  <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                    Notifications
                  </span>
                  <Link
                    href="/dashboard/notifications"
                    onClick={() => setShowNotifs(false)}
                    className="text-xs text-blue-600 dark:text-blue-400 hover:underline"
                  >
                    View all
                  </Link>
                </div>
                <div className="divide-y divide-slate-100 dark:divide-slate-800/60 max-h-64 overflow-y-auto mt-1">
                  {notifications.length === 0 ? (
                    <p className="text-xs text-slate-400 py-6 text-center">No notifications yet</p>
                  ) : (
                    notifications.slice(0, 5).map((n) => (
                      <div
                        key={n.id || n._id}
                        onClick={() => !n.is_read && markAsRead(n.id || n._id || "")}
                        className={`p-2.5 rounded-xl cursor-pointer transition-colors ${
                          n.is_read
                            ? "opacity-75 hover:bg-slate-50 dark:hover:bg-slate-800/40"
                            : "bg-blue-50/50 dark:bg-blue-950/30 hover:bg-blue-50 dark:hover:bg-blue-950/50"
                        }`}
                      >
                        <p className="text-xs font-semibold text-slate-800 dark:text-slate-200">{n.title}</p>
                        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-0.5 line-clamp-2">{n.message}</p>
                        <span className="text-[10px] text-slate-400 mt-1 block">
                          {formatRelativeTime(n.created_at)}
                        </span>
                      </div>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </div>

        {/* Profile Avatar */}
        <Link
          href="/dashboard/profile"
          className="flex items-center gap-2 pl-2 border-l border-slate-200 dark:border-slate-800 group"
        >
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-blue-600 to-indigo-600 text-white flex items-center justify-center font-bold text-xs shadow-xs group-hover:scale-105 transition-transform">
            {user?.name ? user.name[0].toUpperCase() : <UserIcon className="w-4 h-4" />}
          </div>
          <span className="hidden sm:block text-xs font-semibold text-slate-700 dark:text-slate-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 max-w-[80px] truncate">
            {user?.name?.split(" ")[0] || "Account"}
          </span>
        </Link>
      </div>
    </header>
  );
}
