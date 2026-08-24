export interface SourceInfo {
  id?: string;
  title?: string;
  category?: string;
  page?: number | string;
  excerpt?: string;
  url?: string;
}

export interface ChatRequest {
  conversation_id?: string | null;
  message: string;
}

export interface ChatResponseData {
  conversation_id: string;
  message_id: string;
  response: string;
  intent?: string | null;
  confidence?: number | null;
  sources?: SourceInfo[];
  requires_human_support?: boolean;
}

export interface ChatMessage {
  id: string;
  conversation_id?: string;
  sender: "user" | "assistant" | "system";
  content: string;
  intent?: string | null;
  confidence?: number | null;
  sources?: SourceInfo[];
  requires_human_support?: boolean;
  created_at: string;
}
