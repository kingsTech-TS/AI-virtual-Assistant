"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { conversationService } from "@/services/conversation.service";
import { PaginationParams } from "@/types/api";
import { toast } from "sonner";
import { parseApiError } from "@/lib/api";

export function useConversations(params?: PaginationParams) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["conversations", params],
    queryFn: () => conversationService.listConversations(params),
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => conversationService.deleteConversation(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["conversations"] });
      toast.success("Conversation deleted");
    },
    onError: (err) => {
      toast.error("Failed to delete conversation", {
        description: parseApiError(err),
      });
    },
  });

  return {
    ...query,
    deleteConversation: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}
