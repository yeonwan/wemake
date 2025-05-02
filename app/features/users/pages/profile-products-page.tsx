import type { MetaFunction } from "react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";
import { ProductCard } from "~/features/products/components/product-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Products | WeMake" },
    { name: "description", content: "View user's products" },
  ];
};

export default function ProfileProductsPage() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 5 }).map((_, index) => (
        <ProductCard
          key={index}
          id={`productId-${index}`}
          name={`Product Name ${index}`}
          description={`Product Description ${index}`}
          commentsCount={12}
          viewsCount={34}
          upvotes={120}
        />
      ))}
    </div>

  );
} 