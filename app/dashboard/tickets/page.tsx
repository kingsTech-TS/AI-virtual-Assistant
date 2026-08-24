"use client";

import { useState } from "react";
import Link from "next/link";
import { useTickets } from "@/hooks/use-tickets";
import { TicketStatus, TicketPriority } from "@/types/ticket";
import { TicketStatusBadge } from "@/components/tickets/TicketStatusBadge";
import { TicketCreateModal } from "@/components/tickets/TicketCreateModal";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingState } from "@/components/shared/LoadingState";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { getPriorityBadgeClass, formatRelativeTime } from "@/lib/utils";
import { Ticket, Plus, Search, MessageSquare, ArrowRight, Filter } from "lucide-react";

export default function StudentTicketsPage() {
  const [page, setPage] = useState(1);
  const [statusFilter, setStatusFilter] = useState<TicketStatus | undefined>(undefined);
  const [searchTerm, setSearchTerm] = useState("");
  const [createModalOpen, setCreateModalOpen] = useState(false);

  const { data, isLoading } = useTickets({
    page,
    limit: 10,
    status: statusFilter,
  });

  const tickets = data?.items || [];
  const pagination = data?.pagination;

  const filtered = tickets.filter(
    (t) =>
      t.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
      t.ticket_number.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Support Requests & Escalations
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Track inquiries escalated to departmental course advisors and administrative officers.
          </p>
        </div>

        <button
          onClick={() => setCreateModalOpen(true)}
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto cursor-pointer"
        >
          <Plus className="w-4 h-4" />
          <span>New Support Ticket</span>
        </button>
      </div>

      {/* Filter & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
        {/* Search */}
        <div className="relative w-full sm:max-w-xs">
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search tickets by subject or #..."
            className="w-full pl-10 pr-4 py-2 text-xs rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-hidden shadow-xs"
          />
        </div>

        {/* Status Filters */}
        <div className="flex items-center gap-1.5 overflow-x-auto w-full sm:w-auto pb-1 sm:pb-0">
          <Filter className="w-3.5 h-3.5 text-slate-400 shrink-0 hidden sm:block mr-1" />
          {[
            { label: "All", value: undefined },
            { label: "Open", value: "open" as TicketStatus },
            { label: "In Progress", value: "in_progress" as TicketStatus },
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
                  ? "bg-blue-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>
      </div>

      {/* Ticket List Table / Cards */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
        {isLoading ? (
          <LoadingState message="Loading support tickets..." />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={Ticket}
            title={searchTerm || statusFilter ? "No matching tickets" : "No support requests"}
            description={
              searchTerm || statusFilter
                ? "Try clearing filters to see other support requests."
                : "You don't have any support tickets currently logged."
            }
            action={
              <button
                onClick={() => setCreateModalOpen(true)}
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700"
              >
                <Plus className="w-3.5 h-3.5" />
                <span>Create Support Ticket</span>
              </button>
            }
          />
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {filtered.map((ticket) => {
              const id = ticket.id || ticket._id || "";
              return (
                <Link
                  key={id}
                  href={`/dashboard/tickets/${id}`}
                  className="flex flex-col sm:flex-row sm:items-center justify-between p-4 sm:p-5 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group gap-3"
                >
                  <div className="flex-1 min-w-0 pr-4">
                    <div className="flex items-center gap-2 flex-wrap mb-1.5">
                      <span className="font-mono font-bold text-xs text-blue-600 dark:text-blue-400">
                        {ticket.ticket_number}
                      </span>
                      <TicketStatusBadge status={ticket.status} />
                      <span
                        className={`text-[9px] uppercase font-bold px-2 py-0.5 rounded-md border ${getPriorityBadgeClass(
                          ticket.priority
                        )}`}
                      >
                        {ticket.priority} priority
                      </span>
                      {ticket.category && (
                        <span className="text-[10px] text-slate-500 dark:text-slate-400 capitalize bg-slate-100 dark:bg-slate-800 px-2 py-0.5 rounded-md">
                          {ticket.category.replace("_", " ")}
                        </span>
                      )}
                    </div>

                    <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {ticket.subject}
                    </h3>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-1">
                      {ticket.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 text-xs text-slate-400 shrink-0">
                    <div className="text-left sm:text-right">
                      <p className="text-[11px] text-slate-500 dark:text-slate-400">
                        {formatRelativeTime(ticket.updated_at || ticket.created_at)}
                      </p>
                      {ticket.comments?.length > 0 && (
                        <span className="inline-flex items-center gap-1 text-[10px] text-blue-600 dark:text-blue-400 mt-0.5">
                          <MessageSquare className="w-3 h-3" />
                          {ticket.comments.length} replies
                        </span>
                      )}
                    </div>

                    <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all" />
                  </div>
                </Link>
              );
            })}
          </div>
        )}

        <PaginationControls
          pagination={pagination}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>

      <TicketCreateModal
        isOpen={createModalOpen}
        onClose={() => setCreateModalOpen(false)}
      />
    </div>
  );
}
