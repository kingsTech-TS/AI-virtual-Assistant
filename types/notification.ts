export type NotificationType = "ticket_created" | "ticket_updated" | "ticket_assigned" | "ticket_resolved" | "knowledge_added" | "general";

export interface AppNotification {
  id: string;
  _id?: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  is_read: boolean;
  link?: string;
  created_at: string;
}
