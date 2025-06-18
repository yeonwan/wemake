import { DateTime } from "luxon";
import type { Route } from "./+types/monthly-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
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
});

export const meta: Route.MetaFunction = ({ params }) => {
  const data = DateTime.fromObject({
    year: Number(params.year),
    month: Number(params.month),
  });
  return [
    { title: `The best of ${data.monthLong}, ${data.year} | Wemake` },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const { success, data } = paramsSchema.safeParse(params);

  if (!success) {
    throw new Error("Invalid month");
  }
  const parsedDate = { year: data.year, month: data.month };
  const date = DateTime.fromObject({
    year: parsedDate.year,
    month: parsedDate.month,
  });

  if (!date.isValid || data.month < 1 || data.month > 12) {
    throw new Error("Invalid month");
  }

  const today = DateTime.now().setZone("Pacific/Canada");
  if (date > today) {
    throw new Error(`This date is in the future`);
  }

  const url = new URL(request.url);

  const products = await getProductsByDateRange(client, {
    startDate: date.startOf("month"),
    endDate: date.endOf("month"),
    limit: 15,
    page: url.searchParams.get("page") ? parseInt(url.searchParams.get("page")!) : 1,
  });

  const totalPages = await getProductsPagesByDateRange(client, {
    startDate: date.startOf("month"),
    endDate: date.endOf("month"),
  });

  return { parsedDate, products, totalPages };
}


export default function MonthlyLeaderboardPage({ loaderData }: Route.ComponentProps) {

  const urlDate = DateTime.fromObject({
    year: loaderData.parsedDate.year,
    month: loaderData.parsedDate.month,
  });

  const previousMonth = urlDate.minus({ months: 1 });
  const nextMonth = urlDate.plus({ months: 1 });
  const isCurrentMonth = urlDate.month === DateTime.now().month && 
                       urlDate.year === DateTime.now().year;

  return (
    <div className="container py-8">
      <Hero title={`The best of ${previousMonth.monthLong}, ${loaderData.parsedDate.year}`} />

      <div className="flex justify-center gap-4">
        <Button variant="secondary" asChild className="">
          <Link to={`/products/leaderboards/monthly/${previousMonth.year}/${previousMonth.month}`}>
            &larr; {previousMonth.monthLong}
          </Link>
        </Button>
        {!isCurrentMonth ? (
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/monthly/${nextMonth.year}/${nextMonth.month}`}>
              {nextMonth.monthLong} &rarr;
            </Link>
          </Button>
        ) : null}
      </div>

      <div className="space-y-5 w-full max-w-screen-md mx-auto py-5">
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
