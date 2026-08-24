"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTicketDetail } from "@/hooks/use-tickets";
import { useAuth } from "@/hooks/use-auth";
import { TicketStatusBadge } from "@/components/tickets/TicketStatusBadge";
import { TicketTimeline } from "@/components/tickets/TicketTimeline";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { getPriorityBadgeClass, formatDate, formatRelativeTime } from "@/lib/utils";
import { ArrowLeft, Send, CheckCircle2, Building2, User, Clock, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

export default function TicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const ticketId = resolvedParams.id;
  const router = useRouter();
  const { user } = useAuth();
  const { data: ticket, isLoading, isError, updateTicket, isUpdating } = useTicketDetail(ticketId);

  const [replyText, setReplyText] = useState("");

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!replyText.trim()) return;

    try {
      await updateTicket({
        comment: replyText.trim(),
      });
      setReplyText("");
    } catch {
      // Handled via toast in hook
    }
  };

  const handleCloseTicket = async () => {
    try {
      await updateTicket({
        status: "closed",
        comment: "Ticket closed by student.",
      });
      toast.success("Ticket closed");
    } catch {
      // Handled in hook
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading ticket details..." size="lg" />;
  }

  if (isError || !ticket) {
    return (
      <ErrorState
        title="Ticket Not Found"
        message="Unable to load this support ticket. It may have been removed or you may lack permission to view it."
        onRetry={() => router.push("/dashboard/tickets")}
      />
    );
  }

  const isClosed = ticket.status === "closed" || ticket.status === "resolved";

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back Link */}
      <Link
        href="/dashboard/tickets"
        className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>Back to Support Requests</span>
      </Link>

      {/* Ticket Header Card */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <div className="flex items-center gap-2.5 flex-wrap">
            <span className="font-mono font-extrabold text-sm sm:text-base text-blue-600 dark:text-blue-400">
              {ticket.ticket_number}
            </span>
            <TicketStatusBadge status={ticket.status} />
            <span
              className={`text-[10px] uppercase font-extrabold px-2 py-0.5 rounded-md border ${getPriorityBadgeClass(
                ticket.priority
              )}`}
            >
              {ticket.priority} priority
            </span>
          </div>

          {!isClosed && (
            <button
              onClick={handleCloseTicket}
              disabled={isUpdating}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold text-emerald-700 dark:text-emerald-300 bg-emerald-50 dark:bg-emerald-950/50 hover:bg-emerald-100 dark:hover:bg-emerald-900/50 border border-emerald-200 dark:border-emerald-800 rounded-xl transition-colors self-start sm:self-auto cursor-pointer"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              <span>Mark as Resolved & Close</span>
            </button>
          )}
        </div>

        <div>
          <h1 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {ticket.subject}
          </h1>
          <div className="flex flex-wrap items-center gap-4 text-xs text-slate-400 mt-2">
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" />
              Created {formatDate(ticket.created_at)} ({formatRelativeTime(ticket.created_at)})
            </span>
            {ticket.department_name && (
              <span className="flex items-center gap-1">
                <Building2 className="w-3.5 h-3.5 text-blue-500" />
                Department: {ticket.department_name}
              </span>
            )}
            {ticket.assigned_to_name && (
              <span className="flex items-center gap-1">
                <ShieldCheck className="w-3.5 h-3.5 text-indigo-500" />
                Assigned Advisor: {ticket.assigned_to_name}
              </span>
            )}
          </div>
        </div>

        {/* Initial Issue Description */}
        <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
          <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Initial Issue Statement
          </h3>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 leading-relaxed whitespace-pre-wrap">
            {ticket.description}
          </div>
        </div>
      </div>

      {/* Conversation / Comments Timeline */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
        <h2 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Support Staff Discussion ({ticket.comments?.length || 0})
        </h2>

        <TicketTimeline
          comments={ticket.comments || []}
          studentName={ticket.user_name || user?.name}
        />

        {/* Reply Box */}
        {!isClosed ? (
          <form onSubmit={handleSendReply} className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Reply to Staff Advisor
            </label>
            <textarea
              rows={3}
              required
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="Type your response or provide additional details..."
              className="w-full text-xs rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-hidden"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!replyText.trim() || isUpdating}
                className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs disabled:opacity-50"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isUpdating ? "Posting..." : "Post Reply"}</span>
              </button>
            </div>
          </form>
        ) : (
          <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-800 text-center text-xs text-slate-500 dark:text-slate-400">
            This ticket has been marked as resolved and is closed to further comments.
          </div>
        )}
      </div>
    </div>
  );
}
