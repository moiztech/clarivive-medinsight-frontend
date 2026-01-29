import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // Extracting data
    const token = formData.get("token");
    const orgName = formData.get("org_name");
    const numEmployees = formData.get("num_employees");
    const contactName = formData.get("contact_name");
    const phone = formData.get("phone");
    const address = formData.get("address");
    const logoFile = formData.get("logo") as File | null;

    console.log("Onboarding Data Received:", {
      token,
      orgName,
      numEmployees,
      contactName,
      phone,
      address,
      logoName: logoFile?.name,
      logoSize: logoFile?.size,
    });

    // Validation
    if (
      !token ||
      !orgName ||
      !numEmployees ||
      !contactName ||
      !phone ||
      !address
    ) {
      return NextResponse.json(
        { message: "All required fields must be provided." },
        { status: 400 },
      );
    }

    // Dummy processing delay
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Return dummy success response
    return NextResponse.json(
      {
        success: true,
        message: "Onboarding completed successfully.",
        organizationId: "org_" + Math.random().toString(36).substr(2, 9),
      },
      { status: 200 },
    );
  } catch (error: any) {
    console.error("Onboarding Error:", error);
    return NextResponse.json(
      { message: error.message || "Something went wrong during onboarding." },
      { status: 500 },
    );
  }
}
