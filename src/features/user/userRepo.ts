// features/users/user.repo.ts

import { supabase } from "../../Supabase/Client";

export interface UserDetails {
  id?: string;
  full_name?: string;
  university?: string;
  course?: string;
  branch?: string;
  year?: string;
  avatar_url?: string;
  role: "candidate" | "recruiter";
  created_at?: string;
}

export const userRepo = {
  // CREATE
  async create(user: UserDetails) {
    const { data, error } = await supabase
      .from("user_details")
      .insert([user])
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // GET BY ID
  async getById(id: string) {
    const { data, error } = await supabase
      .from("user_details")
      .select("*")
      .eq("id", id)
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // GET ALL
  async getAll() {
    const { data, error } = await supabase
      .from("user_details")
      .select("*");

    if (error) throw new Error(error.message);
    return data;
  },

  // UPDATE
  async update(id: string, updates: Partial<UserDetails>) {
    const { data, error } = await supabase
      .from("user_details")
      .update(updates)
      .eq("id", id)
      .select()
      .single();

    if (error) throw new Error(error.message);
    return data;
  },

  // DELETE
  async remove(id: string) {
    const { error } = await supabase
      .from("user_details")
      .delete()
      .eq("id", id);

    if (error) throw new Error(error.message);
  },

  // CURRENT USER DETAILS (IMPORTANT)
  async getCurrentUserDetails() {
    const { data: authData, error: authError } =
      await supabase.auth.getUser();

    if (authError) throw new Error(authError.message);

    const userId = authData.user?.id;
    if (!userId) return null;

    return this.getById(userId);
  },
};