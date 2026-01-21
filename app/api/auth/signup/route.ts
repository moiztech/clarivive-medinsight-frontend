import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { serverApi } from "@/lib/axios";

export async function POST(req: Request) {
  const body = await req.json(); // { name, email, password }

  const form = new URLSearchParams();
  form.set("name", body.name);
  form.set("email", body.email);
  form.set("password", body.password);

  const backendRes = await serverApi.post("/learner/signup", form, {
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
  });

  const payload = backendRes.data;
  const data = payload?.data;

  const refreshToken = data?.refresh_token;
  if (refreshToken) {
    (await cookies()).set("refresh_token", refreshToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      path: "/",
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
    message: payload?.message ?? "User registered successfully",
    access_token: data?.access_token ?? null,
    token_type: data?.token_type ?? "Bearer",
    user,
  });
}
