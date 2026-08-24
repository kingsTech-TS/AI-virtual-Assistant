"use client";

import { WelcomeBanner } from "@/components/dashboard/WelcomeBanner";
import { QuickActionCard } from "@/components/dashboard/QuickActionCard";
import { RecentConversationsWidget } from "@/components/dashboard/RecentConversationsWidget";
import { ActiveTicketsWidget } from "@/components/dashboard/ActiveTicketsWidget";
import { ACADEMIC_CATEGORIES } from "@/lib/constants";
import { Sparkles, HelpCircle } from "lucide-react";
import Link from "next/link";

export default function StudentDashboardPage() {
  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Welcome Banner */}
      <WelcomeBanner />

      {/* Quick Action Category Tiles */}
      <div>
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <h2 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white">
              Instant Academic Advisory Categories
            </h2>
          </div>
          <Link
            href="/dashboard/chat"
            className="text-xs font-semibold text-blue-600 dark:text-blue-400 hover:underline flex items-center gap-1"
          >
            <HelpCircle className="w-3.5 h-3.5" />
            <span>Open AI Chat</span>
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {ACADEMIC_CATEGORIES.map((category) => (
            <QuickActionCard key={category.id} {...category} />
          ))}
        </div>
      </div>

      {/* Bottom Grid: Recent Chats & Support Tickets */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentConversationsWidget />
        <ActiveTicketsWidget />
      </div>
    </div>
  );
}
