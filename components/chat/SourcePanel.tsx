import { SourceInfo } from "@/types/chat";
import { SourceCard } from "./SourceCard";
import { BookOpen, ShieldCheck, Info } from "lucide-react";

interface SourcePanelProps {
  sources: SourceInfo[];
  onViewSource: (source: SourceInfo) => void;
}

export function SourcePanel({ sources, onViewSource }: SourcePanelProps) {
  return (
    <div className="w-80 border-l border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-900/50 flex flex-col h-full shrink-0 overflow-y-auto">
      <div className="p-4 border-b border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900">
        <div className="flex items-center gap-2">
          <BookOpen className="w-4 h-4 text-blue-600 dark:text-blue-400" />
          <h3 className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
            Verified Academic Sources
          </h3>
        </div>
        <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1">
          RAG retrieved documents from the university knowledge base
        </p>
      </div>

      <div className="p-4 space-y-3 flex-1">
        {sources.length === 0 ? (
          <div className="text-center py-10 px-4">
            <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/50 text-blue-500 flex items-center justify-center mx-auto mb-3">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <h4 className="text-xs font-bold text-slate-700 dark:text-slate-300">
              Zero Hallucination Retrieval
            </h4>
            <p className="text-[11px] text-slate-400 mt-1 leading-relaxed">
              When you ask an academic inquiry, cited handbooks, guides, and timetables will appear here automatically.
            </p>
          </div>
        ) : (
          <>
            <div className="p-2.5 rounded-2xl bg-blue-50/60 dark:bg-blue-950/40 border border-blue-100 dark:border-blue-900/50 flex items-start gap-2 text-[11px] text-blue-800 dark:text-blue-300">
              <Info className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400 shrink-0 mt-0.5" />
              <span>{sources.length} document references grounded the latest response.</span>
            </div>

            {sources.map((src, index) => (
              <SourceCard key={index} source={src} onViewSource={onViewSource} />
            ))}
          </>
        )}
      </div>
    </div>
  );
}
