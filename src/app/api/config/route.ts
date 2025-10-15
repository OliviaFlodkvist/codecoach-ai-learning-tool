import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    skipOpenAI: process.env.SKIP_OPENAI === "true"
  });
}
