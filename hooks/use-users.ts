"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { userService } from "@/services/user.service";
import { adminService } from "@/services/admin.service";
import { AdminUserCreateRequest, AdminUserUpdateRequest, RoleChangeRequest } from "@/types/user";
import { PaginationParams } from "@/types/api";
import { toast } from "sonner";
import { parseApiError } from "@/lib/api";

export function useUsers(params?: PaginationParams) {
  const queryClient = useQueryClient();

  const query = useQuery({
    queryKey: ["users", params],
    queryFn: () => userService.listUsers(params),
  });

  const createUserMutation = useMutation({
    mutationFn: (data: AdminUserCreateRequest) => adminService.createUser(data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User created successfully");
    },
    onError: (err) => {
      toast.error("Failed to create user", {
        description: parseApiError(err),
      });
    },
  });

  const updateUserMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: AdminUserUpdateRequest }) =>
      userService.updateUser(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("User updated");
    },
    onError: (err) => {
      toast.error("Failed to update user", {
        description: parseApiError(err),
      });
    },
  });

  const changeRoleMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: RoleChangeRequest }) =>
      adminService.changeUserRole(id, data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["users"] });
      toast.success("Role changed successfully");
    },
    onError: (err) => {
      toast.error("Failed to change role", {
        description: parseApiError(err),
      });
    },
  });

  return {
    ...query,
    users: query.data?.items || [],
    createUser: createUserMutation.mutateAsync,
    updateUser: updateUserMutation.mutateAsync,
    changeRole: changeRoleMutation.mutateAsync,
    isMutating:
      createUserMutation.isPending ||
      updateUserMutation.isPending ||
      changeRoleMutation.isPending,
  };
}
