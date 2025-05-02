import { DateTime } from "luxon";
import type { Route } from "./+types/weekly-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { ProductPagination } from "~/common/components/product-pagination";

const paramsSchema = z.object({
  year: z.string().transform((val) => parseInt(val)),
  week: z.string().transform((val) => parseInt(val)),
});

export const meta: Route.MetaFunction = ({ params }) => {
  const data = DateTime.fromObject({
    weekYear: Number(params.year),
    weekNumber: Number(params.week),
  });
  return [
    { title: `Best of week ${data.weekNumber}, ${data.weekYear} | Wemake` },
  ];
};

export const loader = ({ params }: Route.LoaderArgs) => {
  const { success, data } = paramsSchema.safeParse(params);

  if (!success) {
    throw new Error("Invalid week");
  }
  const parsedDate = { weekYear: data.year, weekNumber: data.week };
  const date = DateTime.fromObject({
    weekYear: parsedDate.weekYear,
    weekNumber: parsedDate.weekNumber,
  });

  if (!date.isValid || data.week < 1 || data.week > 53) {
    throw new Error("Invalid week");
  }

  return parsedDate;
}

export default function WeeklyLeaderboardPage({ loaderData }: Route.ComponentProps) {
  const urlDate = DateTime.fromObject({
    weekYear: loaderData.weekYear,
    weekNumber: loaderData.weekNumber,
  });

  const previousWeek = urlDate.minus({ weeks: 1 });
  const nextWeek = urlDate.plus({ weeks: 1 });
  const isCurrentWeek = urlDate.weekNumber === DateTime.now().weekNumber && 
                       urlDate.weekYear === DateTime.now().weekYear;

  const weekStart = urlDate.startOf('week').toLocaleString(DateTime.DATE_SHORT);
  const weekEnd = urlDate.endOf('week').toLocaleString(DateTime.DATE_SHORT);

  return (
    <div className="container py-8">
      <Hero title={`The best products for week ${loaderData.weekNumber}, ${loaderData.weekYear}`} />

      <div className="flex justify-center gap-4">
        <Button variant="secondary" asChild className="">
          <Link to={`/products/leaderboards/weekly/${previousWeek.weekYear}/${previousWeek.weekNumber}`}>
            &larr; Week {previousWeek.weekNumber}
          </Link>
        </Button>
        {!isCurrentWeek ? (
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/weekly/${nextWeek.weekYear}/${nextWeek.weekNumber}`}>
              Week {nextWeek.weekNumber} &rarr;
            </Link>
          </Button>
        ) : null}
      </div>

      <div className="text-center text-sm text-muted-foreground mt-2">
        {weekStart} - {weekEnd}
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
