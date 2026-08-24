import { TicketComment } from "@/types/ticket";
import { formatRelativeTime } from "@/lib/utils";
import { User, ShieldCheck } from "lucide-react";

interface TicketTimelineProps {
  comments: TicketComment[];
  studentName?: string | null;
}

export function TicketTimeline({ comments, studentName }: TicketTimelineProps) {
  if (!comments || comments.length === 0) {
    return (
      <div className="py-8 text-center text-xs text-slate-400">
        No comments or replies on this ticket yet.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {comments.map((c, index) => {
        const isStaff = c.author_role === "staff" || c.author_role === "admin" || c.author_role === "super_admin";

        return (
          <div
            key={index}
            className={`p-4 rounded-2xl border text-xs leading-relaxed ${
              isStaff
                ? "bg-indigo-50/50 dark:bg-indigo-950/20 border-indigo-200 dark:border-indigo-900/50 text-indigo-950 dark:text-indigo-100"
                : "bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-slate-800 dark:text-slate-200"
            }`}
          >
            <div className="flex items-center justify-between gap-2 pb-2 border-b border-slate-100 dark:border-slate-800/60 mb-2">
              <div className="flex items-center gap-2">
                <div
                  className={`w-6 h-6 rounded-lg flex items-center justify-center font-bold text-[10px] ${
                    isStaff
                      ? "bg-indigo-600 text-white"
                      : "bg-slate-700 text-white"
                  }`}
                >
                  {isStaff ? <ShieldCheck className="w-3.5 h-3.5" /> : <User className="w-3.5 h-3.5" />}
                </div>
                <span className="font-bold text-slate-900 dark:text-white">
                  {c.author_name || (isStaff ? "Support Staff" : studentName || "Student")}
                </span>
                {isStaff && (
                  <span className="text-[9px] uppercase font-extrabold px-1.5 py-0.2 rounded bg-indigo-200/60 dark:bg-indigo-900/60 text-indigo-800 dark:text-indigo-300">
                    Staff Response
                  </span>
                )}
              </div>
              <span className="text-[10px] text-slate-400">{formatRelativeTime(c.created_at)}</span>
            </div>

            <p className="whitespace-pre-wrap">{c.text}</p>
          </div>
        );
      })}
    </div>
  );
}
