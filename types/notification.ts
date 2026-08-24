export type NotificationType =
  | "ticket_created"
  | "ticket_updated"
  | "ticket_assigned"
  | "ticket_resolved"
  | "ticket_closed"
  | "ticket_comment"
  | "knowledge_added"
  | "general"
  | "announcement"
  | (string & {});

export interface AppNotification {
  id: string;
  _id?: string;
  user_id: string;
  title: string;
  message: string;
  type: NotificationType;
  metadata?: Record<string, unknown>;
  is_read: boolean;
  link?: string;
  created_at: string;
}
