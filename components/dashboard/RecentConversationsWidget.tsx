import Link from "next/link";
import { MessageSquare, ArrowRight, Clock } from "lucide-react";
import { useConversations } from "@/hooks/use-conversations";
import { formatRelativeTime } from "@/lib/utils";

export function RecentConversationsWidget() {
  const { data, isLoading } = useConversations({ limit: 4 });
  const conversations = data?.items || [];

  return (
    <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center">
              <MessageSquare className="w-4 h-4" />
            </div>
            <h3 className="text-sm font-bold text-slate-900 dark:text-white">Recent Chats</h3>
          </div>
          <Link
            href="/dashboard/conversations"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline"
          >
            View all
          </Link>
        </div>

        <div className="divide-y divide-slate-100 dark:divide-slate-800/60 mt-2">
          {isLoading ? (
            <div className="py-8 text-center text-xs text-slate-400 animate-pulse">
              Loading recent inquiries...
            </div>
          ) : conversations.length === 0 ? (
            <div className="py-8 text-center text-xs text-slate-400">
              No conversations started yet.
            </div>
          ) : (
            conversations.map((conv) => (
              <Link
                key={conv.id || conv._id}
                href={`/dashboard/chat?conv=${conv.id || conv._id}`}
                className="group flex items-center justify-between py-3 hover:bg-slate-50 dark:hover:bg-slate-800/50 px-2 rounded-xl transition-colors"
              >
                <div className="truncate pr-2">
                  <p className="text-xs font-semibold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                    {conv.title || "Academic Consultation"}
                  </p>
                  <div className="flex items-center gap-1 text-[10px] text-slate-400 mt-0.5">
                    <Clock className="w-3 h-3" />
                    <span>{formatRelativeTime(conv.updated_at || conv.created_at)}</span>
                  </div>
                </div>
                <ArrowRight className="w-3.5 h-3.5 text-slate-400 group-hover:text-blue-600 group-hover:translate-x-0.5 transition-all shrink-0" />
              </Link>
            ))
          )}
        </div>
      </div>

      <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
        <Link
          href="/dashboard/chat"
          className="w-full flex items-center justify-center gap-2 py-2 rounded-xl bg-slate-50 dark:bg-slate-800 text-slate-700 dark:text-slate-200 hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:text-blue-600 text-xs font-semibold transition-colors"
        >
          <span>Ask a New Question</span>
          <ArrowRight className="w-3.5 h-3.5" />
        </Link>
      </div>
    </div>
  );
}
