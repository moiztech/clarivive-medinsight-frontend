import CheckoutPageContent from "@/components/checkout/CheckoutPageContent";
import { dummyCourse } from "@/data/dummyCourse";

export default function CheckoutPage() {
  // In a real application, you would fetch the course data here
  // based on a course ID or slug passed in the URL.

  // For this design task, we are passing the course info via props
  // as requested.
  return <CheckoutPageContent course={dummyCourse} />;
}
