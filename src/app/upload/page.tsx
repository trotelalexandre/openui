import { getSupabaseAuth } from "@/lib/supabase/server";
import UploadForm from "./upload-form";

export default async function Page() {
  const { userId } = await getSupabaseAuth();

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Upload</h1>
      <UploadForm userId={userId} />
    </div>
  );
}
