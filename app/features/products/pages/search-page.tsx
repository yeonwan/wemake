import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/search-page";
import { z } from "zod";
import { ProductCard } from "../components/product-card";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
interface SearchPageProps extends Route.ComponentProps { }

const paramsSchema = z.object({
  query: z.string().optional().default(""),
  page: z.number().optional().default(1),
});

export function loader({ request }: Route.LoaderArgs) {
  const url = new URL(request.url);
  const { success, data } = paramsSchema.safeParse(Object.fromEntries(url.searchParams));

  if (!success) {
    throw new Error("Invalid params");
  }
  const parsedData = { query: data.query, page: data.page };

  return {
    query: parsedData.query,
    page: parsedData.page,
  };
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Search Products | WeMake" },
    { name: "description", content: "Search for products on WeMake" }
  ];
};

export default function SearchPage({ loaderData }: SearchPageProps) {
  return (
    <div className="container py-8">
      <Hero
        title="Search Products"
        description="Search for products on WeMake"
      />

      <Form className="flex justify-center max-w-screen-md mx-auto gap-2 items-center">
        <Input name="query" placeholder="Search for products" className="text-lg" />
        <Button type="submit">Search</Button>
      </Form>

      <div className="py-20 grid grid-cols-3 gap-5">
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={`monthly-${index}`}
            id={`monthly-${index}`}
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