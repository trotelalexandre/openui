import { NextResponse } from "next/server";
import { db } from "@/db";
import { components } from "@/db/schema";

export async function GET() {
  const data = await db.select().from(components);

  return NextResponse.json(data);
}
