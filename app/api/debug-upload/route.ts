import { NextResponse } from "next/server";

export async function GET() {
  const token = process.env.UPLOADTHING_TOKEN;

  if (!token) {
    return NextResponse.json({ status: "MISSING", message: "UPLOADTHING_TOKEN is not set" });
  }

  try {
    const decoded = Buffer.from(token, "base64").toString("utf8");
    const parsed = JSON.parse(decoded);
    return NextResponse.json({
      status: "OK",
      tokenLength: token.length,
      appId: parsed.appId,
      hasApiKey: !!parsed.apiKey,
      regions: parsed.regions,
    });
  } catch {
    return NextResponse.json({
      status: "INVALID",
      message: "Token is set but cannot be decoded/parsed",
      tokenStart: token.slice(0, 10),
      tokenLength: token.length,
    });
  }
}
