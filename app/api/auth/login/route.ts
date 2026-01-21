import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serverApi } from "@/lib/axios";

export async function POST(req: Request) {
  const body = await req.json(); // { email, password, remember? }

  const form = new URLSearchParams();
  form.set("email", body.email);
  form.set("password", body.password);

  const backendRes = await serverApi.post("/learner/login", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  // Backend shape: { status, message, data: { access_token, refresh_token, id, name, email, role, ... } }
  const payload = backendRes.data;
  const data = payload?.data;

  const refreshToken = data?.refresh_token;
  if (refreshToken) {
    (await cookies()).set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      // If you want "remember me" to persist, uncomment:
      // maxAge: body.remember ? 60 * 60 * 24 * 30 : undefined,
    });
  }

  const user = data
    ? {
        id: data.user?.id,
        name: data.user?.name,
        email: data.user?.email,
        role: data.user?.role,
      }
    : null;

  return NextResponse.json({
    status: payload?.status ?? true,
    message: payload?.message ?? "Login successful",
    access_token: data?.access_token ?? null,
    token_type: data?.token_type ?? "Bearer",
    user,
  });
}
