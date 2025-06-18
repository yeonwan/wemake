import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/search-page";
import { z } from "zod";
import { ProductCard } from "../components/product-card";
import { Form } from "react-router";
import { Input } from "~/common/components/ui/input";
import { Button } from "~/common/components/ui/button";
import { getProductsBySearch, getProductsPagesBySearch } from "../queries";
import { ProductPagination } from "~/common/components/product-pagination";
import { makeSSRClient } from "~/supa-client";

interface SearchPageProps extends Route.ComponentProps { }

const paramsSchema = z.object({
  query: z.string().optional().default(""),
  page: z.number().optional().default(1),
});

export async function loader({ request }: Route.LoaderArgs) {
  const {client, headers} = makeSSRClient(request);
  const url = new URL(request.url);
  const { success, data } = paramsSchema.safeParse(Object.fromEntries(url.searchParams));

  if (!success) {
    throw new Error("Invalid params");
  }
  const parsedData = { query: data.query, page: data.page };
  if (parsedData.query === "") {
    return { products: [], totalPages: 1 };
  }
  const [products, totalPages] = await Promise.all([
    getProductsBySearch(client, { query: parsedData.query, page: parsedData.page }),
    getProductsPagesBySearch(client, { query: parsedData.query })
  ]);
  return { products, totalPages };
}

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Search Products | WeMake" },
    { name: "description", content: "Search for products on WeMake" }
  ];
};

export default function SearchPage({ loaderData }: Route.ComponentProps) {
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
        {loaderData.products.map((product) => (
          <ProductCard
            key={product.product_id}
            id={product.product_id.toString()}
            name={product.name}
            description={product.tagline}
            commentsCount={Number(product.reviews)}
            viewsCount={Number(product.views)}
            upvotes={Number(product.upvotes)}
          />
        ))}
      </div>
      <ProductPagination totalPages={loaderData.totalPages} />
    </div>
  );
} 