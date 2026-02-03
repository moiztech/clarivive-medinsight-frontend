import { serverApi } from "@/lib/axios";
import axios from "axios";
import { NextRequest, NextResponse } from "next/server";

export async function POST(request: NextRequest) {
  try {
    const formData = await request.formData();

    // specific mapping for external API
    const apiFormData = new FormData();

    const token = formData.get("token");
    if (token) apiFormData.append("company_token", token as string);

    const orgName = formData.get("org_name");
    if (orgName) apiFormData.append("company_name", orgName as string);

    const contactName = formData.get("contact_name");
    if (contactName)
      apiFormData.append("primary_contact_name", contactName as string);

    const numEmployees = formData.get("num_employees");
    if (numEmployees)
      apiFormData.append("no_of_employees", numEmployees as string);

    const phone = formData.get("phone");
    if (phone) apiFormData.append("contact", phone as string);

    const address = formData.get("address");
    if (address) apiFormData.append("address", address as string);

    const logo = formData.get("logo");
    if (logo && logo instanceof File) {
      apiFormData.append("logo", logo);
    }

    // User request: endpoint: /update/company-detail (patch)
    // Note: If you encounter issues with multipart/form-data and PATCH on some backends (like PHP/Laravel),
    // you might need to use POST method spoofing: method='POST', body data includes '_method'='PATCH'.
    // However, trying standard PATCH first as requested.
    const response = await serverApi.patch(
      "/update/company-detail",
      apiFormData,
    );
    const data = response.data;

    return NextResponse.json({
      success: true,
      message: data.message,
      token: data.token,
      data: data.data,
    });
  } catch (error: any) {
    console.error("Onboarding Error:", error.message);

    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const data = error.response?.data || {};

      return NextResponse.json(
        {
          message: data.message || error.message || "An error occurred",
          errors: data.errors,
        },
        { status: status },
      );
    }

    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 },
    );
  }
}
