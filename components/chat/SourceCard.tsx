import { FileText, ExternalLink } from "lucide-react";
import { SourceInfo } from "@/types/chat";

interface SourceCardProps {
  source: SourceInfo;
  onViewSource: (source: SourceInfo) => void;
}

export function SourceCard({ source, onViewSource }: SourceCardProps) {
  return (
    <div className="group p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/50 hover:shadow-md transition-all">
      <div className="flex items-start gap-2.5">
        <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
          <FileText className="w-4 h-4" />
        </div>
        <div className="flex-1 min-w-0">
          <h4 className="text-xs font-bold text-slate-900 dark:text-slate-100 truncate">
            {source.title || "Academic Document"}
          </h4>
          <div className="flex items-center gap-2 mt-0.5 text-[11px] text-slate-500 dark:text-slate-400">
            {source.category && (
              <span className="capitalize px-1.5 py-0.2 rounded bg-slate-100 dark:bg-slate-800 text-[10px]">
                {source.category.replace("_", " ")}
              </span>
            )}
            {source.page && <span>Page {source.page}</span>}
          </div>
          {source.excerpt && (
            <p className="text-[11px] text-slate-600 dark:text-slate-300 mt-2 line-clamp-2 italic bg-slate-50 dark:bg-slate-800/40 p-1.5 rounded-lg border border-slate-100 dark:border-slate-800/60">
              "{source.excerpt}"
            </p>
          )}
          <button
            type="button"
            onClick={() => onViewSource(source)}
            className="mt-2.5 inline-flex items-center gap-1 text-[11px] font-semibold text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300"
          >
            <span>View Verified Excerpt</span>
            <ExternalLink className="w-3 h-3" />
          </button>
        </div>
      </div>
    </div>
  );
}
