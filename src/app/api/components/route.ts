import { NextResponse } from "next/server";
import { db } from "@/db";
import { components } from "@/db/schema";

export async function GET() {
  try {
    const data = await db.select().from(components);

    return NextResponse.json(data);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error }, { status: 500 });
  }
}
