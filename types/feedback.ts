export type FeedbackRating = "positive" | "negative";

export interface FeedbackCreate {
  message_id: string;
  rating: FeedbackRating;
  comment?: string | null;
}

export interface FeedbackResponse {
  id: string;
  _id?: string;
  message_id: string;
  user_id: string;
  rating: FeedbackRating;
  comment?: string | null;
  created_at: string;
}
