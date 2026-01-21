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
  const res = await serverApi.get("/user", {
    headers: {
      Authorization: token,
    },
  });
  if (res.data?.status == true && res.status != 401) {
    return NextResponse.json(res.data, { status: 200 });
  }

  return NextResponse.json(
    {
      status: false,
      message: "Unauthorized",
    },
    { status: 401 },
  );
}
