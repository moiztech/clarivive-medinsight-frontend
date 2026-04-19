import { serverApi } from "@/lib/axios";
import { NextResponse } from "next/server";
import { headers } from "next/headers";

export async function GET() {
  const token = (await headers()).get("authorization") || "";
  if (!token) {
    return NextResponse.json(
      {
        status: false,
        message: "Unauthorized",
      },
      { status: 401 },
    );
  }

  // Use /verify-token which works for all roles (not just learner)
  const res = await serverApi.get("/verify-token", {
    headers: {
      Authorization: token,
    },
  });

  if (res.data?.status == 200 || res.data?.status == true) {
    // /verify-token returns { status, message, data: user_with_role }
    const user = res.data?.data ?? null;
    return NextResponse.json(
      { status: true, user },
      { status: 200 },
    );
  }

  return NextResponse.json(
    {
      status: false,
      message: "Unauthorized",
    },
    { status: 401 },
  );
}
