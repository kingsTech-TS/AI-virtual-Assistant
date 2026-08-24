import { ChatMessage } from "./chat";

export interface Conversation {
  id: string;
  _id?: string;
  user_id: string;
  title: string;
  status: string;
  message_count?: number;
  last_message?: string;
  created_at: string;
  updated_at: string;
  messages?: ChatMessage[];
}
