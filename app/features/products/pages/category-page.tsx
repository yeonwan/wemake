import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/category-page";
import type { MetaFunction } from "react-router";
import { ProductCard } from "../components/product-card";

interface CategoryPageProps extends Route.ComponentProps {}


export const meta = ({ params }: Route.MetaArgs) => {
  return [
    { title: `Developer Tools | WeMake` },
    { name: "description", content: "Products in this category on WeMake" }
  ];
};

export default function CategoryPage() {
  return (
    <div className="container py-8">
      <Hero
        title="Developer Tools"
        description="Tools for developers"
      />

      <div className="py-20 grid grid-cols-3 gap-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={`product-${index}`}
            id={`product-${index}`}
            name={`Product Name ${index}`}
            description={`Product Description ${index}`}
            commentsCount={48}
            viewsCount={136}
            upvotes={480}
          />
        ))}
      </div>
    </div>
  );
} 