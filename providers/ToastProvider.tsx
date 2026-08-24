"use client";

import { Toaster } from "sonner";
import { useTheme } from "./ThemeProvider";

export function ToastProvider() {
  const { isDark } = useTheme();

  return (
    <Toaster
      position="top-right"
      theme={isDark ? "dark" : "light"}
      richColors
      closeButton
      duration={4000}
    />
  );
}
