import { serverApi } from "@/lib/axios";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> },
) {
  const token = (await params).token;

  if (!token) {
    return NextResponse.json(
      {
        valid: false,
        reason: "Token is missing",
      },
      { status: 200 },
    );
  }

  // console.log(request.body);

  try {
    const backendRes = await serverApi.get(`/company-detail/${token}`);
    const payload = backendRes.data;

    if (!payload?.status || payload.status !== 200) {
      return NextResponse.json(
        {
          valid: false,
          reason:
            "Something went wrong, verify token correctness. " + payload?.error,
        },
        { status: 422 },
      );
    }

    return NextResponse.json(
      {
        valid: true,
        data: payload.data,
      },
      { status: 200 },
    );
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Verification error:", error.message);
      // If upstream returns 404, it means token is invalid
      if (error.response?.status === 404) {
        return NextResponse.json(
          {
            valid: false,
            reason: "Invalid token",
          },
          { status: 200 }, // Return 200 so frontend can handle it without crashing
        );
      }
    } else {
      console.error("Verification error:", error);
    }

    return NextResponse.json(
      {
        valid: false,
        reason: "Internal server error",
      },
      { status: 500 },
    );
  }
}
