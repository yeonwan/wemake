import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/leaderboard-page";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Link } from "react-router";
import { DateTime } from "luxon";
import { getProductsByDateRange } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Product Leaderboard | WeMake" },
    { name: "description", content: "Top products on WeMake" }
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const [dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts] = await Promise.all([  
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("day"),
      endDate: DateTime.now().endOf("day"),
      limit: 7
    }),
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("week"),
      endDate: DateTime.now().endOf("week"),
      limit: 7
    }),
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("month"),
      endDate: DateTime.now().endOf("month"),
      limit: 7
    }),
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("year"),
      endDate: DateTime.now().endOf("year"),
      limit: 7
    })
  ]);
  return {
    dailyProducts,
    weeklyProducts,
    monthlyProducts,
    yearlyProducts
  };
}

export default function LeaderboardPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="space-y-16">
      <Hero
        title="Leaderboard"
        description="The most popular products on WeMake"
      />

      {/* Daily Leaderboard */}
      <div className="grid grid-cols-3 gap-5">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Daily Leaderboard</h2>
          <p className="text-lg font-light text-foreground">
            The most popular products on WeMake today
          </p>
        </div>

        {loaderData.dailyProducts.map((product, index) => (
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
        <Button variant="link" asChild className="text-md self-center">
          <Link to="/products/leaderboards/daily">Explore All Products &rarr;</Link>
        </Button>
      </div>

      {/* Weekly Leaderboard */}
      <div className="grid grid-cols-3 gap-5">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Weekly Leaderboard</h2>
          <p className="text-lg font-light text-foreground">
            The most popular products this week
          </p>
        </div>

        {loaderData.weeklyProducts.map((product, index) => (
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
        <Button variant="link" asChild className="text-md self-center">
          <Link to="/products/leaderboards/weekly">Explore All Products &rarr;</Link>
        </Button>
      </div>

      {/* Monthly Leaderboard */}
      <div className="grid grid-cols-3 gap-5">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Monthly Leaderboard</h2>
          <p className="text-lg font-light text-foreground">
            The most popular products this month
          </p>
        </div>

        {loaderData.monthlyProducts.map((product, index) => (
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
        <Button variant="link" asChild className="text-md self-center">
          <Link to="/products/leaderboards/monthly">Explore All Products &rarr;</Link>
        </Button>
      </div>

      {/* Yearly Leaderboard */}
      <div className="grid grid-cols-3 gap-5">
        <div>
          <h2 className="text-3xl font-bold leading-tight tracking-tight">Yearly Leaderboard</h2>
          <p className="text-lg font-light text-foreground">
            The most popular products this year
          </p>
        </div>

        {loaderData.yearlyProducts.map((product, index) => (
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
        <Button variant="link" asChild className="text-md self-center">
          <Link to="/products/leaderboards/yearly">Explore All Products &rarr;</Link>
        </Button>
      </div>
    </div>
  );
} 