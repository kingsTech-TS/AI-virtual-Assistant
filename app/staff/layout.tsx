"use client";

import { ReactNode, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/use-auth";
import { StaffSidebar } from "@/components/layout/StaffSidebar";
import { Header } from "@/components/layout/Header";
import { LoadingState } from "@/components/shared/LoadingState";
import { toast } from "sonner";

export default function StaffLayout({ children }: { children: ReactNode }) {
  const { isAuthenticated, isLoading, user, hasRole } = useAuth();
  const router = useRouter();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (!isLoading) {
      if (!isAuthenticated) {
        router.push("/login");
      } else if (!hasRole(["staff", "admin", "super_admin"])) {
        toast.error("Unauthorized", {
          description: "This portal is for academic staff only.",
        });
        router.push("/dashboard");
      }
    }
  }, [isLoading, isAuthenticated, hasRole, router]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50 dark:bg-slate-950">
        <LoadingState message="Verifying staff credentials..." size="lg" />
      </div>
    );
  }

  if (!isAuthenticated || !hasRole(["staff", "admin", "super_admin"])) return null;

  return (
    <div className="flex min-h-screen bg-slate-50 dark:bg-slate-950">
      {/* Desktop Sidebar */}
      <div className="hidden lg:flex">
        <div className="h-screen sticky top-0">
          <StaffSidebar />
        </div>
      </div>

      {/* Mobile Drawer */}
      {sidebarOpen && (
        <div className="fixed inset-0 z-40 flex lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm"
            onClick={() => setSidebarOpen(false)}
          />
          <div className="relative z-50 flex h-full w-64 flex-col animate-in slide-in-from-left duration-200">
            <StaffSidebar onClose={() => setSidebarOpen(false)} />
          </div>
        </div>
      )}

      {/* Main Content */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header
          title={user?.department_name ? `${user.department_name} — Staff` : "Staff Advisor Portal"}
          subtitle={user?.position ? `${user.position} · Course Advisory & Ticket Triage` : "Course Advisory & Ticket Triage"}
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
