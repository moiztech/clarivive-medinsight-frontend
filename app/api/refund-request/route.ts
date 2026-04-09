import { NextResponse } from "next/server";
import { serverApi } from "@/lib/axios";

export async function POST(req: Request) {
  try {
    const body = await req.json();

    const backendRes = await serverApi.post("/refund-request", body, {
      headers: { "Content-Type": "application/json" },
    });

    const payload = backendRes.data;

    return NextResponse.json(
      {
        status: payload?.status ?? true,
        message: payload?.message ?? "Request submitted successfully.",
        data: payload?.data ?? null,
      },
      { status: backendRes.status || 201 },
    );
  } catch (error: any) {
    const status = error?.response?.status || 500;
    const message = error?.response?.data?.message || "Request failed";

    return NextResponse.json(
      {
        status: false,
        message,
      },
      { status },
    );
  }
}
