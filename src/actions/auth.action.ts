"use server";

import { baseURL } from "@/data/url";
import { createClient } from "@/lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function signInWithGitHub() {
  const supabase = await createClient();

  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: "github",
    options: {
      redirectTo: `${baseURL}/auth/callback`,
    },
  });

  if (error) {
    redirect("/auth/error");
  }

  if (data.url) {
    redirect(data.url);
  }

  revalidatePath("/", "layout");
}

export async function signOut() {
  const supabase = await createClient();

  await supabase.auth.signOut();

  revalidatePath("/", "layout");
}
