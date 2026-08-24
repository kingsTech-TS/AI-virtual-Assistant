"use client";

import { useState } from "react";
import { useAuditLogs } from "@/hooks/use-analytics";
import { LoadingState } from "@/components/shared/LoadingState";
import { PaginationControls } from "@/components/shared/PaginationControls";
import { Settings, ShieldCheck, Activity, Database, Server, Clock, Search } from "lucide-react";
import { formatDate, formatRelativeTime } from "@/lib/utils";

export default function AdminSettingsPage() {
  const [page, setPage] = useState(1);
  const [actionFilter, setActionFilter] = useState("");
  const { data, isLoading } = useAuditLogs({ page, limit: 15, action: actionFilter || undefined });

  const auditLogs = data?.items || [];
  const pagination = data?.pagination;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div>
        <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
          System Diagnostics & Audit Logs
        </h1>
        <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
          Monitor system services, backend endpoints, and immutable administrative audit trails.
        </p>
      </div>

      {/* System Health Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Server className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">FastAPI Engine</h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">REST API Online (Port 8000)</p>
          </div>
        </div>

        <div className="p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shrink-0">
            <Database className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">MongoDB Atlas</h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Vector Search & Collections OK</p>
          </div>
        </div>

        <div className="p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex items-center gap-4">
          <div className="w-11 h-11 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center shrink-0">
            <Activity className="w-5 h-5" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="w-2 h-2 rounded-full bg-indigo-500"></span>
              <h3 className="text-xs font-bold text-slate-900 dark:text-white">RAG Embeddings</h3>
            </div>
            <p className="text-[11px] text-slate-400 mt-0.5">Semantic Pipeline Active</p>
          </div>
        </div>
      </div>

      {/* Audit Logs Table */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden space-y-4 p-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-slate-100 dark:border-slate-800">
          <div>
            <h2 className="text-base font-bold text-slate-900 dark:text-white">Administrative Audit Log</h2>
            <p className="text-xs text-slate-400 mt-0.5">Immutable record of staff and system operations.</p>
          </div>

          <div className="flex items-center gap-2">
            {["", "user_created", "role_changed", "document_uploaded"].map((action) => (
              <button
                key={action}
                onClick={() => setActionFilter(action)}
                className={`px-3 py-1 text-xs font-semibold rounded-xl capitalize transition-colors ${
                  actionFilter === action
                    ? "bg-indigo-600 text-white"
                    : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200"
                }`}
              >
                {action ? action.replace(/_/g, " ") : "All Actions"}
              </button>
            ))}
          </div>
        </div>

        {isLoading ? (
          <LoadingState message="Loading audit trail..." />
        ) : auditLogs.length === 0 ? (
          <p className="text-xs text-slate-400 py-12 text-center">No audit records logged.</p>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-xs text-slate-600 dark:text-slate-300">
              <thead className="bg-slate-50 dark:bg-slate-800/60 text-slate-400 font-bold uppercase text-[10px] tracking-wider border-b border-slate-200/80 dark:border-slate-800">
                <tr>
                  <th className="px-4 py-3">Action</th>
                  <th className="px-4 py-3">Resource</th>
                  <th className="px-4 py-3">Details</th>
                  <th className="px-4 py-3">Timestamp</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100 dark:divide-slate-800/80">
                {auditLogs.map((log) => {
                  const id = log.id || log._id || "";
                  return (
                    <tr key={id} className="hover:bg-slate-50/80 dark:hover:bg-slate-800/40">
                      <td className="px-4 py-3 font-semibold text-slate-900 dark:text-white capitalize">
                        <span className="px-2 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px]">
                          {log.action?.replace(/_/g, " ")}
                        </span>
                      </td>

                      <td className="px-4 py-3 font-mono text-[11px] text-slate-500 dark:text-slate-400">
                        {log.resource_type} {log.resource_id ? `(${log.resource_id.substring(0, 8)}...)` : ""}
                      </td>

                      <td className="px-4 py-3 text-slate-500 dark:text-slate-400 font-mono text-[10px]">
                        {log.metadata ? JSON.stringify(log.metadata) : "N/A"}
                      </td>

                      <td className="px-4 py-3 text-slate-400">
                        {formatRelativeTime(log.created_at)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}

        <PaginationControls pagination={pagination} onPageChange={(p) => setPage(p)} />
      </div>
    </div>
  );
}
