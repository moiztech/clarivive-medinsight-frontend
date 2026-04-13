import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serverApi } from "@/lib/axios";

export async function POST(req: Request) {
  const auth = req.headers.get("authorization") || "";

  try {
    // Use the general /auth/logout that works for all roles
    await serverApi.post("/auth/logout", null, {
      headers: { Authorization: auth },
    });
  } catch {
    // ignore backend errors; we still clear cookie locally
  }

  (await cookies()).set("access_token", "", { path: "/", maxAge: 0 });
  (await cookies()).set("refresh_token", "", { path: "/", maxAge: 0 });
  return NextResponse.json({ ok: true });
}
