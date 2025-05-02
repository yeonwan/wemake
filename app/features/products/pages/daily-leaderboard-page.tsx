import { DateTime } from "luxon";
import type { Route } from "./+types/daily-leaderboard-page";
import { data, isRouteErrorResponse, Link, type MetaFunction } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { ProductPagination } from "~/common/components/product-pagination";

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
 

export const loader = ({ params }: Route.LoaderArgs) => {
  const { success, data } = paramsSchema.safeParse(params);

  if (!success) {
    throw new Error("Invalid date");
  }
  const parsedDate = { year: data.year, month: data.month, day: data.day };
  const date = DateTime.fromObject(parsedDate);
  if (!date.isValid) {
    throw new Error("Invalid date");
    //throw data(null, { status: 400 });
  }

  return parsedDate;

}

export default function DailyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    year: loaderData.year,
    month: loaderData.month,
    day: loaderData.day,
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
        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={index}
            id={`productId-${index}`}
            name={`Product Name ${index}`}
            description={`Product Description ${index}`}
          commentsCount={12}
          viewsCount={34}
            upvotes={120}
          />
        ))}
      </div>
      <ProductPagination totalPages={10} />
    </div>
  );
} 
