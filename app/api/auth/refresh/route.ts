import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serverApi } from "@/lib/axios";

export async function POST() {
  const refreshToken = (await cookies()).get("refresh_token")?.value;

  if (!refreshToken) {
    return NextResponse.json(
      { status: false, message: "No refresh token" },
      { status: 401 },
    );
  }

  const form = new URLSearchParams();
  form.set("refresh_token", refreshToken);

  const backendRes = await serverApi.post("/learner/refresh-token", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const payload = backendRes.data;

  // ✅ supports both wrapped and unwrapped responses
  const access_token =
    payload?.data?.access_token ?? payload?.access_token ?? null;

  if (!access_token) {
    return NextResponse.json(
      {
        status: false,
        message: payload?.message || "Refresh failed",
        raw: payload,
      },
      { status: 401 },
    );
  }

  return NextResponse.json({
    status: payload?.status ?? true,
    message: payload?.message ?? "Token refreshed",
    access_token,
    token_type: payload?.data?.token_type ?? payload?.token_type ?? "Bearer",
  });
}
