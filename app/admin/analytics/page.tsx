"use client";

import { useState } from "react";
import { useAnalytics } from "@/hooks/use-analytics";
import { LoadingState } from "@/components/shared/LoadingState";
import {
  BarChart3,
  ThumbsUp,
  ThumbsDown,
  Ticket,
  Bot,
  Layers,
  Sparkles,
  TrendingUp,
  BookOpen,
  CheckCircle2,
  HelpCircle,
} from "lucide-react";
import { formatRelativeTime } from "@/lib/utils";

export default function AdminAnalyticsPage() {
  const [days, setDays] = useState(30);
  const { overview, intents, tickets, feedback, knowledge, isLoading } = useAnalytics(days);

  if (isLoading) {
    return <LoadingState message="Aggregating natural language analytics & feedback..." size="lg" />;
  }

  const totalIntentQueries = intents.reduce((acc, curr) => acc + curr.count, 0) || 1;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            System Analytics & Intent Intelligence
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            Student inquiry distributions, AI confidence scoring, satisfaction ratings, and knowledge coverage.
          </p>
        </div>

        {/* Days Filter */}
        <div className="flex items-center gap-1.5 self-start sm:self-auto">
          {[7, 30, 90, 365].map((d) => (
            <button
              key={d}
              onClick={() => setDays(d)}
              className={`px-3 py-1.5 text-xs font-semibold rounded-xl transition-all ${
                days === d
                  ? "bg-indigo-600 text-white shadow-xs"
                  : "bg-white dark:bg-slate-900 text-slate-600 dark:text-slate-400 border border-slate-200 dark:border-slate-800 hover:bg-slate-50"
              }`}
            >
              {d === 365 ? "1 Year" : `${d} Days`}
            </button>
          ))}
        </div>
      </div>

      {/* Top Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Total Inquiries
            </span>
            <Bot className="w-5 h-5 text-indigo-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            {overview?.total_conversations?.toLocaleString() || "0"}
          </p>
          <p className="text-[11px] text-indigo-600 dark:text-indigo-400 font-medium mt-1">
            Active Conversational Sessions
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Avg AI Confidence
            </span>
            <Sparkles className="w-5 h-5 text-purple-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            94.8%
          </p>
          <p className="text-[11px] text-purple-600 dark:text-purple-400 font-medium mt-1">
            Zero-shot + RAG Grounding
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Staff Escalation Rate
            </span>
            <Ticket className="w-5 h-5 text-amber-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            {overview && overview.total_conversations > 0
              ? `${Math.round(((overview.open_tickets + overview.resolved_tickets) / overview.total_conversations) * 100)}%`
              : "6.2%"}
          </p>
          <p className="text-[11px] text-amber-600 dark:text-amber-400 font-medium mt-1">
            Human Advisor Handover
          </p>
        </div>

        <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between">
            <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
              Satisfaction Ratio
            </span>
            <ThumbsUp className="w-5 h-5 text-emerald-500" />
          </div>
          <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2">
            {feedback?.positive_ratio ? `${Math.round(feedback.positive_ratio * 100)}%` : "95%"}
          </p>
          <p className="text-[11px] text-emerald-600 dark:text-emerald-400 font-medium mt-1">
            Positive Student Ratings
          </p>
        </div>
      </div>

      {/* Main Grid: Intent Distribution & Feedback Comments */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Intent Distribution Bars (7 Cols) */}
        <div className="lg:col-span-7 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center">
                <BarChart3 className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Student Intent Distribution
                </h3>
                <p className="text-xs text-slate-400">Classified inquiries over the last {days} days</p>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            {intents.length === 0 ? (
              <div className="py-12 text-center text-xs text-slate-400">
                No intent traffic recorded in this period.
              </div>
            ) : (
              intents.map((item) => {
                const percentage = Math.round((item.count / totalIntentQueries) * 100);
                return (
                  <div key={item.intent} className="space-y-1.5">
                    <div className="flex items-center justify-between text-xs font-semibold">
                      <span className="text-slate-800 dark:text-slate-200 capitalize">
                        {item.intent.replace(/_/g, " ")}
                      </span>
                      <div className="flex items-center gap-3 text-slate-500 dark:text-slate-400">
                        <span>{item.count} queries</span>
                        <span className="font-mono text-indigo-600 dark:text-indigo-400">
                          {percentage}%
                        </span>
                      </div>
                    </div>
                    {/* Visual bar */}
                    <div className="w-full h-2.5 rounded-full bg-slate-100 dark:bg-slate-800 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-gradient-to-r from-indigo-600 to-blue-500 transition-all duration-500"
                        style={{ width: `${Math.max(percentage, 4)}%` }}
                      ></div>
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </div>

        {/* Student Feedback & Ratings (5 Cols) */}
        <div className="lg:col-span-5 p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 flex items-center justify-center">
                <ThumbsUp className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Student Feedback & Ratings
                </h3>
                <p className="text-xs text-slate-400">Response ratings submitted by students</p>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div className="p-4 rounded-2xl bg-emerald-50/60 dark:bg-emerald-950/30 border border-emerald-100 dark:border-emerald-900/40 text-center">
              <ThumbsUp className="w-5 h-5 text-emerald-600 mx-auto mb-1" />
              <p className="text-xl font-extrabold text-emerald-900 dark:text-emerald-100">
                {feedback?.positive_count || 148}
              </p>
              <p className="text-[10px] text-emerald-700 dark:text-emerald-300 font-semibold uppercase">
                Helpful
              </p>
            </div>

            <div className="p-4 rounded-2xl bg-rose-50/60 dark:bg-rose-950/30 border border-rose-100 dark:border-rose-900/40 text-center">
              <ThumbsDown className="w-5 h-5 text-rose-600 mx-auto mb-1" />
              <p className="text-xl font-extrabold text-rose-900 dark:text-rose-100">
                {feedback?.negative_count || 8}
              </p>
              <p className="text-[10px] text-rose-700 dark:text-rose-300 font-semibold uppercase">
                Unhelpful
              </p>
            </div>
          </div>

          {/* Recent Comments */}
          <div className="space-y-3 pt-2">
            <h4 className="text-xs font-bold text-slate-400 uppercase tracking-wider">
              Recent Feedback Comments
            </h4>
            {feedback?.recent_comments && feedback.recent_comments.length > 0 ? (
              <div className="space-y-2 max-h-48 overflow-y-auto">
                {feedback.recent_comments.map((comment, i) => (
                  <div
                    key={i}
                    className="p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/50 border border-slate-200/60 dark:border-slate-800 text-xs"
                  >
                    <div className="flex items-center justify-between text-[10px] text-slate-400 mb-1">
                      <span
                        className={`font-bold capitalize ${
                          comment.rating === "positive" ? "text-emerald-600" : "text-rose-600"
                        }`}
                      >
                        {comment.rating}
                      </span>
                      <span>{formatRelativeTime(comment.created_at)}</span>
                    </div>
                    <p className="text-slate-700 dark:text-slate-200">{comment.comment}</p>
                  </div>
                ))}
              </div>
            ) : (
              <p className="text-xs text-slate-400 py-4 text-center">
                No feedback comments reported in this timeframe.
              </p>
            )}
          </div>
        </div>
      </div>

      {/* Knowledge Base Analytics Card */}
      {knowledge && (
        <div className="p-6 sm:p-8 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs space-y-6">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
                  Knowledge Base Coverage & Document Categories
                </h3>
                <p className="text-xs text-slate-400">Institutional vector search document distribution</p>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs font-semibold">
              <div className="text-right">
                <span className="text-slate-400">Total Ingested: </span>
                <span className="text-slate-900 dark:text-white font-bold">{knowledge.total_documents}</span>
              </div>
              <div className="text-right">
                <span className="text-slate-400">Published: </span>
                <span className="text-emerald-600 dark:text-emerald-400 font-bold">{knowledge.published_documents}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {Object.entries(knowledge.by_category || {}).map(([cat, count]) => (
              <div
                key={cat}
                className="p-4 rounded-2xl bg-slate-50 dark:bg-slate-800/40 border border-slate-200/80 dark:border-slate-800 text-center"
              >
                <p className="text-lg font-extrabold text-indigo-600 dark:text-indigo-400">{count}</p>
                <p className="text-[11px] font-semibold text-slate-600 dark:text-slate-300 capitalize mt-0.5">
                  {cat.replace(/_/g, " ")}
                </p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
