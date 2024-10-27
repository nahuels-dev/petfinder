"use server";

import { createClient } from '@/app/utils/supabase/server';

export async function getUserServerAction() {
  const supabase = createClient();
  const { data, error } = await supabase.auth.getUser();

  if (error) {
    console.error("Error fetching user", error);
    return null;
  }

  return data.user;
}

export async function getUserById(userId: string) {
  const supabase = createClient();
  const { data, error } = await supabase.auth.admin.getUserById(userId);

  if (error) {
    console.error("Error fetching user by ID", error);
    return null;
  }

  return data.user;
}

export async function logout() {
  const supabase = createClient();
  const { error } = await supabase.auth.signOut();

  if (error) {
    console.error("Error logging out", error);
    return { success: false, error };
  }

  return { success: true };
}