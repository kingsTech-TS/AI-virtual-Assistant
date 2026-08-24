"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { faqService, FAQListFilters } from "@/services/faq.service";
import { FAQCreate, FAQUpdate } from "@/types/faq";
import { toast } from "sonner";
import { parseApiError } from "@/lib/api";

export function useFAQs(filters?: FAQListFilters) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["faqs", filters],
    queryFn: () => faqService.listFAQs(filters),
  });

  const createMutation = useMutation({
    mutationFn: (data: FAQCreate) => faqService.createFAQ(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      toast.success("FAQ created successfully");
    },
    onError: (err) => {
      toast.error("Failed to create FAQ", {
        description: parseApiError(err),
      });
    },
  });

  const updateMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: FAQUpdate }) => faqService.updateFAQ(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      toast.success("FAQ updated");
    },
    onError: (err) => {
      toast.error("Failed to update FAQ", {
        description: parseApiError(err),
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => faqService.deleteFAQ(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["faqs"] });
      toast.success("FAQ deleted");
    },
    onError: (err) => {
      toast.error("Failed to delete FAQ", {
        description: parseApiError(err),
      });
    },
  });

  return {
    ...query,
    createFAQ: createMutation.mutateAsync,
    updateFAQ: updateMutation.mutateAsync,
    deleteFAQ: deleteMutation.mutateAsync,
    isMutating: createMutation.isPending || updateMutation.isPending || deleteMutation.isPending,
  };
}
