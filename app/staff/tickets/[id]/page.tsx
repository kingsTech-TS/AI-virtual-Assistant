"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useStaffTicketActions } from "@/hooks/use-staff";
import { useAuth } from "@/hooks/use-auth";
import { TicketStatusBadge } from "@/components/tickets/TicketStatusBadge";
import { TicketTimeline } from "@/components/tickets/TicketTimeline";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { formatDate, getPriorityBadgeClass } from "@/lib/utils";
import {
  ArrowLeft,
  Send,
  Building2,
  CheckCircle2,
  AlertTriangle,
  UserCheck,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { parseApiError } from "@/lib/api";

export default function StaffTicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const ticketId = resolvedParams.id;
  const router = useRouter();
  const { user: currentUser } = useAuth();

  const {
    ticket,
    isLoading,
    isError,
    respond,
    isResponding,
    assignToSelf,
    isAssigningSelf,
    escalate,
    isEscalating,
    resolve,
    isResolving,
  } = useStaffTicketActions(ticketId);

  const [staffReply, setStaffReply] = useState("");

  // Modal states
  const [escalateModalOpen, setEscalateModalOpen] = useState(false);
  const [escalateReason, setEscalateReason] = useState("");
  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [resolveNote, setResolveNote] = useState("");

  const handleSendReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffReply.trim()) return;
    try {
      await respond(staffReply.trim());
      setStaffReply("");
    } catch (err) {
      toast.error("Failed to send response", { description: parseApiError(err) });
    }
  };

  const handleAssignToSelf = async () => {
    try {
      await assignToSelf();
    } catch (err) {
      toast.error("Failed to assign ticket", { description: parseApiError(err) });
    }
  };

  const handleEscalate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await escalate({ reason: escalateReason.trim() || undefined, priority: "urgent" });
      setEscalateModalOpen(false);
      setEscalateReason("");
    } catch (err) {
      toast.error("Failed to escalate ticket", { description: parseApiError(err) });
    }
  };

  const handleResolve = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await resolve(resolveNote.trim() || undefined);
      setResolveModalOpen(false);
      setResolveNote("");
    } catch (err) {
      toast.error("Failed to resolve ticket", { description: parseApiError(err) });
    }
  };

  if (isLoading) {
    return <LoadingState message="Loading ticket details..." size="lg" />;
  }

  if (isError || !ticket) {
    return (
      <ErrorState
        title="Ticket Not Found"
        message="Unable to load this support ticket."
        onRetry={() => router.push("/staff/tickets")}
      />
    );
  }

  const isAssignedToMe = ticket.assigned_to === (currentUser?.id || currentUser?._id);

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Back + Quick Action Triage Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/staff/tickets"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Ticket Queue</span>
        </Link>

        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleAssignToSelf}
            disabled={isAssigningSelf || isAssignedToMe}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 disabled:opacity-50 transition-colors cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{isAssignedToMe ? "Assigned to You" : isAssigningSelf ? "Assigning..." : "Assign to Me"}</span>
          </button>

          <button
            type="button"
            onClick={() => setEscalateModalOpen(true)}
            disabled={isEscalating || ticket.priority === "urgent"}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 disabled:opacity-50 transition-colors cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>{isEscalating ? "Escalating..." : ticket.priority === "urgent" ? "Already Urgent" : "Escalate"}</span>
          </button>

          <button
            type="button"
            onClick={() => setResolveModalOpen(true)}
            disabled={isResolving || ticket.status === "resolved" || ticket.status === "closed"}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 disabled:opacity-50 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>{isResolving ? "Resolving..." : "Mark Resolved"}</span>
          </button>
        </div>
      </div>

      {/* Ticket Header */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
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
          {ticket.department_name && (
            <span className="text-[11px] text-slate-500 dark:text-slate-400 flex items-center gap-1">
              <Building2 className="w-3.5 h-3.5 text-blue-500" />
              {ticket.department_name}
            </span>
          )}
        </div>

        <div>
          <h1 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            {ticket.subject}
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Submitted by{" "}
            <span className="font-semibold text-slate-700 dark:text-slate-200">
              {ticket.user_name || "Student"}
            </span>{" "}
            on {formatDate(ticket.created_at)}
            {isAssignedToMe && (
              <span className="ml-2 px-1.5 py-0.5 rounded bg-blue-100 dark:bg-blue-900/50 text-blue-700 dark:text-blue-300 text-[10px] font-bold uppercase tracking-wide">
                Assigned to You
              </span>
            )}
          </p>
        </div>

        {/* Description */}
        <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
          <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
            Student's Description
          </h4>
          <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
            {ticket.description}
          </div>
        </div>
      </div>

      {/* Discussion + Reply */}
      <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
        <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
          Discussion ({ticket.comments?.length || 0})
        </h3>

        <TicketTimeline
          comments={ticket.comments || []}
          studentName={ticket.user_name}
        />

        {/* Staff Reply */}
        {ticket.status !== "closed" && ticket.status !== "resolved" && (
          <form onSubmit={handleSendReply} className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
            <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Your Official Response
            </label>
            <textarea
              rows={4}
              required
              value={staffReply}
              onChange={(e) => setStaffReply(e.target.value)}
              placeholder="Provide course clearance instructions, deadline guidelines, or departmental directives..."
              className="w-full text-xs rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-hidden"
            />
            <div className="flex justify-end">
              <button
                type="submit"
                disabled={!staffReply.trim() || isResponding}
                className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-md shadow-blue-500/20 disabled:opacity-50 cursor-pointer"
              >
                <Send className="w-3.5 h-3.5" />
                <span>{isResponding ? "Sending..." : "Send Response"}</span>
              </button>
            </div>
          </form>
        )}

        {(ticket.status === "closed" || ticket.status === "resolved") && (
          <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-900/40 flex items-center gap-3">
              <CheckCircle2 className="w-5 h-5 text-emerald-600 dark:text-emerald-400 shrink-0" />
              <div>
                <p className="text-xs font-bold text-emerald-700 dark:text-emerald-300 capitalize">
                  Ticket {ticket.status}
                </p>
                <p className="text-[11px] text-emerald-600 dark:text-emerald-400">
                  This ticket has been {ticket.status}. No further responses can be sent.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Escalate Modal */}
      {escalateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                Escalate to Urgent
              </h3>
              <button onClick={() => setEscalateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleEscalate} className="space-y-3">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Reason for escalation (optional)
              </label>
              <textarea
                rows={3}
                value={escalateReason}
                onChange={(e) => setEscalateReason(e.target.value)}
                placeholder="e.g. Critical deadline clash or final exam timetable conflict..."
                className="w-full text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 text-slate-900 dark:text-slate-100 outline-hidden"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setEscalateModalOpen(false)} className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                  Cancel
                </button>
                <button type="submit" disabled={isEscalating} className="px-4 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl">
                  {isEscalating ? "Escalating..." : "Escalate to Urgent"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Resolve Modal */}
      {resolveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                Mark as Resolved
              </h3>
              <button onClick={() => setResolveModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleResolve} className="space-y-3">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Resolution note (optional)
              </label>
              <textarea
                rows={3}
                value={resolveNote}
                onChange={(e) => setResolveNote(e.target.value)}
                placeholder="e.g. Carryover registration approved and course slip validated."
                className="w-full text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 text-slate-900 dark:text-slate-100 outline-hidden"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button type="button" onClick={() => setResolveModalOpen(false)} className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg">
                  Cancel
                </button>
                <button type="submit" disabled={isResolving} className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl">
                  {isResolving ? "Resolving..." : "Confirm Resolution"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
