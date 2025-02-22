import { NextResponse } from "next/server";
import { db } from "@/db";
import { components } from "@/db/schema";

export async function POST(req: Request) {
  // TODO: use zod to validate the request body
  const { name, description, code, userId } = await req.json();
  await db.insert(components).values({ name, description, code, userId });

  return NextResponse.json({ success: true });
}
