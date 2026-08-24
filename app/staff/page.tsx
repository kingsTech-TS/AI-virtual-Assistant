"use client";

import { useStaffDashboard } from "@/hooks/use-staff";
import { useStaffTickets } from "@/hooks/use-staff";
import { LoadingState } from "@/components/shared/LoadingState";
import { TicketStatusBadge } from "@/components/tickets/TicketStatusBadge";
import { formatRelativeTime, getPriorityBadgeClass } from "@/lib/utils";
import { useAuth } from "@/hooks/use-auth";
import Link from "next/link";
import {
  Ticket,
  CheckCircle2,
  UserCheck,
  Clock,
  ArrowRight,
  BookOpen,
  HelpCircle,
  AlertTriangle,
  MessageSquare,
} from "lucide-react";

export default function StaffDashboardPage() {
  const { user } = useAuth();
  const { data: dashboard, isLoading } = useStaffDashboard();
  const { tickets } = useStaffTickets({ limit: 5 });

  if (isLoading) {
    return <LoadingState message="Loading staff dashboard..." size="lg" />;
  }

  const stats = [
    {
      label: "Open Tickets",
      value: dashboard?.open_tickets ?? 0,
      icon: Ticket,
      color: "text-amber-600 dark:text-amber-400",
      bg: "bg-amber-50 dark:bg-amber-950/40",
      border: "border-amber-200 dark:border-amber-900/40",
    },
    {
      label: "In Progress",
      value: dashboard?.in_progress_tickets ?? 0,
      icon: Clock,
      color: "text-blue-600 dark:text-blue-400",
      bg: "bg-blue-50 dark:bg-blue-950/40",
      border: "border-blue-200 dark:border-blue-900/40",
    },
    {
      label: "Assigned to Me",
      value: dashboard?.assigned_to_me ?? 0,
      icon: UserCheck,
      color: "text-indigo-600 dark:text-indigo-400",
      bg: "bg-indigo-50 dark:bg-indigo-950/40",
      border: "border-indigo-200 dark:border-indigo-900/40",
    },
    {
      label: "Resolved Today",
      value: dashboard?.resolved_today ?? 0,
      icon: CheckCircle2,
      color: "text-emerald-600 dark:text-emerald-400",
      bg: "bg-emerald-50 dark:bg-emerald-950/40",
      border: "border-emerald-200 dark:border-emerald-900/40",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Good morning, {user?.name?.split(" ")[0] || "Advisor"} 👋
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          {user?.position || "Course Advisor"} · {user?.department_name || "Academic Services"}
        </p>
      </div>

      {/* KPI Stats */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <div
              key={stat.label}
              className={`p-5 rounded-3xl border ${stat.border} ${stat.bg} space-y-2`}
            >
              <div className="flex items-center justify-between">
                <span className="text-xs font-semibold text-slate-500 dark:text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </span>
                <Icon className={`w-4 h-4 ${stat.color}`} />
              </div>
              <p className={`text-2xl sm:text-3xl font-extrabold ${stat.color}`}>
                {stat.value}
              </p>
            </div>
          );
        })}
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Tickets (2 cols) */}
        <div className="lg:col-span-2 p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
          <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">
              My Department's Ticket Queue
            </h3>
            <Link
              href="/staff/tickets"
              className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
            >
              View all <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>

          <div className="space-y-2">
            {tickets.length === 0 ? (
              <div className="py-10 text-center">
                <CheckCircle2 className="w-8 h-8 text-emerald-500 mx-auto mb-2" />
                <p className="text-xs text-slate-400">No open tickets — queue is clear!</p>
              </div>
            ) : (
              tickets.map((ticket) => (
                <Link
                  key={ticket.id || ticket._id}
                  href={`/staff/tickets/${ticket.id || ticket._id}`}
                  className="flex items-start justify-between p-3 rounded-2xl hover:bg-slate-50 dark:hover:bg-slate-800/50 border border-transparent hover:border-slate-200 dark:hover:border-slate-700 transition-all group"
                >
                  <div className="min-w-0 space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono text-[11px] font-bold text-blue-600 dark:text-blue-400">
                        {ticket.ticket_number}
                      </span>
                      <TicketStatusBadge status={ticket.status} />
                      <span
                        className={`text-[9px] uppercase font-extrabold px-1.5 py-0.5 rounded border ${getPriorityBadgeClass(ticket.priority)}`}
                      >
                        {ticket.priority}
                      </span>
                      {ticket.priority === "urgent" && (
                        <AlertTriangle className="w-3 h-3 text-rose-500" />
                      )}
                    </div>
                    <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 truncate max-w-xs">
                      {ticket.subject}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {ticket.user_name || "Student"} · {formatRelativeTime(ticket.created_at)}
                    </p>
                  </div>
                  <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-500 shrink-0 mt-1 transition-colors" />
                </Link>
              ))
            )}
          </div>
        </div>

        {/* Quick Actions Sidebar (1 col) */}
        <div className="space-y-4">
          <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white pb-3 border-b border-slate-100 dark:border-slate-800">
              Quick Actions
            </h3>

            <div className="space-y-2">
              <Link
                href="/staff/tickets?assigned_only=true"
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-blue-50 dark:hover:bg-blue-950/30 border border-slate-200 dark:border-slate-800 hover:border-blue-200 dark:hover:border-blue-900 transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-blue-100 dark:bg-blue-900/50 text-blue-600 dark:text-blue-400 flex items-center justify-center">
                  <UserCheck className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">My Assigned Tickets</p>
                  <p className="text-[10px] text-slate-400">View only tickets assigned to you</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-blue-500 ml-auto transition-colors" />
              </Link>

              <Link
                href="/staff/knowledge"
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-indigo-50 dark:hover:bg-indigo-950/30 border border-slate-200 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900 transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-indigo-100 dark:bg-indigo-900/50 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                  <BookOpen className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Manage Knowledge Base</p>
                  <p className="text-[10px] text-slate-400">Upload handbooks & policies</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-indigo-500 ml-auto transition-colors" />
              </Link>

              <Link
                href="/staff/faqs"
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-emerald-50 dark:hover:bg-emerald-950/30 border border-slate-200 dark:border-slate-800 hover:border-emerald-200 dark:hover:border-emerald-900 transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-emerald-100 dark:bg-emerald-900/50 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                  <HelpCircle className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">Manage FAQs</p>
                  <p className="text-[10px] text-slate-400">Author frequently asked answers</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-emerald-500 ml-auto transition-colors" />
              </Link>

              <Link
                href="/dashboard/chat"
                className="flex items-center gap-3 p-3 rounded-2xl hover:bg-purple-50 dark:hover:bg-purple-950/30 border border-slate-200 dark:border-slate-800 hover:border-purple-200 dark:hover:border-purple-900 transition-all group"
              >
                <div className="w-8 h-8 rounded-xl bg-purple-100 dark:bg-purple-900/50 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                  <MessageSquare className="w-4 h-4" />
                </div>
                <div className="min-w-0">
                  <p className="text-xs font-bold text-slate-800 dark:text-slate-200">AI Chat Assistant</p>
                  <p className="text-[10px] text-slate-400">Test AI responses as staff</p>
                </div>
                <ArrowRight className="w-4 h-4 text-slate-300 group-hover:text-purple-500 ml-auto transition-colors" />
              </Link>
            </div>
          </div>

          {/* Staff Info Card */}
          <div className="p-5 rounded-3xl bg-gradient-to-br from-blue-600 to-indigo-700 text-white space-y-3 shadow-md shadow-blue-500/20">
            <p className="text-xs font-bold uppercase tracking-wider text-blue-200">Staff Portal</p>
            <p className="text-sm font-semibold leading-snug">
              You have full access to Knowledge Base & FAQ management for your department.
            </p>
            <div className="text-xs text-blue-200 space-y-1">
              <p>✅ Respond & resolve tickets</p>
              <p>✅ Upload institutional documents</p>
              <p>✅ Author & edit FAQs</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
