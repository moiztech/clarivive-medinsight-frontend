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

  if (token === "abctesting1234") {
    return NextResponse.json(
      {
        valid: true,
        org: {
          name: "Test Org",
          email: "[EMAIL_ADDRESS]",
          type: "Company",
        },
        required_fields: ["contact_name", "phone", "address"],
      },
      { status: 200 },
    );
  }

  return NextResponse.json(
    {
      valid: false,
      reason: "The given Token is invalid or expired.",
    },
    { status: 200 },
  );
}
