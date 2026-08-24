"use client";

import { useState } from "react";
import Link from "next/link";
import { useConversations } from "@/hooks/use-conversations";
import { MessageSquare, Trash2, ArrowRight, Search, Clock, Bot } from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";
import { EmptyState } from "@/components/shared/EmptyState";
import { LoadingState } from "@/components/shared/LoadingState";
import { PaginationControls } from "@/components/shared/PaginationControls";

export default function ConversationsPage() {
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const { data, isLoading, deleteConversation } = useConversations({ page, limit: 10 });
  const conversations = data?.items || [];
  const pagination = data?.pagination;

  const filtered = conversations.filter((c) =>
    c.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    if (deleteId) {
      await deleteConversation(deleteId);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-2xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Conversation History
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5">
            Review past academic consultations, source citations, and AI answers.
          </p>
        </div>

        <Link
          href="/dashboard/chat"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-md shadow-blue-500/20 transition-all self-start sm:self-auto"
        >
          <Bot className="w-4 h-4" />
          <span>Start New Consultation</span>
        </Link>
      </div>

      {/* Search Input */}
      <div className="relative max-w-md">
        <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        <input
          type="text"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Search conversation topics or keywords..."
          className="w-full pl-10 pr-4 py-2.5 text-xs rounded-2xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500 outline-hidden shadow-xs"
        />
      </div>

      {/* Main List */}
      <div className="rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs overflow-hidden">
        {isLoading ? (
          <LoadingState message="Loading conversation history..." />
        ) : filtered.length === 0 ? (
          <EmptyState
            icon={MessageSquare}
            title={searchTerm ? "No matching conversations" : "No conversations recorded"}
            description={
              searchTerm
                ? "Try searching for a different keyword or topic."
                : "You haven't asked any questions to the AI assistant yet."
            }
            action={
              <Link
                href="/dashboard/chat"
                className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-xl bg-blue-600 text-white hover:bg-blue-700"
              >
                <span>Ask a Question</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            }
          />
        ) : (
          <div className="divide-y divide-slate-100 dark:divide-slate-800/80">
            {filtered.map((conv) => {
              const id = conv.id || conv._id || "";
              return (
                <div
                  key={id}
                  className="flex items-center justify-between p-4 sm:p-5 hover:bg-slate-50/80 dark:hover:bg-slate-800/40 transition-colors group"
                >
                  <Link
                    href={`/dashboard/chat?conv=${id}`}
                    className="flex items-start gap-3.5 flex-1 min-w-0 pr-4"
                  >
                    <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <div className="truncate">
                      <h3 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 truncate">
                        {conv.title || "Academic Inquiry"}
                      </h3>
                      <div className="flex items-center gap-3 text-[11px] text-slate-400 mt-1">
                        <span className="flex items-center gap-1">
                          <Clock className="w-3 h-3" />
                          {formatRelativeTime(conv.updated_at || conv.created_at)}
                        </span>
                        {conv.message_count !== undefined && (
                          <span>• {conv.message_count} messages</span>
                        )}
                      </div>
                    </div>
                  </Link>

                  <div className="flex items-center gap-2">
                    <Link
                      href={`/dashboard/chat?conv=${id}`}
                      className="p-2 rounded-xl text-slate-400 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition-colors"
                      title="Continue chat"
                    >
                      <ArrowRight className="w-4 h-4" />
                    </Link>
                    <button
                      type="button"
                      onClick={() => setDeleteId(id)}
                      className="p-2 rounded-xl text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors"
                      title="Delete chat"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        <PaginationControls
          pagination={pagination}
          onPageChange={(newPage) => setPage(newPage)}
        />
      </div>

      <ConfirmDialog
        isOpen={!!deleteId}
        title="Delete Conversation History?"
        description="Are you sure you want to delete this conversation? This action cannot be undone."
        confirmLabel="Delete"
        onConfirm={handleDelete}
        onCancel={() => setDeleteId(null)}
      />
    </div>
  );
}
