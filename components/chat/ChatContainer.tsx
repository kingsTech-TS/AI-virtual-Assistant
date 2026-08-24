"use client";

import { useEffect, useRef, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useChat } from "@/hooks/use-chat";
import { ChatSidebar } from "./ChatSidebar";
import { ChatMessageItem } from "./ChatMessageItem";
import { ChatInput } from "./ChatInput";
import { SourcePanel } from "./SourcePanel";
import { SourceDetailModal } from "./SourceDetailModal";
import { TypingIndicator } from "./TypingIndicator";
import { EscalationCard } from "./EscalationCard";
import { TicketCreateModal } from "../tickets/TicketCreateModal";
import { Bot, Sparkles, BookOpen, History, ShieldCheck, X } from "lucide-react";
import { ACADEMIC_CATEGORIES } from "@/lib/constants";

export function ChatContainer() {
  const searchParams = useSearchParams();
  const initialPrompt = searchParams.get("prompt");
  const initialConvId = searchParams.get("conv");

  const {
    conversationId,
    messages,
    status,
    activeSources,
    selectedSource,
    requiresEscalation,
    escalationContext,
    setSelectedSource,
    sendMessage,
    loadConversation,
    resetChat,
  } = useChat(initialConvId);

  const [ticketModalOpen, setTicketModalOpen] = useState(false);
  const [mobileSourceOpen, setMobileSourceOpen] = useState(false);
  const [mobileHistoryOpen, setMobileHistoryOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (initialConvId) loadConversation(initialConvId);
  }, [initialConvId, loadConversation]);

  useEffect(() => {
    if (initialPrompt && messages.length === 0) sendMessage(initialPrompt);
  }, [initialPrompt, messages.length, sendMessage]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, status]);

  return (
    <div className="flex h-[calc(100vh-4rem)] overflow-hidden bg-slate-50 dark:bg-slate-950">

      {/* ── Left Panel: Chat History (desktop) ── */}
      <div className="hidden md:block">
        <ChatSidebar
          activeConversationId={conversationId}
          onSelectConversation={(id) => loadConversation(id)}
          onNewChat={resetChat}
        />
      </div>

      {/* ── Mobile History Drawer ── */}
      {mobileHistoryOpen && (
        <div className="md:hidden fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileHistoryOpen(false)}
          />
          <div className="relative z-50 w-72 h-full flex flex-col bg-white dark:bg-slate-900 shadow-2xl animate-in slide-in-from-left duration-200">
            <div className="h-12 px-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Conversation History
              </span>
              <button
                onClick={() => setMobileHistoryOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <ChatSidebar
              activeConversationId={conversationId}
              onSelectConversation={(id) => {
                loadConversation(id);
                setMobileHistoryOpen(false);
              }}
              onNewChat={() => {
                resetChat();
                setMobileHistoryOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* ── Middle: Chat Stream ── */}
      <div className="flex-1 flex flex-col h-full overflow-hidden bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800">
        {/* Top bar */}
        <div className="h-14 px-3 sm:px-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between bg-white dark:bg-slate-900 shrink-0">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0">
            {/* History toggle on mobile */}
            <button
              type="button"
              onClick={() => setMobileHistoryOpen(true)}
              className="md:hidden p-1.5 rounded-xl text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors shrink-0"
              title="Conversation history"
            >
              <History className="w-4 h-4" />
            </button>

            <div className="w-8 h-8 rounded-xl bg-blue-600 dark:bg-blue-500 text-white flex items-center justify-center font-bold text-xs shadow-xs shrink-0">
              <Bot className="w-4 h-4" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h2 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                  Academic Support AI
                </h2>
                <span className="hidden sm:flex items-center gap-1 text-[10px] font-semibold text-emerald-600 dark:text-emerald-400 bg-emerald-50 dark:bg-emerald-950/50 px-2 py-0.5 rounded-full">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </span>
              </div>
            </div>
          </div>

          {/* Mobile source toggle */}
          <button
            type="button"
            onClick={() => setMobileSourceOpen(!mobileSourceOpen)}
            className="lg:hidden flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-semibold rounded-xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 border border-blue-100 dark:border-blue-900/50 shrink-0"
          >
            <BookOpen className="w-3.5 h-3.5" />
            <span className="hidden sm:inline">Sources</span>
            {activeSources.length > 0 && (
              <span className="w-4 h-4 rounded-full bg-blue-600 text-white text-[9px] font-bold flex items-center justify-center">
                {activeSources.length}
              </span>
            )}
          </button>
        </div>

        {/* Message Thread */}
        <div className="flex-1 overflow-y-auto p-3 sm:p-6 space-y-3">
          {messages.length === 0 ? (
            <div className="max-w-2xl mx-auto text-center py-6 sm:py-12 space-y-5 animate-in fade-in duration-300">
              <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-3xl bg-blue-50 dark:bg-blue-950/50 text-blue-600 dark:text-blue-400 flex items-center justify-center mx-auto shadow-md shadow-blue-500/10">
                <Sparkles className="w-6 h-6 sm:w-7 sm:h-7" />
              </div>
              <div>
                <h3 className="text-base sm:text-lg font-bold text-slate-900 dark:text-white">
                  How can I help with your academics today?
                </h3>
                <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1 max-w-md mx-auto">
                  Ask about course registration, exams, GPA, fees, or student procedures.
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-left pt-2">
                {ACADEMIC_CATEGORIES.slice(0, 4).map((cat) => (
                  <button
                    key={cat.id}
                    onClick={() => sendMessage(cat.prompt)}
                    className="p-3 rounded-2xl border border-slate-200 dark:border-slate-800 bg-slate-50/50 dark:bg-slate-800/40 hover:bg-blue-50/50 dark:hover:bg-blue-950/30 hover:border-blue-300 dark:hover:border-blue-800 transition-all text-left group"
                  >
                    <span className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-blue-600 dark:group-hover:text-blue-400">
                      {cat.title}
                    </span>
                    <p className="text-[11px] text-slate-500 dark:text-slate-400 mt-1 line-clamp-2">
                      {cat.prompt}
                    </p>
                  </button>
                ))}
              </div>

              <div className="inline-flex items-center gap-2 text-[11px] text-slate-400 bg-slate-100 dark:bg-slate-800 px-3 py-1 rounded-full">
                <ShieldCheck className="w-3.5 h-3.5 text-blue-500" />
                <span>Answers verified against institutional handbooks with citations.</span>
              </div>
            </div>
          ) : (
            <>
              {messages.map((msg, idx) => (
                <ChatMessageItem
                  key={msg.id ? `${msg.id}-${idx}` : `msg-${idx}`}
                  message={msg}
                  onSelectSource={(src) => setSelectedSource(src)}
                />
              ))}

              {status === "searching" && (
                <TypingIndicator statusText="Searching verified institutional documents..." />
              )}
              {status === "generating" && (
                <TypingIndicator statusText="Analyzing policies and formatting response..." />
              )}

              {requiresEscalation && (
                <EscalationCard
                  onOpenTicketModal={() => setTicketModalOpen(true)}
                  messageSnippet={escalationContext?.message}
                />
              )}

              <div ref={messagesEndRef} />
            </>
          )}
        </div>

        {/* Chat Input */}
        <ChatInput
          onSendMessage={sendMessage}
          isLoading={status === "searching" || status === "generating"}
        />
      </div>

      {/* ── Right Panel: Sources (desktop) ── */}
      <div className="hidden lg:block">
        <SourcePanel
          sources={activeSources}
          onViewSource={(src) => setSelectedSource(src)}
        />
      </div>

      {/* ── Mobile Sources Drawer (slide from right) ── */}
      {mobileSourceOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex justify-end">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setMobileSourceOpen(false)}
          />
          <div className="relative z-50 w-80 max-w-full h-full flex flex-col bg-white dark:bg-slate-900 shadow-2xl animate-in slide-in-from-right duration-200">
            <div className="h-12 px-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0">
              <span className="text-xs font-bold text-slate-900 dark:text-white uppercase tracking-wider">
                Verified Sources ({activeSources.length})
              </span>
              <button
                onClick={() => setMobileSourceOpen(false)}
                className="p-1.5 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>
            <SourcePanel
              sources={activeSources}
              onViewSource={(src) => {
                setSelectedSource(src);
                setMobileSourceOpen(false);
              }}
            />
          </div>
        </div>
      )}

      {/* Modals */}
      <SourceDetailModal
        source={selectedSource}
        onClose={() => setSelectedSource(null)}
      />

      <TicketCreateModal
        isOpen={ticketModalOpen}
        onClose={() => setTicketModalOpen(false)}
        initialSubject={
          escalationContext?.message
            ? `Support Request: ${escalationContext.message.substring(0, 50)}...`
            : "Academic Support Escalation"
        }
        initialDescription={escalationContext?.message || ""}
        initialCategory={escalationContext?.intent || ""}
      />
    </div>
  );
}
