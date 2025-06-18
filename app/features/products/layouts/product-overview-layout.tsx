import { ChevronUp, StarIcon } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";
import { Button, buttonVariants } from "~/common/components/ui/button";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/product-overview-layout";
import { getProductById } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const {client, headers}  = makeSSRClient(request);
  const product = await getProductById(client, { productId: Number(params.productId) });
  return { product };
}

export default function ProductOverviewLayout({ loaderData }: Route.ComponentProps) {
  const product = loaderData.product;
  return (
    <div className="space-y-10">
      <div className="flex justify-between">
        <div className="flex gap-10">
          <div className="size-40 rounded-xl shadow-xl bg-primary/50"></div>
          <div className="flex flex-col">
            <h1 className="text-5xl font-bold">{product.name}</h1>
            <p className="text-2xl text-muted-foreground">{product.tagline}</p>
            <div className="flex flex-row items-center gap-2 mt-5">
              <div className="flex flex-row items-center text-yellow-400">
                {Array.from({ length: 5 }).map((_, index) => (
                  <StarIcon key={index} className="w-5 h-5" fill={
                    index < Math.ceil(Number(product.average_rating)) ? "currentColor" : "none"
                  } />
                ))}
              </div>
              <span className="text-muted-foreground">{product.reviews} reviews</span>
            </div>
          </div>
        </div>

        <div className="flex flex-row gap-2">
          <Button variant="secondary" size="lg" className="text-lg h-14 px-10" asChild>
            <Link to={`/products/${product.product_id}/visit`}>Visit Website</Link>
          </Button>
          <Button size="lg" className="text-lg h-14 px-10">
            <ChevronUp className="w-4 h-4" />
            Upvote({product.upvotes})
          </Button>
        </div>
      </div>
      <div className="flex flex-row gap-2.5">
        <NavLink
          to={`/products/${product.product_id}/overview`}
          className={({ isActive }) => cn(
            buttonVariants({ variant: "outline" }),
            isActive ? "bg-accent text-foreground" : "text-md"
          )}
        >
          Overview
        </NavLink>
        <NavLink
          to={`/products/${product.product_id}/reviews`}
          className={({ isActive }) => cn(
            buttonVariants({ variant: "outline" }),
            isActive ? "bg-accent text-foreground" : "text-md"
          )}
        >
          Reviews
        </NavLink>
      </div>
      <Outlet context={{
        description: product.description,
        how_it_works: product.how_it_works,
        review_count: product.reviews,
      }} />
    </div>
  )
}
