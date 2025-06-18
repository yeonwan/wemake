import type { MetaFunction } from "react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";
import { ProductCard } from "~/features/products/components/product-card";
import type { Route } from "./+types/profile-products-page";
import { getUserProducts } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: MetaFunction = () => {
  return [
    { title: "Products | WeMake" },
    { name: "description", content: "View user's products" },
  ];
};

export const loader = async ({params, request}: Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const products = await getUserProducts(client, { username: params.username });
  return { products };
};

export default function ProfileProductsPage({loaderData} : Route.ComponentProps) {
  const {products} = loaderData;  
  return (
    <div className="flex flex-col gap-5">
      {products.map((product) => (
        <ProductCard
          id={product.product_id.toString()}
          name={product.name}
          description={product.tagline}
          commentsCount={Number(product.reviews)}
          viewsCount={Number(product.views)}
          upvotes={Number(product.upvotes)}
        />
      ))}
    </div>

  );
} 