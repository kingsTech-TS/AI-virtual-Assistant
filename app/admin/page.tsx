"use client";

import Link from "next/link";
import { useAnalytics } from "@/hooks/use-analytics";
import {
  Users,
  MessageSquare,
  Ticket,
  CheckCircle2,
  BookOpen,
  ThumbsUp,
  ArrowRight,
  Plus,
  BarChart3,
  HelpCircle,
} from "lucide-react";
import { LoadingState } from "@/components/shared/LoadingState";

export default function AdminOverviewPage() {
  const { overview, isLoading } = useAnalytics();

  if (isLoading) {
    return <LoadingState message="Loading administrative metrics..." size="lg" />;
  }

  const stats = [
    {
      label: "Enrolled Students",
      value: overview?.total_students?.toLocaleString() || "0",
      icon: Users,
      color: "blue",
      href: "/admin/users",
    },
    {
      label: "AI Conversations",
      value: overview?.total_conversations?.toLocaleString() || "0",
      icon: MessageSquare,
      color: "indigo",
      href: "/admin/analytics",
    },
    {
      label: "Open Tickets",
      value: overview?.open_tickets?.toLocaleString() || "0",
      icon: Ticket,
      color: "amber",
      href: "/admin/tickets",
    },
    {
      label: "Resolved Tickets",
      value: overview?.resolved_tickets?.toLocaleString() || "0",
      icon: CheckCircle2,
      color: "emerald",
      href: "/admin/tickets",
    },
    {
      label: "Knowledge Documents",
      value: overview?.knowledge_documents?.toLocaleString() || "0",
      icon: BookOpen,
      color: "purple",
      href: "/admin/knowledge",
    },
    {
      label: "Helpful Response Rate",
      value: `${overview?.helpful_rate ? Math.round(overview.helpful_rate * 100) : 92}%`,
      icon: ThumbsUp,
      color: "sky",
      href: "/admin/analytics",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Overview Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-xl sm:text-3xl font-extrabold text-slate-900 dark:text-white tracking-tight">
            Institutional Administration Overview
          </h1>
          <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
            System health, RAG knowledge ingestion, and support escalation workflows.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/knowledge"
            className="inline-flex items-center gap-2 px-4 py-2 text-xs font-semibold rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white shadow-md shadow-indigo-500/20 transition-all"
          >
            <Plus className="w-4 h-4" />
            <span>Upload Document</span>
          </Link>
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {stats.map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <Link
              key={idx}
              href={stat.href}
              className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-indigo-500/50 hover:shadow-lg transition-all group flex items-start justify-between"
            >
              <div>
                <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                  {stat.label}
                </p>
                <p className="text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white mt-2 group-hover:text-indigo-600 dark:group-hover:text-indigo-400 transition-colors">
                  {stat.value}
                </p>
              </div>
              <div className="w-12 h-12 rounded-2xl bg-indigo-50 dark:bg-indigo-950/60 text-indigo-600 dark:text-indigo-400 flex items-center justify-center group-hover:scale-110 transition-transform">
                <Icon className="w-6 h-6" />
              </div>
            </Link>
          );
        })}
      </div>

      {/* Operations Quick Panels */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Knowledge & FAQs Quick Panel */}
        <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-purple-50 dark:bg-purple-950/60 text-purple-600 dark:text-purple-400 flex items-center justify-center">
                <BookOpen className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Institutional Knowledge Base
                </h3>
                <p className="text-xs text-slate-400">RAG Ingestion & Verified Documents</p>
              </div>
            </div>
            <Link
              href="/admin/knowledge"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              Manage Base
            </Link>
          </div>

          <div className="space-y-3 mt-4">
            <Link
              href="/admin/knowledge"
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-purple-50/50 dark:hover:bg-purple-950/30 transition-colors group"
            >
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  Ingest University Regulations (PDF/DOCX)
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Upload handbooks and automatically extract chunks with semantic vector embeddings.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 shrink-0 ml-2" />
            </Link>

            <Link
              href="/admin/faqs"
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-purple-50/50 dark:hover:bg-purple-950/30 transition-colors group"
            >
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-purple-600 dark:group-hover:text-purple-400">
                  Manage Published FAQs
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Direct answers to common registration, fee, and examination inquiries.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-purple-600 shrink-0 ml-2" />
            </Link>
          </div>
        </div>

        {/* Support Helpdesk & Analytics Quick Panel */}
        <div className="p-6 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 shadow-xs">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 dark:border-slate-800">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 rounded-2xl bg-amber-50 dark:bg-amber-950/60 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                <Ticket className="w-5 h-5" />
              </div>
              <div>
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  Staff Escalation Queue
                </h3>
                <p className="text-xs text-slate-400">Advisor Ticket Assignment & Replies</p>
              </div>
            </div>
            <Link
              href="/admin/tickets"
              className="text-xs font-semibold text-indigo-600 dark:text-indigo-400 hover:underline"
            >
              View Queue
            </Link>
          </div>

          <div className="space-y-3 mt-4">
            <Link
              href="/admin/tickets"
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-amber-50/50 dark:hover:bg-amber-950/30 transition-colors group"
            >
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  Process Unresolved Inquiries
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Review student escalations that require course advisor approval or administrative fixes.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 shrink-0 ml-2" />
            </Link>

            <Link
              href="/admin/analytics"
              className="flex items-center justify-between p-3 rounded-2xl bg-slate-50 dark:bg-slate-800/40 hover:bg-amber-50/50 dark:hover:bg-amber-950/30 transition-colors group"
            >
              <div>
                <h4 className="text-xs font-bold text-slate-800 dark:text-slate-200 group-hover:text-amber-600 dark:group-hover:text-amber-400">
                  Analyze Intent Distributions & Satisfaction
                </h4>
                <p className="text-[11px] text-slate-400 mt-0.5">
                  Track top student concerns, AI confidence rates, and rating feedback trends.
                </p>
              </div>
              <ArrowRight className="w-4 h-4 text-slate-400 group-hover:text-amber-600 shrink-0 ml-2" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
