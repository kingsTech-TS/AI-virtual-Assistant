import { Loader2 } from "lucide-react";

interface LoadingStateProps {
  message?: string;
  size?: "sm" | "md" | "lg";
}

export function LoadingState({ message = "Loading information...", size = "md" }: LoadingStateProps) {
  const iconSize = size === "sm" ? "w-4 h-4" : size === "lg" ? "w-8 h-8" : "w-6 h-6";

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <Loader2 className={`${iconSize} animate-spin text-blue-600 dark:text-blue-400 mb-3`} />
      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 animate-pulse">{message}</p>
    </div>
  );
}
