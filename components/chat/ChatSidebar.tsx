import { useState } from "react";
import { Plus, MessageSquare, Trash2, Search } from "lucide-react";
import { useConversations } from "@/hooks/use-conversations";
import { formatRelativeTime } from "@/lib/utils";
import { ConfirmDialog } from "@/components/shared/ConfirmDialog";

interface ChatSidebarProps {
  activeConversationId: string | null;
  onSelectConversation: (id: string) => void;
  onNewChat: () => void;
}

export function ChatSidebar({
  activeConversationId,
  onSelectConversation,
  onNewChat,
}: ChatSidebarProps) {
  const { data, isLoading, deleteConversation } = useConversations({ limit: 50 });
  const [searchTerm, setSearchTerm] = useState("");
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const conversations = data?.items || [];
  const filtered = conversations.filter((c) =>
    c.title?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDeleteConfirm = async () => {
    if (deletingId) {
      await deleteConversation(deletingId);
      if (activeConversationId === deletingId) {
        onNewChat();
      }
      setDeletingId(null);
    }
  };

  return (
    <>
      <div className="w-72 border-r border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 flex flex-col h-full shrink-0">
        {/* Header with New Chat */}
        <div className="p-4 border-b border-slate-200 dark:border-slate-800 space-y-3">
          <button
            onClick={onNewChat}
            className="w-full flex items-center justify-center gap-2 px-4 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-xs shadow-md shadow-blue-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>New Conversation</span>
          </button>

          <div className="relative">
            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input
              type="text"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Search chat history..."
              className="w-full pl-8 pr-3 py-1.5 text-xs rounded-xl bg-slate-100 dark:bg-slate-800 border-none text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {isLoading ? (
            <div className="p-4 text-center text-xs text-slate-400 animate-pulse">
              Loading conversations...
            </div>
          ) : filtered.length === 0 ? (
            <div className="p-6 text-center text-xs text-slate-400">
              {searchTerm ? "No matching chats found" : "No recent conversations"}
            </div>
          ) : (
            filtered.map((conv, idx) => {
              const id = conv.id || conv._id || `conv-${idx}`;
              const isActive = activeConversationId === id;
              return (
                <div
                  key={id}
                  onClick={() => onSelectConversation(id)}
                  className={`group flex items-center justify-between p-2.5 rounded-2xl cursor-pointer transition-all ${
                    isActive
                      ? "bg-blue-50 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 font-medium"
                      : "hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-700 dark:text-slate-300"
                  }`}
                >
                  <div className="flex items-center gap-2.5 overflow-hidden">
                    <MessageSquare
                      className={`w-4 h-4 shrink-0 ${
                        isActive ? "text-blue-600 dark:text-blue-400" : "text-slate-400"
                      }`}
                    />
                    <div className="truncate">
                      <p className="text-xs truncate">{conv.title || "Academic Inquiry"}</p>
                      <p className="text-[10px] text-slate-400 truncate">
                        {formatRelativeTime(conv.updated_at || conv.created_at)}
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={(e) => {
                      e.stopPropagation();
                      setDeletingId(id);
                    }}
                    className="p-1 rounded-lg opacity-0 group-hover:opacity-100 text-slate-400 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-all shrink-0"
                    title="Delete conversation"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                </div>
              );
            })
          )}
        </div>
      </div>

      <ConfirmDialog
        isOpen={!!deletingId}
        title="Delete Conversation?"
        description="This will permanently delete this conversation and its message history from your account."
        confirmLabel="Delete"
        onConfirm={handleDeleteConfirm}
        onCancel={() => setDeletingId(null)}
      />
    </>
  );
}
