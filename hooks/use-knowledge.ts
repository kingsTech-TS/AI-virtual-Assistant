"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { knowledgeService, KnowledgeListFilters } from "@/services/knowledge.service";
import { KnowledgeCreate, KnowledgeUpdate } from "@/types/knowledge";
import { toast } from "sonner";
import { parseApiError } from "@/lib/api";

export function useKnowledge(filters?: KnowledgeListFilters) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["knowledge", filters],
    queryFn: () => knowledgeService.listKnowledge(filters),
  });

  const createMutation = useMutation({
    mutationFn: (data: KnowledgeCreate) => knowledgeService.createKnowledge(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["knowledge"] });
      toast.success("Knowledge document ingested & indexed");
    },
    onError: (err) => {
      toast.error("Failed to add knowledge document", {
        description: parseApiError(err),
      });
    },
  });

  const uploadMutation = useMutation({
    mutationFn: (formData: FormData) => knowledgeService.uploadDocument(formData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["knowledge"] });
      toast.success("Academic document uploaded & vector embedded");
    },
    onError: (err) => {
      toast.error("Failed to process document upload", {
        description: parseApiError(err),
      });
    },
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => knowledgeService.deleteKnowledge(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["knowledge"] });
      toast.success("Knowledge document deleted");
    },
    onError: (err) => {
      toast.error("Failed to delete document", {
        description: parseApiError(err),
      });
    },
  });

  return {
    ...query,
    createDocument: createMutation.mutateAsync,
    isCreating: createMutation.isPending,
    uploadDocument: uploadMutation.mutateAsync,
    isUploading: uploadMutation.isPending,
    deleteDocument: deleteMutation.mutateAsync,
    isDeleting: deleteMutation.isPending,
  };
}

export function useKnowledgeDetail(id: string) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["knowledge", id],
    queryFn: () => knowledgeService.getKnowledge(id),
    enabled: !!id,
  });

  const updateMutation = useMutation({
    mutationFn: (data: KnowledgeUpdate) => knowledgeService.updateKnowledge(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["knowledge", id] });
      queryClient.invalidateQueries({ queryKey: ["knowledge"] });
      toast.success("Document updated & re-indexed");
    },
    onError: (err) => {
      toast.error("Failed to update document", {
        description: parseApiError(err),
      });
    },
  });

  return {
    ...query,
    updateDocument: updateMutation.mutateAsync,
    isUpdating: updateMutation.isPending,
  };
}
