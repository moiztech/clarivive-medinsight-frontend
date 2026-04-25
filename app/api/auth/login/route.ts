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

  let backendRes: any = null;
  let lastError: any = null;
  const loginEndpoints = ["/api/auth/login", "/api/learner/login"];

  // Support both backend contracts: older `/api/auth/login` and current `/api/learner/login`.
  for (const endpoint of loginEndpoints) {
    try {
      backendRes = await serverApi.post(endpoint, {
        email: body.email,
        password: body.password,
      });
      break;
    } catch (err: any) {
      lastError = err;
      const status = err?.response?.status;
      // If credentials are invalid, stop immediately instead of trying other endpoints.
      if (status === 401 || status === 422) {
        break;
      }
    }
  }

  if (!backendRes) {
    const message = lastError?.response?.data?.message || "Invalid credentials";
    return NextResponse.json(
      { status: false, message },
      { status: lastError?.response?.status || 401 },
    );
  }

  // Supported backend response shapes:
  // 1) { status: true, message, data: { access_token, token_type, refresh_token, user } }
  // 2) { status: 200, message, token, data: user }
  const payload = backendRes.data;

  const accessToken = payload?.data?.access_token || payload?.token;
  const refreshToken = payload?.data?.refresh_token;
  const userData = payload?.data?.user || payload?.data;

  if (accessToken) {
    (await cookies()).set("access_token", accessToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

  if (refreshToken) {
    (await cookies()).set("refresh_token", refreshToken, {
      httpOnly: false,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
    });
  }

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
