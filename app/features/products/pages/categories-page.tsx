import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/categories-page";
import type { MetaFunction } from "react-router";
import { CategoryCard } from "../components/category-card";
import { getCategories } from "../queries";
import { makeSSRClient } from "~/supa-client";

interface CategoriesPageProps extends Route.ComponentProps { }

const meta: MetaFunction = () => {
  return [
    { title: "Product Categories | WeMake" },
    { name: "description", content: "Browse products by category on WeMake" }
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const categories = await getCategories(client);
  return { categories };
};

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container py-8">
      <Hero title="Product Categories" description="Browse products by category on WeMake" />
      <div className="grid grid-cols-3 gap-5">
        {loaderData.categories.map((category) => (
          <CategoryCard
            key={category.category_id}
            id={category.category_id.toString()}
            name={category.name}
            description={category.description}
          />
        ))}
      </div>
    </div>
  );
} 