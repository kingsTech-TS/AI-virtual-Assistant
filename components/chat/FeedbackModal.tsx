import { useState } from "react";
import { ThumbsUp, ThumbsDown, X, Send } from "lucide-react";
import { feedbackService } from "@/services/feedback.service";
import { FeedbackRating } from "@/types/feedback";
import { FEEDBACK_REASONS } from "@/lib/constants";
import { toast } from "sonner";
import { parseApiError } from "@/lib/api";

interface FeedbackModalProps {
  messageId: string;
  initialRating: FeedbackRating;
  isOpen: boolean;
  onClose: () => void;
}

export function FeedbackModal({ messageId, initialRating, isOpen, onClose }: FeedbackModalProps) {
  const [rating, setRating] = useState<FeedbackRating>(initialRating);
  const [selectedReason, setSelectedReason] = useState<string>("");
  const [customComment, setCustomComment] = useState<string>("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const fullComment = [selectedReason, customComment].filter(Boolean).join(" - ");
      await feedbackService.submitFeedback({
        message_id: messageId,
        rating,
        comment: fullComment || undefined,
      });
      toast.success("Feedback submitted", {
        description: "Thank you for helping improve the academic assistant.",
      });
      onClose();
    } catch (err) {
      toast.error("Failed to submit feedback", {
        description: parseApiError(err),
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-200">
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-3xl p-6 max-w-md w-full shadow-2xl animate-in zoom-in-95 duration-150">
        <div className="flex items-center justify-between pb-3 border-b border-slate-100 dark:border-slate-800">
          <h3 className="text-sm font-bold text-slate-900 dark:text-white">Rate AI Response</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-xl text-slate-400 hover:text-slate-600 hover:bg-slate-100 dark:hover:bg-slate-800"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="py-4 space-y-4">
          {/* Rating Toggle */}
          <div className="flex items-center justify-center gap-4 py-2">
            <button
              type="button"
              onClick={() => setRating("positive")}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-semibold transition-all ${
                rating === "positive"
                  ? "border-emerald-500 bg-emerald-50 dark:bg-emerald-950/50 text-emerald-600 dark:text-emerald-400 shadow-xs"
                  : "border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <ThumbsUp className="w-4 h-4" />
              <span>Helpful Answer</span>
            </button>
            <button
              type="button"
              onClick={() => setRating("negative")}
              className={`flex items-center gap-2 px-4 py-2 rounded-2xl border text-xs font-semibold transition-all ${
                rating === "negative"
                  ? "border-rose-500 bg-rose-50 dark:bg-rose-950/50 text-rose-600 dark:text-rose-400 shadow-xs"
                  : "border-slate-200 dark:border-slate-800 text-slate-500 hover:bg-slate-50 dark:hover:bg-slate-800"
              }`}
            >
              <ThumbsDown className="w-4 h-4" />
              <span>Needs Improvement</span>
            </button>
          </div>

          {/* Negative feedback specific reasons */}
          {rating === "negative" && (
            <div className="space-y-2">
              <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
                What went wrong?
              </label>
              <div className="flex flex-wrap gap-1.5">
                {FEEDBACK_REASONS.map((reason) => (
                  <button
                    key={reason}
                    type="button"
                    onClick={() => setSelectedReason(selectedReason === reason ? "" : reason)}
                    className={`text-[11px] px-2.5 py-1 rounded-xl border transition-colors ${
                      selectedReason === reason
                        ? "bg-rose-100 dark:bg-rose-950/70 border-rose-400 text-rose-700 dark:text-rose-300 font-medium"
                        : "bg-slate-50 dark:bg-slate-800 border-slate-200 dark:border-slate-700 text-slate-600 dark:text-slate-300 hover:bg-slate-100"
                    }`}
                  >
                    {reason}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Optional comments */}
          <div className="space-y-1.5">
            <label className="text-xs font-semibold text-slate-600 dark:text-slate-300">
              Additional Details (optional)
            </label>
            <textarea
              rows={3}
              value={customComment}
              onChange={(e) => setCustomComment(e.target.value)}
              placeholder="Tell us what information was missing or inaccurate..."
              className="w-full text-xs rounded-2xl bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 p-3 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-hidden"
            />
          </div>

          <div className="flex items-center justify-end gap-2 pt-2 border-t border-slate-100 dark:border-slate-800">
            <button
              type="button"
              onClick={onClose}
              className="px-3.5 py-1.5 text-xs font-semibold text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-xl"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="inline-flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-white bg-blue-600 hover:bg-blue-700 rounded-xl shadow-xs disabled:opacity-50"
            >
              <Send className="w-3.5 h-3.5" />
              <span>{isSubmitting ? "Submitting..." : "Send Feedback"}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
