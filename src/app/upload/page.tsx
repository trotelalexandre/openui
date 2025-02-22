"use client";

import { useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";

interface FormData extends FieldValues {
  name: string;
  description: string;
  code: string;
}

// TODO: use form tuto from shadcn/ui
export default function Page() {
  const [loading, setLoading] = useState(false);

  const { register, handleSubmit } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setLoading(true);

    try {
      await fetch("/api/upload", {
        method: "POST",
        body: JSON.stringify(data),
      });
    } catch {
      toast("An error occurred");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6 p-6">
      <h1 className="text-2xl font-bold">Upload</h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        <Input placeholder="Name" {...register("name")} required />
        <Textarea
          placeholder="Description"
          {...register("description")}
          required
        />
        <Textarea placeholder="Code" {...register("code")} required />
        <Button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </form>
    </div>
  );
}
