import { DateTime } from "luxon";
import type { Route } from "./+types/daily-leaderboard-page";
import { data, isRouteErrorResponse, Link, type MetaFunction } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { ProductPagination } from "~/common/components/product-pagination";
import { getProductsByDateRange, getProductsPagesByDateRange } from "../queries";
import { makeSSRClient } from "~/supa-client";

const paramsSchema = z.object({
  year: z.string().transform((val) => parseInt(val)),
  month: z.string().transform((val) => parseInt(val)),
  day: z.string().transform((val) => parseInt(val)),
});



export const meta: Route.MetaFunction = ({ params }) => {
  const data = DateTime.fromObject({
    year: Number(params.year),
    month: Number(params.month),
    day: Number(params.day),
  });
  return [
    { title: `The best of ${data.toLocaleString(DateTime.DATE_MED)} | Wemake` },
  ];
};


export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const { success, data } = paramsSchema.safeParse(params);

  if (!success) {
    throw new Error("Invalid date");
  }
  const parsedDate = { year: data.year, month: data.month, day: data.day };
  const date = DateTime.fromObject(parsedDate);
  if (!date.isValid) {
    throw new Error("Invalid date");
  }

  const today = DateTime.now().setZone("Pacific/Canada");
  if (date > today) {
    throw new Error(`This date is in the future`);
  }

  const url = new URL(request.url);

  const products = await getProductsByDateRange(client, {
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
    limit: 15,
    page: url.searchParams.get("page") ? parseInt(url.searchParams.get("page")!) : 1,
  });

  const totalPages = await getProductsPagesByDateRange(client, {
    startDate: date.startOf("day"),
    endDate: date.endOf("day"),
  });

  return { parsedDate, products, totalPages };
}

export default function DailyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  const { parsedDate, products } = loaderData;
  const urlDate = DateTime.fromObject({
    year: parsedDate.year,
    month: parsedDate.month,
    day: parsedDate.day,
  });

  const previousDate = urlDate.minus({ days: 1 });
  const nextDate = urlDate.plus({ days: 1 });
  const isToday = urlDate.equals(DateTime.now().startOf("day"));


  return (
    <div className="container py-8">
      <Hero title={`The best of ${urlDate.toLocaleString(DateTime.DATE_MED)}`} />

      <div className="flex justify-center gap-4">
        <Button variant="secondary" asChild className="">
          <Link to={`/products/leaderboards/daily/${previousDate.year}/${previousDate.month}/${previousDate.day}`}> &larr; {previousDate.toLocaleString(DateTime.DATE_SHORT)} </Link>
        </Button>
        {!isToday ? (
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/daily/${nextDate.year}/${nextDate.month}/${nextDate.day}`}> {nextDate.toLocaleString(DateTime.DATE_SHORT)} &rarr; </Link>
          </Button>
        ) : null}
      </div>

      <div className="space-y-5 w-full max-w-screen-md mx-auto py-5">
        {products.map((product, index) => (
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
