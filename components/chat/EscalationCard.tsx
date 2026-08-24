import { LifeBuoy, ArrowRight, UserCheck } from "lucide-react";

interface EscalationCardProps {
  onOpenTicketModal: () => void;
  messageSnippet?: string;
}

export function EscalationCard({ onOpenTicketModal, messageSnippet }: EscalationCardProps) {
  return (
    <div className="p-4 sm:p-5 rounded-3xl border border-amber-200 dark:border-amber-900/50 bg-gradient-to-r from-amber-50/80 to-orange-50/50 dark:from-amber-950/20 dark:to-orange-950/10 shadow-xs my-3 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-2xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center shrink-0">
            <LifeBuoy className="w-5 h-5" />
          </div>
          <div>
            <h4 className="text-xs sm:text-sm font-bold text-amber-950 dark:text-amber-200 flex items-center gap-1.5">
              <span>Need Human Staff Assistance?</span>
              <span className="text-[10px] bg-amber-200/60 dark:bg-amber-900/60 text-amber-800 dark:text-amber-300 font-semibold px-2 py-0.2 rounded-full">
                Escalation Available
              </span>
            </h4>
            <p className="text-xs text-amber-800/80 dark:text-amber-300/80 mt-0.5 max-w-md">
              This request may require manual administrative clearance or departmental advisor verification.
            </p>
          </div>
        </div>

        <button
          type="button"
          onClick={onOpenTicketModal}
          className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold text-white bg-amber-600 hover:bg-amber-700 dark:bg-amber-500 dark:hover:bg-amber-600 rounded-xl shadow-xs shadow-amber-500/20 transition-all shrink-0 hover:gap-3"
        >
          <UserCheck className="w-4 h-4" />
          <span>Open Support Ticket</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </button>
      </div>
    </div>
  );
}
