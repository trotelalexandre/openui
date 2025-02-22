"use client";

import { toast } from "sonner";
import axios from "axios";
import useSWR from "swr";
import { fetcher } from "@/lib/swr/fetcher";
import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Loader2 } from "lucide-react";

interface FormData extends FieldValues {
  name: string;
  description: string;
  file: FileList;
}

interface UploadFormProps {
  userId: string | undefined;
}

// TODO: use form tuto from shadcn/ui
export default function UploadForm({ userId }: UploadFormProps) {
  const [loading, setLoading] = useState(false);
  const [selectedType, setSelectedType] = useState<string | null>(null);

  const { register, handleSubmit } = useForm<FormData>();
  const { data: types, error } = useSWR("/api/component-types", fetcher);

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);

    if (!userId) {
      toast("You must be logged in to upload components");
      setLoading(false);
      return;
    }

    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("description", data.description);
    formData.append("file", data.file[0]);
    formData.append("type", selectedType!);
    formData.append("userId", userId);

    try {
      const res = await axios.post("/api/upload", formData);

      if (res.status !== 200) {
        throw new Error("An error occurred");
      }

      toast("Uploaded successfully!");
    } catch {
      toast("An error occurred while uploading");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <Input placeholder="Name" {...register("name")} required />
      <Textarea placeholder="Description" {...register("description")} />
      <Input
        type="file"
        accept=".jsx,.tsx,.js,.ts"
        {...register("file")}
        required
      />

      <div className="space-y-2">
        <h2 className="text-lg font-semibold">Select Component Type</h2>
        {error && (
          <p className="text-red-500">Failed to load component types</p>
        )}
        <div className="flex flex-wrap gap-2">
          {types?.map((type: { name: string }) => (
            <span
              key={type.name}
              className={`cursor-pointer rounded-full border px-3 py-1 ${
                selectedType === type.name
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-black"
              }`}
              onClick={() => setSelectedType(type.name)}
            >
              {type.name}
            </span>
          ))}
        </div>
      </div>

      <Button type="submit" disabled={loading}>
        {loading && <Loader2 className="mr-1 h-6 w-6 animate-spin" />}
        {loading ? "Uploading..." : "Upload"}
      </Button>
    </form>
  );
}
