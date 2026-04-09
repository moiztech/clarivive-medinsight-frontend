import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serverApi } from "@/lib/axios";

export async function POST(req: Request) {
  let body: { email?: string; password?: string; remember?: boolean } = {};
  try {
    const raw = await req.text();
    body = raw ? JSON.parse(raw) : {};
  } catch {
    return NextResponse.json(
      { status: false, message: "Invalid JSON body" },
      { status: 400 },
    );
  }

  if (!body.email || !body.password) {
    return NextResponse.json(
      { status: false, message: "Email and password are required" },
      { status: 400 },
    );
  }

  const form = new URLSearchParams();
  form.set("email", body.email);
  form.set("password", body.password);

  const backendRes = await serverApi.post("/learner/login", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  // Backend shape: { status, message, data: { access_token, refresh_token, id, name, email, role, ... } }
  const payload = backendRes.data;
  const data = payload?.data;

  const accessToken = data?.access_token;
  if (accessToken) {
    (await cookies()).set("access_token", accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
      // Keep parity with refresh token persistence behavior.
      // maxAge: body.remember ? 60 * 60 * 24 * 30 : undefined,
    });
  }

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
    access_token: accessToken ?? null,
    token_type: data?.token_type ?? "Bearer",
    user,
  });
}
