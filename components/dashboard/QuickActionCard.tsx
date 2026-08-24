import Link from "next/link";
import {
  BookOpen,
  FileCheck,
  Award,
  Calendar,
  Globe,
  GraduationCap,
  CreditCard,
  Building2,
  ArrowRight,
  LucideIcon,
} from "lucide-react";

const ICON_MAP: Record<string, LucideIcon> = {
  BookOpen,
  FileCheck,
  Award,
  Calendar,
  Globe,
  GraduationCap,
  CreditCard,
  Building2,
};

interface QuickActionCardProps {
  id: string;
  title: string;
  description: string;
  prompt: string;
  iconName: string;
  color?: string;
}

export function QuickActionCard({
  title,
  description,
  prompt,
  iconName,
}: QuickActionCardProps) {
  const Icon = ICON_MAP[iconName] || BookOpen;

  return (
    <Link
      href={`/dashboard/chat?prompt=${encodeURIComponent(prompt)}`}
      className="group relative p-5 rounded-3xl border border-slate-200/80 dark:border-slate-800 bg-white dark:bg-slate-900 hover:border-blue-500/50 hover:shadow-lg dark:hover:shadow-blue-950/30 transition-all duration-200 flex flex-col justify-between"
    >
      <div>
        <div className="w-11 h-11 rounded-2xl bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 flex items-center justify-center mb-4 group-hover:scale-105 group-hover:bg-blue-600 group-hover:text-white dark:group-hover:bg-blue-500 transition-all duration-200 shadow-xs">
          <Icon className="w-5 h-5" />
        </div>
        <h3 className="text-sm font-bold text-slate-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {title}
        </h3>
        <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 line-clamp-2 leading-relaxed">
          {description}
        </p>
      </div>

      <div className="mt-4 pt-3 border-t border-slate-100 dark:border-slate-800 flex items-center justify-between text-[11px] font-semibold text-blue-600 dark:text-blue-400">
        <span>Ask Assistant</span>
        <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
      </div>
    </Link>
  );
}
