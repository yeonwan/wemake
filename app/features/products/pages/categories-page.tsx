import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/categories-page";
import type { MetaFunction } from "react-router";
import { CategoryCard } from "../components/category-card";

interface CategoriesPageProps extends Route.ComponentProps { }

const meta: MetaFunction = () => {
  return [
    { title: "Product Categories | WeMake" },
    { name: "description", content: "Browse products by category on WeMake" }
  ];
};

export default function CategoriesPage() {
  return (
    <div className="container py-8">
      <Hero title="Product Categories" description="Browse products by category on WeMake" />
      <div className="grid grid-cols-3 gap-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <CategoryCard
            key={`category-${index}`}
            id={`category-${index}`}
            name={`Category Name ${index}`}
            description={`Category Description ${index}`}
          />
        ))}
      </div>
    </div>
  );
} 