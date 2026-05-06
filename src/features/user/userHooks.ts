// features/users/user.hooks.ts

import {
  useQuery,
  useMutation,
  useQueryClient,
} from "@tanstack/react-query";

import { userRepo } from "./userRepo";
import type { UserDetails } from "./userRepo";

// ==============================
// GET USER BY ID
// ==============================

export const useUser = (id: string) => {
  return useQuery({
    queryKey: ["user", id],
    queryFn: () => userRepo.getById(id),
    enabled: !!id,
  });
};

// ==============================
// GET ALL USERS
// ==============================

export const useUsers = () => {
  return useQuery({
    queryKey: ["users"],
    queryFn: userRepo.getAll,
  });
};

// ==============================
// CREATE USER
// ==============================

export const useCreateUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (user: UserDetails) => userRepo.create(user),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// ==============================
// UPDATE USER
// ==============================

export const useUpdateUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: ({
      id,
      updates,
    }: {
      id: string;
      updates: Partial<UserDetails>;
    }) => userRepo.update(id, updates),

    onSuccess: (_, variables) => {
      qc.invalidateQueries({ queryKey: ["user", variables.id] });
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// ==============================
// DELETE USER
// ==============================

export const useDeleteUser = () => {
  const qc = useQueryClient();

  return useMutation({
    mutationFn: (id: string) => userRepo.remove(id),

    onSuccess: () => {
      qc.invalidateQueries({ queryKey: ["users"] });
    },
  });
};

// ==============================
// CURRENT USER DETAILS
// ==============================

export const useCurrentUserDetails = () => {
  return useQuery({
    queryKey: ["current-user-details"],
    queryFn: userRepo.getCurrentUserDetails,
  });
};