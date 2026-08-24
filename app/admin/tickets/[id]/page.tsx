"use client";

import { use, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTicketDetail } from "@/hooks/use-tickets";
import { useUsers } from "@/hooks/use-users";
import { useDepartments } from "@/hooks/use-departments";
import { useAuth } from "@/hooks/use-auth";
import { staffService } from "@/services/staff.service";
import { adminService } from "@/services/admin.service";
import { TicketStatus, TicketPriority } from "@/types/ticket";
import { TicketStatusBadge } from "@/components/tickets/TicketStatusBadge";
import { TicketTimeline } from "@/components/tickets/TicketTimeline";
import { LoadingState } from "@/components/shared/LoadingState";
import { ErrorState } from "@/components/shared/ErrorState";
import { formatDate, getPriorityBadgeClass } from "@/lib/utils";
import {
  ArrowLeft,
  Send,
  User,
  Building2,
  Save,
  CheckCircle2,
  AlertTriangle,
  Lock,
  UserCheck,
  RefreshCw,
  X,
} from "lucide-react";
import { toast } from "sonner";
import { parseApiError } from "@/lib/api";

export default function AdminTicketDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const resolvedParams = use(params);
  const ticketId = resolvedParams.id;
  const router = useRouter();
  const { user: currentUser } = useAuth();

  const { data: ticket, isLoading, isError, updateTicket, isUpdating, refetch } = useTicketDetail(ticketId);
  const { users } = useUsers({ limit: 50 });
  const { departments } = useDepartments();

  const staffMembers = users.filter((u) => u.role === "staff" || u.role === "admin" || u.role === "super_admin");

  const [status, setStatus] = useState<TicketStatus | "">("");
  const [priority, setPriority] = useState<TicketPriority | "">("");
  const [assignedTo, setAssignedTo] = useState<string>("");
  const [staffReply, setStaffReply] = useState("");
  const [actionLoading, setActionLoading] = useState(false);

  // Modal dialog states for quick actions
  const [escalateModalOpen, setEscalateModalOpen] = useState(false);
  const [escalateReason, setEscalateReason] = useState("");

  const [resolveModalOpen, setResolveModalOpen] = useState(false);
  const [resolveNote, setResolveNote] = useState("");

  const [closeModalOpen, setCloseModalOpen] = useState(false);
  const [closeReason, setCloseReason] = useState("");

  const [reassignModalOpen, setReassignModalOpen] = useState(false);
  const [reassignDept, setReassignDept] = useState("");
  const [reassignStaff, setReassignStaff] = useState("");

  // 1. Assign to Self Action
  const handleAssignToSelf = async () => {
    try {
      setActionLoading(true);
      await staffService.assignToSelf(ticketId);
      toast.success("Ticket assigned to you");
      refetch();
    } catch (err) {
      toast.error("Failed to assign ticket", { description: parseApiError(err) });
    } finally {
      setActionLoading(false);
    }
  };

  // 2. Escalate to Urgent Action
  const handleEscalate = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      await staffService.escalate(ticketId, escalateReason.trim() || undefined, "urgent");
      toast.success("Ticket escalated to Urgent priority");
      setEscalateModalOpen(false);
      setEscalateReason("");
      refetch();
    } catch (err) {
      toast.error("Failed to escalate ticket", { description: parseApiError(err) });
    } finally {
      setActionLoading(false);
    }
  };

  // 3. Resolve Ticket Action
  const handleResolve = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      await staffService.resolve(ticketId, resolveNote.trim() || undefined);
      toast.success("Ticket resolved successfully");
      setResolveModalOpen(false);
      setResolveNote("");
      refetch();
    } catch (err) {
      toast.error("Failed to resolve ticket", { description: parseApiError(err) });
    } finally {
      setActionLoading(false);
    }
  };

  // 4. Close Ticket (Admin) Action
  const handleCloseTicket = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      await adminService.closeTicket(ticketId, closeReason.trim() || undefined);
      toast.success("Ticket closed");
      setCloseModalOpen(false);
      setCloseReason("");
      refetch();
    } catch (err) {
      toast.error("Failed to close ticket", { description: parseApiError(err) });
    } finally {
      setActionLoading(false);
    }
  };

  // 5. Reassign Department / Staff
  const handleReassign = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      setActionLoading(true);
      await adminService.reassignTicket(ticketId, {
        assigned_to: reassignStaff || undefined,
        department_id: reassignDept || undefined,
      });
      toast.success("Ticket reassigned successfully");
      setReassignModalOpen(false);
      refetch();
    } catch (err) {
      toast.error("Failed to reassign ticket", { description: parseApiError(err) });
    } finally {
      setActionLoading(false);
    }
  };

  // 6. Direct Staff Response
  const handleSendStaffReply = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!staffReply.trim()) return;

    try {
      setActionLoading(true);
      await staffService.respond(ticketId, staffReply.trim());
      setStaffReply("");
      toast.success("Staff response dispatched to student");
      refetch();
    } catch (err) {
      toast.error("Failed to send staff response", { description: parseApiError(err) });
    } finally {
      setActionLoading(false);
    }
  };

  // 7. General Attribute Save
  const handleUpdateStatus = async () => {
    if (!status && !priority && !assignedTo) return;
    try {
      await updateTicket({
        status: status ? (status as TicketStatus) : undefined,
        priority: priority ? (priority as TicketPriority) : undefined,
        assigned_to: assignedTo || undefined,
      });
      toast.success("Ticket parameters updated");
      refetch();
    } catch (err) {
      toast.error("Update failed", { description: parseApiError(err) });
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
        onRetry={() => router.push("/admin/tickets")}
      />
    );
  }

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Back link & Quick Triage Bar */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <Link
          href="/admin/tickets"
          className="inline-flex items-center gap-1.5 text-xs font-semibold text-slate-500 hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Ticket Queue</span>
        </Link>

        {/* Quick Action Pills */}
        <div className="flex items-center gap-2 flex-wrap">
          <button
            type="button"
            onClick={handleAssignToSelf}
            disabled={actionLoading || ticket.assigned_to === currentUser?.id}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800 hover:bg-blue-100 disabled:opacity-50 transition-colors cursor-pointer"
          >
            <UserCheck className="w-3.5 h-3.5" />
            <span>{ticket.assigned_to === currentUser?.id ? "Assigned to You" : "Assign to Me"}</span>
          </button>

          <button
            type="button"
            onClick={() => setEscalateModalOpen(true)}
            disabled={actionLoading || ticket.priority === "urgent"}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-rose-50 dark:bg-rose-950/60 text-rose-700 dark:text-rose-300 border border-rose-200 dark:border-rose-800 hover:bg-rose-100 disabled:opacity-50 transition-colors cursor-pointer"
          >
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>Escalate</span>
          </button>

          <button
            type="button"
            onClick={() => setResolveModalOpen(true)}
            disabled={actionLoading || ticket.status === "resolved"}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-700 dark:text-emerald-300 border border-emerald-200 dark:border-emerald-800 hover:bg-emerald-100 disabled:opacity-50 transition-colors cursor-pointer"
          >
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Resolve</span>
          </button>

          <button
            type="button"
            onClick={() => setReassignModalOpen(true)}
            disabled={actionLoading}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-200 disabled:opacity-50 transition-colors cursor-pointer"
          >
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reassign</span>
          </button>

          <button
            type="button"
            onClick={() => setCloseModalOpen(true)}
            disabled={actionLoading || ticket.status === "closed"}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-semibold rounded-xl bg-slate-100 dark:bg-slate-800 text-slate-500 hover:text-slate-900 border border-slate-200 dark:border-slate-700 disabled:opacity-50 transition-colors cursor-pointer"
          >
            <Lock className="w-3.5 h-3.5" />
            <span>Close</span>
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left 2 Cols: Main Discussion & Description */}
        <div className="lg:col-span-2 space-y-6">
          {/* Header Card */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
            <div className="flex items-center gap-2.5 flex-wrap">
              <span className="font-mono font-extrabold text-sm sm:text-base text-indigo-600 dark:text-indigo-400">
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
                  <Building2 className="w-3.5 h-3.5 text-indigo-500" />
                  {ticket.department_name}
                </span>
              )}
            </div>

            <div>
              <h1 className="text-lg sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
                {ticket.subject}
              </h1>
              <p className="text-xs text-slate-400 mt-1">
                Submitted by <span className="font-semibold text-slate-700 dark:text-slate-200">{ticket.user_name || "Student"}</span> on {formatDate(ticket.created_at)}
              </p>
            </div>

            {/* Description */}
            <div className="pt-3 border-t border-slate-100 dark:border-slate-800">
              <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider mb-2">
                Student Inquired Description
              </h4>
              <div className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-xs sm:text-sm text-slate-800 dark:text-slate-200 whitespace-pre-wrap leading-relaxed">
                {ticket.description}
              </div>
            </div>
          </div>

          {/* Timeline & Discussion */}
          <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
            <h3 className="text-sm font-bold text-slate-900 dark:text-white uppercase tracking-wider">
              Discussion History ({ticket.comments?.length || 0})
            </h3>

            <TicketTimeline
              comments={ticket.comments || []}
              studentName={ticket.user_name}
            />

            {/* Staff Reply Form */}
            <form onSubmit={handleSendStaffReply} className="pt-4 border-t border-slate-100 dark:border-slate-800 space-y-3">
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Staff Official Response / Directive
              </label>
              <textarea
                rows={4}
                required
                value={staffReply}
                onChange={(e) => setStaffReply(e.target.value)}
                placeholder="Provide official resolution, course clearance instructions, or departmental directives..."
                className="w-full text-xs rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-indigo-500 outline-hidden"
              />
              <div className="flex justify-end">
                <button
                  type="submit"
                  disabled={!staffReply.trim() || actionLoading}
                  className="inline-flex items-center gap-1.5 px-5 py-2.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl shadow-md shadow-indigo-500/20 disabled:opacity-50 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>{actionLoading ? "Transmitting..." : "Send Response to Student"}</span>
                </button>
              </div>
            </form>
          </div>
        </div>

        {/* Right 1 Col: Management Sidebar Controls */}
        <div className="space-y-6">
          <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-4">
            <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider pb-2 border-b border-slate-100 dark:border-slate-800">
              Ticket Control & Assignment
            </h3>

            {/* Status */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Status
              </label>
              <select
                value={status || ticket.status}
                onChange={(e) => setStatus(e.target.value as TicketStatus)}
                className="mt-1 w-full text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-hidden font-medium"
              >
                <option value="open">Open</option>
                <option value="in_progress">In Progress</option>
                <option value="waiting_for_student">Waiting for Student</option>
                <option value="resolved">Resolved</option>
                <option value="closed">Closed</option>
              </select>
            </div>

            {/* Priority */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Priority
              </label>
              <select
                value={priority || ticket.priority}
                onChange={(e) => setPriority(e.target.value as TicketPriority)}
                className="mt-1 w-full text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-hidden font-medium"
              >
                <option value="low">Low</option>
                <option value="medium">Medium</option>
                <option value="high">High</option>
                <option value="urgent">Urgent</option>
              </select>
            </div>

            {/* Assigned Staff */}
            <div>
              <label className="text-xs font-bold text-slate-700 dark:text-slate-300">
                Assign Advisor / Staff
              </label>
              <select
                value={assignedTo || ticket.assigned_to || ""}
                onChange={(e) => setAssignedTo(e.target.value)}
                className="mt-1 w-full text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 text-slate-900 dark:text-slate-100 focus:ring-2 focus:ring-indigo-500 outline-hidden font-medium"
              >
                <option value="">Unassigned</option>
                {staffMembers.map((s) => (
                  <option key={s.id || s._id} value={s.id || s._id}>
                    {s.name} ({s.role})
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={handleUpdateStatus}
              disabled={isUpdating}
              className="w-full inline-flex items-center justify-center gap-2 py-2.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 dark:bg-slate-700 dark:hover:bg-slate-600 rounded-xl transition-all shadow-xs cursor-pointer"
            >
              <Save className="w-3.5 h-3.5" />
              <span>Save Status & Assignment</span>
            </button>
          </div>
        </div>
      </div>

      {/* Escalate Modal */}
      {escalateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <AlertTriangle className="w-4 h-4 text-rose-600" />
                <span>Escalate Ticket Priority</span>
              </h3>
              <button onClick={() => setEscalateModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleEscalate} className="space-y-3">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Reason for Escalation (Optional)
              </label>
              <textarea
                rows={3}
                value={escalateReason}
                onChange={(e) => setEscalateReason(e.target.value)}
                placeholder="e.g. Critical exam timetable clash or deadline within 24 hours..."
                className="w-full text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 text-slate-900 dark:text-slate-100 outline-hidden"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setEscalateModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-rose-600 hover:bg-rose-700 rounded-xl"
                >
                  Escalate to Urgent
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Resolve Modal */}
      {resolveModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span>Mark Ticket as Resolved</span>
              </h3>
              <button onClick={() => setResolveModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleResolve} className="space-y-3">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Resolution Summary / Notes
              </label>
              <textarea
                rows={3}
                value={resolveNote}
                onChange={(e) => setResolveNote(e.target.value)}
                placeholder="e.g. Carryover registration approved and course slip validated in portal."
                className="w-full text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 text-slate-900 dark:text-slate-100 outline-hidden"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setResolveModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-emerald-600 hover:bg-emerald-700 rounded-xl"
                >
                  Confirm Resolution
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Close Modal (Admin) */}
      {closeModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <Lock className="w-4 h-4 text-slate-700" />
                <span>Close Ticket Permanently</span>
              </h3>
              <button onClick={() => setCloseModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleCloseTicket} className="space-y-3">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                Closing Reason
              </label>
              <textarea
                rows={3}
                value={closeReason}
                onChange={(e) => setCloseReason(e.target.value)}
                placeholder="e.g. Issue resolved or student inquiry concluded."
                className="w-full text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 text-slate-900 dark:text-slate-100 outline-hidden"
              />
              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setCloseModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-slate-800 hover:bg-slate-900 rounded-xl"
                >
                  Close Ticket
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Reassign Modal */}
      {reassignModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
          <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl space-y-4">
            <div className="flex items-center justify-between pb-2 border-b border-slate-100 dark:border-slate-800">
              <h3 className="text-sm font-bold text-slate-900 dark:text-white flex items-center gap-2">
                <RefreshCw className="w-4 h-4 text-indigo-600" />
                <span>Reassign Ticket Department & Staff</span>
              </h3>
              <button onClick={() => setReassignModalOpen(false)} className="text-slate-400 hover:text-slate-600">
                <X className="w-4 h-4" />
              </button>
            </div>
            <form onSubmit={handleReassign} className="space-y-3">
              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Target Department
                </label>
                <select
                  value={reassignDept}
                  onChange={(e) => setReassignDept(e.target.value)}
                  className="mt-1 w-full text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 text-slate-900 dark:text-slate-100 outline-hidden"
                >
                  <option value="">Keep current department</option>
                  {departments.map((d) => (
                    <option key={d.id || d._id} value={d.id || d._id}>
                      {d.name} ({d.code})
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                  Target Staff Member
                </label>
                <select
                  value={reassignStaff}
                  onChange={(e) => setReassignStaff(e.target.value)}
                  className="mt-1 w-full text-xs rounded-xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-2.5 text-slate-900 dark:text-slate-100 outline-hidden"
                >
                  <option value="">Keep current staff</option>
                  {staffMembers.map((s) => (
                    <option key={s.id || s._id} value={s.id || s._id}>
                      {s.name} ({s.role})
                    </option>
                  ))}
                </select>
              </div>

              <div className="flex justify-end gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setReassignModalOpen(false)}
                  className="px-3 py-1.5 text-xs text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={actionLoading}
                  className="px-4 py-1.5 text-xs font-bold text-white bg-indigo-600 hover:bg-indigo-700 rounded-xl"
                >
                  Save Reassignment
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
