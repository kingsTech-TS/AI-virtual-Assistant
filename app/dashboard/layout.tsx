"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { StudentSidebar } from "@/components/layout/StudentSidebar";
import { Header } from "@/components/layout/Header";
import { LoadingState } from "@/components/shared/LoadingState";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, user } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading && !isAuthenticated) {
      router.push("/login");
    }
  }, [isLoading, isAuthenticated, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <LoadingState message="Authenticating session..." size="lg" />
      </div>
    );
  }

  if (!isAuthenticated) return null;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* ── Desktop Sidebar (always visible on lg+) ── */}
      <div className="hidden lg:flex">
        <div className="h-screen sticky top-0">
          <StudentSidebar />
        </div>
      </div>

      {/* ── Mobile Drawer Overlay ── */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          {/* Slide-in panel */}
          <div className="relative z-50 flex h-full w-64 flex-col animate-in slide-in-from-left duration-200">
            <StudentSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* ── Main Content ── */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title={user?.department_name ? `${user.department_name} Portal` : "Academic Support Portal"}
          subtitle="Intelligent Virtual Assistant & Advisory Helpdesk"
          showSearch
          onMenuClick={() => setSidebarOpen(true)}
        />
        <main className="flex-1 p-4 sm:p-6 lg:p-8 max-w-7xl w-full mx-auto">
          {children}
        </main>
      </div>
    </div>
  );
}
