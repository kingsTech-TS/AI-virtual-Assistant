"use client";

import { useState } from "react";
import Link from "next/link";
import { useTickets } from "@/hooks/use-tickets";
import { TicketStatus, TicketPriority } from "@/types/ticket";
import { TicketStatusBadge } from "@/components/tickets/TicketStatusBadge";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingState } from "@/components/shared/LoadingState";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { getPriorityBadgeClass, formatDate, formatRelativeTime } from "@/lib/utils";
import { Ticket, Search, Filter, Eye, MessageSquare, ArrowRight, User } from "lucide-react";

export default function AdminTicketsPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<TicketStatus | undefined>(undefined);
  const [priorityFilter, setPriorityFilter] = useState<TicketPriority | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");

  const { data, isLoading } = useTickets({
    page,
    limit: 10,
    status: statusFilter,
    priority: priorityFilter,
  });

  const tickets = data?.items || [];
  const pagination = data?.pagination;

  const filtered = tickets.filter(
    (t) =>
      t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.ticket_number.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.user_name?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          Support Requests Helpdesk
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
          Triage escalated student inquiries, assign course advisors, and respond with official clearances.
        </p>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search by ticket #, subject, or student..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-hidden shadow-xs"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:block mr-1" />
          {[
            { label: "All", value: undefined },
            { label: "Open", value: "open" as TicketStatus },
            { label: "In Progress", value: "in_progress" as TicketStatus },
            { label: "Waiting", value: "waiting" as TicketStatus },
            { label: "Resolved", value: "resolved" as TicketStatus },
            { label: "Closed", value: "closed" as TicketStatus },
          ].map((tab) => (
            <button
              key={tab.label}
              onClick={() => {
                setStatusFilter(tab.value);
                setPage(1);
              }}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all shrink-0 ${
                statusFilter === tab.value
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ticket Helpdesk Table */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
        {isLoading ? (
          <LoadingState message="Loading ticket queue..." />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Ticket}
            title={searchTerm || statusFilter ? "No matching tickets" : "Ticket queue is clear"}
            description="No pending student support escalations found in the system."
          />
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200/80 dark:border-slate-800">
                <tr>
                  <th className="px-6 py-4">Ticket</th>
                  <th className="px-4 py-4">Student</th>
                  <th className="px-4 py-4">Subject</th>
                  <th className="px-4 py-4">Status</th>
                  <th className="px-4 py-4">Priority</th>
                  <th className="px-4 py-4">Assigned To</th>
                  <th className="px-4 py-4">Created</th>
                  <th className="px-6 py-4 text-right">Action</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {filtered.map((ticket) => {
                  const id = ticket.id || ticket._id || "";
                  return (
                    <tr
                      key={id}
                      className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors"
                    >
                      <td className="px-6 py-4 font-mono font-bold text-indigo-600 dark:text-indigo-400">
                        {ticket.ticket_number}
                      </td>

                      <td className="px-4 py-4">
                        <div className="flex items-center gap-2">
                          <div className="w-6 h-6 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center text-[10px] font-bold">
                            {ticket.user_name ? ticket.user_name[0].toUpperCase() : "U"}
                          </div>
                          <span className="font-semibold text-slate-800 dark:text-slate-200">
                            {ticket.user_name || "Student"}
                          </span>
                        </div>
                      </td>

                      <td className="px-4 py-4 font-semibold text-slate-900 dark:text-white max-w-xs truncate">
                        {ticket.subject}
                      </td>

                      <td className="px-4 py-4">
                        <TicketStatusBadge status={ticket.status} />
                      </td>

                      <td className="px-4 py-4">
                        <span
                          className={`px-2 py-0.5 rounded-md text-[10px] uppercase font-bold border ${getPriorityBadgeClass(
                            ticket.priority
                          )}`}
                        >
                          {ticket.priority}
                        </span>
                      </td>

                      <td className="px-4 py-4 text-slate-500 dark:text-slate-400">
                        {ticket.assigned_to_name || "Unassigned"}
                      </td>

                      <td className="px-4 py-4 text-slate-400">
                        {formatRelativeTime(ticket.created_at)}
                      </td>

                      <td className="px-6 py-4 text-right">
                        <Link
                          href={`/admin/tickets/${id}`}
                          className="inline-flex items-center gap-1 px-3 py-1.5 text-xs font-semibold rounded-xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 hover:bg-indigo-100 dark:hover:bg-indigo-900/80 transition-colors"
                        >
                          <span>Manage</span>
                          <ArrowRight className="w-3 h-3" />
                        </Link>
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
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
