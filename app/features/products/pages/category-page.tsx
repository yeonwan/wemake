import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/category-page";
import { data, type MetaFunction } from "react-router";
import { ProductCard } from "../components/product-card";
import { z } from "zod";
import { getCategory, getCategoryPages, getProductsByCategory } from "../queries";
import { ProductPagination } from "~/common/components/product-pagination";
import { makeSSRClient } from "~/supa-client";

interface CategoryPageProps extends Route.ComponentProps {}


export const meta = ({ params }: Route.MetaArgs) => {
  return [
    { title: `Developer Tools | WeMake` },
    { name: "description", content: "Products in this category on WeMake" }
  ];
};

const paramsSchema = z.object({
  categoryId: z.coerce.number(),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {    
  const {client, headers} = makeSSRClient(request);
  const url = new URL(request.url);
  const page = url.searchParams.get("page") ? Number(url.searchParams.get("page")) : 1;
  const { success, data: parsedParams } = paramsSchema.safeParse(params);
  if (!success) {
    throw data({
      error_code: "INVALID_CATEGORY",
      message: "Invalid Category",
    }, { status: 400 });
  }

  const [category, products, totalPages] = await Promise.all([
    getCategory(client, { categoryId: parsedParams.categoryId }),
    getProductsByCategory(client, { categoryId: parsedParams.categoryId, page }),
    getCategoryPages(client, { categoryId: parsedParams.categoryId })
  ])
  return { category, products, totalPages };
};

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container py-8">
      <Hero
        title={loaderData.category.name}
        description={loaderData.category.description}
      />

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