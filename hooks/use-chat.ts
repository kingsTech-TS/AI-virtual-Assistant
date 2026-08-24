"use client";

import { useState, useCallback } from "react";
import { ChatMessage, SourceInfo } from "@/types/chat";
import { chatService } from "@/services/chat.service";
import { conversationService } from "@/services/conversation.service";
import { parseApiError } from "@/lib/api";
import { toast } from "sonner";

export type ChatStateStatus = "idle" | "searching" | "generating" | "error";

export function useChat(initialConversationId?: string | null) {
  const [conversationId, setConversationId] = useState<string | null>(initialConversationId || null);
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [status, setStatus] = useState<ChatStateStatus>("idle");
  const [selectedSource, setSelectedSource] = useState<SourceInfo | null>(null);
  const [activeSources, setActiveSources] = useState<SourceInfo[]>([]);
  const [requiresEscalation, setRequiresEscalation] = useState(false);
  const [escalationContext, setEscalationContext] = useState<{ message: string; intent?: string } | null>(null);

  const loadConversation = useCallback(async (id: string) => {
    try {
      setStatus("searching");
      const conv = await conversationService.getConversation(id);
      setConversationId(id);
      if (conv.messages) {
        const seenIds = new Set<string>();
        const formatted: ChatMessage[] = [];
        for (let i = 0; i < conv.messages.length; i++) {
          const m = conv.messages[i];
          let msgId = m.id || m._id || `msg-${i}-${Date.now()}`;
          if (seenIds.has(msgId)) {
            msgId = `${msgId}-${i}`;
          }
          seenIds.add(msgId);
          formatted.push({
            id: msgId,
            conversation_id: id,
            sender: m.sender,
            content: m.content,
            intent: m.intent,
            confidence: m.confidence,
            sources: m.sources,
            requires_human_support: m.requires_human_support,
            created_at: m.created_at || new Date().toISOString(),
          });
        }
        setMessages(formatted);
        // Set latest sources if present
        const lastAssistantMsg = [...formatted].reverse().find((m) => m.sender === "assistant");
        if (lastAssistantMsg?.sources && lastAssistantMsg.sources.length > 0) {
          setActiveSources(lastAssistantMsg.sources);
        } else {
          setActiveSources([]);
        }
      }
      setStatus("idle");
    } catch (err) {
      setStatus("error");
      toast.error("Failed to load conversation history", {
        description: parseApiError(err),
      });
    }
  }, []);

  const resetChat = useCallback(() => {
    setConversationId(null);
    setMessages([]);
    setActiveSources([]);
    setSelectedSource(null);
    setRequiresEscalation(false);
    setEscalationContext(null);
    setStatus("idle");
  }, []);

  const sendMessage = useCallback(
    async (text: string) => {
      if (!text.trim()) return;

      const userMsgId = `temp-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const userMessage: ChatMessage = {
        id: userMsgId,
        conversation_id: conversationId || undefined,
        sender: "user",
        content: text,
        created_at: new Date().toISOString(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setStatus("searching");
      setRequiresEscalation(false);

      // Brief UI transition to simulate pipeline stages
      setTimeout(() => {
        setStatus((curr) => (curr === "searching" ? "generating" : curr));
      }, 750);

      try {
        const responseData = await chatService.sendMessage({
          conversation_id: conversationId,
          message: text,
        });

        if (!conversationId && responseData.conversation_id) {
          setConversationId(responseData.conversation_id);
        }

        const rawMsgId = responseData.message_id || `asst-${Date.now()}`;

        setMessages((prev) => {
          const idExists = prev.some((m) => m.id === rawMsgId);
          const finalMsgId = idExists ? `${rawMsgId}-${Date.now()}` : rawMsgId;
          const assistantMessage: ChatMessage = {
            id: finalMsgId,
            conversation_id: responseData.conversation_id,
            sender: "assistant",
            content: responseData.response,
            intent: responseData.intent,
            confidence: responseData.confidence,
            sources: responseData.sources || [],
            requires_human_support: responseData.requires_human_support,
            created_at: new Date().toISOString(),
          };
          return [...prev, assistantMessage];
        });

        if (responseData.sources && responseData.sources.length > 0) {
          setActiveSources(responseData.sources);
        }

        if (responseData.requires_human_support) {
          setRequiresEscalation(true);
          setEscalationContext({
            message: text,
            intent: responseData.intent || undefined,
          });
        }

        setStatus("idle");
      } catch (err) {
        setStatus("error");
        const errMsg = parseApiError(err);
        const errorAssistantMsg: ChatMessage = {
          id: "err-" + Date.now(),
          sender: "assistant",
          content: `⚠️ Something went wrong while processing your inquiry: ${errMsg}. Please try again or create a support ticket.`,
          requires_human_support: true,
          created_at: new Date().toISOString(),
        };
        setMessages((prev) => [...prev, errorAssistantMsg]);
        setRequiresEscalation(true);
        setEscalationContext({
          message: text,
          intent: "error_fallback",
        });
      }
    },
    [conversationId]
  );

  return {
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
  };
}
