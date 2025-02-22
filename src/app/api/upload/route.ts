import { NextResponse } from "next/server";
import { db } from "@/db";
import { components } from "@/db/schema";
import prettier from "prettier";
import { z } from "zod";
import { createClient } from "@/lib/supabase/server";

const schema = z.object({
  name: z.string(),
  description: z.string(),
  file: z.instanceof(File),
  type: z.string(),
  userId: z.string(),
});

export async function POST(req: Request) {
  try {
    const supabase = await createClient();

    // parse request body
    const formData = await req.formData();
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;
    const file = formData.get("file") as File;
    const type = formData.get("type") as string;
    const userId = formData.get("userId") as string;

    // validate request body
    await schema.parseAsync({ name, description, file, type, userId });

    // format component code
    const fileContents = await file.text();
    const fileExtension = file.name.split(".").pop();
    const parser =
      fileExtension === "ts" || fileExtension === "tsx"
        ? "typescript"
        : "babel";

    let formattedCode;
    try {
      formattedCode = await prettier.format(fileContents, {
        parser,
        semi: false,
        singleQuote: true,
        trailingComma: "es5",
      });
    } catch (formattingError) {
      console.error("Prettier formatting error:", formattingError);
      return NextResponse.json(
        { error: "Syntax error in uploaded code" },
        { status: 400 },
      );
    }

    // upload component code to storage
    const filePath = `components/${userId}/${name}-${Date.now()}.tsx`;
    const { error } = await supabase.storage
      .from("components")
      .upload(filePath, formattedCode, { contentType: "text/plain" });

    if (error) {
      console.error(error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    // get public url
    const { data } = supabase.storage.from("components").getPublicUrl(filePath);
    const url = data?.publicUrl;

    // save component metadata to db
    await db
      .insert(components)
      .values({ name, description, url, type, userId });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
