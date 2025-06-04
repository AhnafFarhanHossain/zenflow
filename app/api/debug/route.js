import { NextResponse } from "next/server";

export async function GET() {
  return NextResponse.json({
    hasOpenRouterKey: !!process.env.OPENROUTER_API_KEY,
    keyLength: process.env.OPENROUTER_API_KEY
      ? process.env.OPENROUTER_API_KEY.length
      : 0,
    environment: process.env.NODE_ENV,
    vercelUrl: process.env.NEXT_PUBLIC_VERCEL_URL || "localhost",
    timestamp: new Date().toISOString(),
  });
}
