import { redirect } from "react-router";
import type { LoaderFunctionArgs } from "react-router";

export function meta() {
  return [
    { title: "Product | WeMake" },
    { name: "description", content: "Product details and information" },
  ];
}

export function loader({ params }: LoaderFunctionArgs) {
  const { productId } = params;
  return redirect(`/products/${productId}/overview`);
}

export default function ProductRedirectionPage() {
  return null;
} 