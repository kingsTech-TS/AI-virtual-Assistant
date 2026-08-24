import { useState } from "react";
import { Bot, User, ThumbsUp, ThumbsDown, Copy, Check, FileText } from "lucide-react";
import { ChatMessage, SourceInfo } from "@/types/chat";
import { FeedbackModal } from "./FeedbackModal";
import { formatRelativeTime } from "@/lib/utils";

interface ChatMessageItemProps {
  message: ChatMessage;
  onSelectSource?: (source: SourceInfo) => void;
}

export function ChatMessageItem({ message, onSelectSource }: ChatMessageItemProps) {
  const isUser = message.sender === "user";
  const [copied, setCopied] = useState(false);
  const [feedbackOpen, setFeedbackOpen] = useState(false);
  const [feedbackRating, setFeedbackRating] = useState<"positive" | "negative">("positive");

  const handleCopy = () => {
    navigator.clipboard.writeText(message.content);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleFeedback = (rating: "positive" | "negative") => {
    setFeedbackRating(rating);
    setFeedbackOpen(true);
  };

  // Basic markdown rendering helper
  const renderFormattedContent = (content: string) => {
    return (
      <div className="space-y-2 text-xs sm:text-sm leading-relaxed whitespace-pre-wrap">
        {content}
      </div>
    );
  };

  return (
    <>
      <div
        className={`flex items-start gap-3 py-3 group animate-in fade-in slide-in-from-bottom-2 duration-300 ${
          isUser ? "flex-row-reverse" : "flex-row"
        }`}
      >
        {/* Avatar */}
        <div
          className={`w-8 h-8 rounded-xl flex items-center justify-center font-bold text-xs shrink-0 shadow-xs ${
            isUser
              ? "bg-slate-800 dark:bg-slate-700 text-white"
              : "bg-blue-600 dark:bg-blue-500 text-white"
          }`}
        >
          {isUser ? <User className="w-4 h-4" /> : <Bot className="w-4 h-4" />}
        </div>

        {/* Message Bubble */}
        <div
          className={`max-w-[85%] sm:max-w-[75%] rounded-3xl p-4 sm:p-5 transition-all shadow-xs ${
            isUser
              ? "bg-blue-600 text-white rounded-tr-sm"
              : "bg-white dark:bg-slate-900 border border-slate-200/90 dark:border-slate-800 text-slate-800 dark:text-slate-100 rounded-tl-sm"
          }`}
        >
          {/* Header metadata */}
          <div className="flex items-center justify-between gap-4 mb-1.5 opacity-75">
            <span className="text-[10px] font-bold uppercase tracking-wider">
              {isUser ? "You" : "Academic Assistant"}
            </span>
            <span className="text-[10px]">{formatRelativeTime(message.created_at)}</span>
          </div>

          {/* Content */}
          <div className="chat-content">{renderFormattedContent(message.content)}</div>

          {/* Sourced References List */}
          {!isUser && message.sources && message.sources.length > 0 && (
            <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800">
              <div className="flex items-center gap-1.5 text-[11px] font-semibold text-slate-500 dark:text-slate-400 mb-2">
                <FileText className="w-3.5 h-3.5 text-blue-500" />
                <span>Cited Sources:</span>
              </div>
              <div className="flex flex-wrap gap-1.5">
                {message.sources.map((src, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => onSelectSource && onSelectSource(src)}
                    className="inline-flex items-center gap-1 px-2.5 py-1 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-100 dark:border-blue-900/60 text-[11px] font-medium text-blue-700 dark:text-blue-300 hover:bg-blue-100 dark:hover:bg-blue-900/80 transition-colors"
                  >
                    <span>📄 {src.title || "Academic Document"}</span>
                    {src.page && <span className="opacity-75">(p. {src.page})</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Assistant Action Row */}
          {!isUser && (
            <div className="mt-3 pt-2 flex items-center justify-between gap-2 border-t border-slate-100 dark:border-slate-800/80 text-[11px] text-slate-400">
              <div className="flex items-center gap-1">
                <button
                  type="button"
                  onClick={() => handleFeedback("positive")}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-emerald-600 transition-colors"
                  title="Helpful response"
                >
                  <ThumbsUp className="w-3.5 h-3.5" />
                </button>
                <button
                  type="button"
                  onClick={() => handleFeedback("negative")}
                  className="p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-rose-600 transition-colors"
                  title="Inaccurate or unhelpful"
                >
                  <ThumbsDown className="w-3.5 h-3.5" />
                </button>
              </div>

              <button
                type="button"
                onClick={handleCopy}
                className="inline-flex items-center gap-1 p-1 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-400 hover:text-slate-600 dark:hover:text-slate-200 transition-colors"
                title="Copy message"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-emerald-500" /> : <Copy className="w-3.5 h-3.5" />}
                <span className="text-[10px]">{copied ? "Copied" : "Copy"}</span>
              </button>
            </div>
          )}
        </div>
      </div>

      {feedbackOpen && (
        <FeedbackModal
          messageId={message.id}
          initialRating={feedbackRating}
          isOpen={feedbackOpen}
          onClose={() => setFeedbackOpen(false)}
        />
      )}
    </>
  );
}
