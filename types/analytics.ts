export interface AnalyticsOverview {
  total_students: number;
  total_conversations: number;
  total_messages?: number;
  total_questions?: number;
  open_tickets: number;
  resolved_tickets: number;
  knowledge_documents: number;
  average_rating: number;
  helpful_rate: number;
}

export interface IntentMetric {
  intent: string;
  count: number;
  percentage?: number;
  avg_confidence?: number;
}

export interface TicketMetrics {
  total: number;
  by_status: Record<string, number>;
  by_priority: Record<string, number>;
  by_department?: Record<string, number>;
  avg_resolution_hours?: number;
}

export interface FeedbackMetrics {
  total: number;
  positive_count: number;
  negative_count: number;
  positive_ratio: number;
  recent_comments?: Array<{
    rating: string;
    comment: string;
    created_at: string;
  }>;
}

export interface AuditLog {
  id: string;
  _id?: string;
  user_id?: string;
  action: string;
  resource_type: string;
  resource_id?: string;
  metadata?: Record<string, any>;
  created_at: string;
}
