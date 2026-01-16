import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serverApi } from "@/lib/axios/server";

export async function POST(req: Request) {
  // We forward access token (sent from client as Authorization)
  const auth = req.headers.get("authorization") || "";

  try {
    await serverApi.post("/learner/logout", null, {
      headers: { Authorization: auth },
    });
  } catch {
    // ignore backend errors; we still clear cookie locally
  }

  (await cookies()).set("refresh_token", "", { path: "/", maxAge: 0 });
  return NextResponse.json({ ok: true });
}
