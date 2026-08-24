import { Bot, Sparkles } from "lucide-react";

interface TypingIndicatorProps {
  statusText?: string;
}

export function TypingIndicator({ statusText = "Searching academic knowledge base..." }: TypingIndicatorProps) {
  return (
    <div className="flex items-start gap-3 py-2 animate-in fade-in slide-in-from-bottom-2 duration-300">
      <div className="w-8 h-8 rounded-xl bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center shrink-0 shadow-xs">
        <Bot className="w-4 h-4" />
      </div>
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl rounded-tl-sm px-4 py-3 shadow-xs max-w-md">
        <div className="flex items-center gap-2 mb-1.5">
          <Sparkles className="w-3.5 h-3.5 text-blue-500 animate-spin" />
          <span className="text-xs font-semibold text-slate-800 dark:text-slate-200">{statusText}</span>
        </div>
        <div className="flex items-center gap-1.5 py-1">
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.3s]"></div>
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce [animation-delay:-0.15s]"></div>
          <div className="w-2 h-2 rounded-full bg-blue-600 animate-bounce"></div>
        </div>
      </div>
    </div>
  );
}
