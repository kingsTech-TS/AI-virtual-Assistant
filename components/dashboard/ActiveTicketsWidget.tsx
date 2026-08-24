import Link from "next/link";
import { Ticket, ArrowRight, LifeBuoy } from "lucide-react";
import { useTickets } from "@/hooks/use-tickets";
import { getStatusBadgeClass } from "@/lib/utils";

export function ActiveTicketsWidget() {
  const { data, isLoading } = useTickets({ limit: 4 });
  const tickets = data?.items || [];

  return (
    <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
              <Ticket className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Support Requests</h3>
          </div>
          <Link
            href="/dashboard/tickets"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60 mt-2">
          {isLoading ? (
            <div className="py-8 text-center text-xs text-slate-400 animate-pulse">
              Loading support requests...
            </div>
          ) : tickets.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No active support tickets.
            </div>
          ) : (
            tickets.map((t) => (
              <Link
                key={t.id || t._id}
                href={`/dashboard/tickets/${t.id || t._id}`}
                className="group flex items-center justify-between py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 px-2 rounded-xl transition-colors"
              >
                <div className="truncate pr-2">
                  <div className="flex items-center gap-2">
                    <span className="text-[10px] font-mono font-bold text-blue-600 dark:text-blue-400">
                      {t.ticket_number}
                    </span>
                    <span
                      className={`text-[9px] uppercase tracking-wider font-bold px-1.5 py-0.2 rounded-md border ${getStatusBadgeClass(
                        t.status
                      )}`}
                    >
                      {t.status.replace("_", " ")}
                    </span>
                  </div>
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 mt-1 truncate">
                    {t.subject}
                  </p>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Link
          href="/dashboard/tickets"
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-amber-50 dark:hover:bg-amber-950/40 hover:text-amber-600 text-xs font-semibold transition-colors"
        >
          <LifeBuoy className="w-3.5 h-3.5" />
          <span>Manage Support Tickets</span>
        </Link>
      </div>
    </div>
  );
}
