"use client";

import { useState } from "react";
import { useNotifications } from "@/hooks/use-notifications";
import { Bell, CheckCheck, Clock, Ticket, BookOpen, Info, ArrowRight } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingState } from "@/components/shared/LoadingState";
import { PaginationControls } from "@/components/shared/PaginationControls";
import Link from "next/link";

export default function NotificationsPage() {
  const [page, setPage] = useState(1);
  const [unreadOnly, setUnreadOnly] = useState(false);

  const { notifications, isLoading, markAsRead, data } = useNotifications(unreadOnly, {
    page,
    limit: 15,
  });

  const pagination = data?.pagination;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "ticket_created":
      case "ticket_updated":
      case "ticket_assigned":
      case "ticket_resolved":
        return <Ticket className="w-4 h-4 text-amber-500" />;
      case "knowledge_added":
        return <BookOpen className="w-4 h-4 text-blue-500" />;
      default:
        return <Info className="w-4 h-4 text-slate-500" />;
    }
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Notifications & Announcements
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Real-time updates regarding your support requests and academic updates.
          </p>
        </div>

        {/* Filter toggle */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => setUnreadOnly(false)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
              !unreadOnly
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
            }`}
          >
            All
          </button>
          <button
            onClick={() => setUnreadOnly(true)}
            className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-colors ${
              unreadOnly
                ? "bg-blue-600 text-white"
                : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800"
            }`}
          >
            Unread
          </button>
        </div>
      </div>

      {/* Notifications List */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
        {isLoading ? (
          <LoadingState message="Loading notifications..." />
        ) : notifications.length === 0 ? (
          <EmptyState
            icon={Bell}
            title={unreadOnly ? "No unread notifications" : "You're all caught up"}
            description="When your support tickets are updated or answers are posted, notifications will appear here."
          />
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {notifications.map((n) => {
              const id = n.id || n._id || "";
              return (
                <div
                  key={id}
                  className={`flex items-start justify-between p-4 sm:p-5 transition-colors ${
                    n.is_read
                      ? "hover:bg-slate-50 dark:hover:bg-slate-800/40 opacity-80"
                      : "bg-blue-50/40 dark:bg-blue-950/20 hover:bg-blue-50/60 dark:hover:bg-blue-950/30"
                  }`}
                >
                  <div className="flex items-start gap-3.5 flex-1 min-w-0 pr-4">
                    <div className="w-9 h-9 rounded-2xl bg-white dark:bg-slate-800 border border-slate-200/80 dark:border-slate-700 flex items-center justify-center shrink-0 shadow-xs">
                      {getNotificationIcon(n.type)}
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                          {n.title}
                        </h3>
                        {!n.is_read && (
                          <span className="w-2 h-2 rounded-full bg-blue-600 shrink-0"></span>
                        )}
                      </div>
                      <p className="text-xs text-slate-600 dark:text-slate-300 mt-1 leading-relaxed">
                        {n.message}
                      </p>
                      <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-2">
                        <Clock className="w-3 h-3" />
                        <span>{formatRelativeTime(n.created_at)}</span>
                      </div>
                    </div>
                  </div>

                  {!n.is_read && (
                    <button
                      type="button"
                      onClick={() => markAsRead(id)}
                      className="inline-flex items-center gap-1 px-2.5 py-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/50 rounded-xl transition-colors shrink-0"
                      title="Mark as read"
                    >
                      <CheckCheck className="w-3.5 h-3.5" />
                      <span className="hidden sm:inline">Mark read</span>
                    </button>
                  )}
                </div>
              );
            })}
          </div>
        )}

        <PaginationControls
          pagination={pagination}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>
    </div>
  );
}
