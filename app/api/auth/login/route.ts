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

  let backendRes;
  try {
    // Use the general /auth/login endpoint (works for all roles: super_admin, company_admin, trainer, learner)
    backendRes = await serverApi.post("/auth/login", {
      email: body.email,
      password: body.password,
    });
  } catch (err: any) {
    // Backend returned non-2xx (e.g. 401 invalid credentials)
    const message = err?.response?.data?.message || "Invalid credentials";
    return NextResponse.json(
      { status: false, message },
      { status: err?.response?.status || 401 },
    );
  }

  // Backend /auth/login shape: { status: 200, message, token, data: user_object }
  const payload = backendRes.data;

  // The token is at top level from AuthController, user data is in payload.data
  const accessToken = payload?.token || payload?.data?.access_token;
  const userData = payload?.data;

  if (accessToken) {
    (await cookies()).set("access_token", accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  // /auth/login returns refresh_token via Set-Cookie header from backend if present
  // Also check response body for refresh_token (learner login path)
  const refreshToken = payload?.data?.refresh_token;
  if (refreshToken) {
    (await cookies()).set("refresh_token", refreshToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  // /auth/login returns user with role as object { id, name }, normalize to consistent shape
  const user = userData
    ? {
        ...userData,
        role: userData.role, // can be object { id, name } or string
      }
    : null;

  return NextResponse.json({
    status: payload?.status ?? true,
    message: payload?.message ?? "Login successful",
    token_type: "Bearer",
    user,
    access_token: accessToken,
  });
}
