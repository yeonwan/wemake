import { DateTime } from "luxon";
import type { Route } from "./+types/yearly-leaderboard-page";
import { data, isRouteErrorResponse, Link } from "react-router";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Button } from "~/common/components/ui/button";
import { ProductPagination } from "~/common/components/product-pagination";

const paramsSchema = z.object({
  year: z.string().transform((val) => parseInt(val)),
});

export const meta: Route.MetaFunction = ({ params }) => {
  const data = DateTime.fromObject({
    year: Number(params.year),
  });
  return [
    { title: `The best of ${data.year} | Wemake` },
  ];
};  
export const loader = ({ params }: Route.LoaderArgs) => {
  const { success, data } = paramsSchema.safeParse(params);

  if (!success) {
    throw new Error("Invalid year");
  } 
  const parsedDate = { year: data.year };
  const date = DateTime.fromObject({
    year: parsedDate.year,
  });

  return parsedDate;
}


export default function YearlyLeaderboardPage({ loaderData }: Route.ComponentProps) {

  const urlDate = DateTime.fromObject({
    year: loaderData.year,
  });

  const previousYear = urlDate.minus({ years: 1 });
  const nextYear = urlDate.plus({ years: 1 });
  const isCurrentYear = urlDate.year === DateTime.now().year;

  return (  
    <div className="container py-8">
      <Hero title={`The best of ${loaderData.year}`} />

      <div className="flex justify-center gap-4">
        <Button variant="secondary" asChild className="">
          <Link to={`/products/leaderboards/yearly/${previousYear.year}`}>
            &larr; {previousYear.year}
          </Link>
        </Button>
        {!isCurrentYear ? (
          <Button variant="secondary" asChild>
            <Link to={`/products/leaderboards/yearly/${nextYear.year}`}>
              {nextYear.year} &rarr;
            </Link>
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
