import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/leaderboard-page";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "../components/product-card";
import { Link } from "react-router";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Product Leaderboard | WeMake" },
    { name: "description", content: "Top products on WeMake" }
  ];
};

export default function LeaderboardPage() {
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
          <Button variant="link" asChild className="text-md p-0">
            <Link to="/products/leaderboards/daily">Explore All Products &rarr;</Link>  
          </Button>
        </div>

        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={`daily-${index}`}
            id={`daily-${index}`}
            name={`Product Name ${index}`}
            description={`Product Description ${index}`}
            commentsCount={12}
            viewsCount={34}
            upvotes={120}
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
          <Button variant="link" asChild className="text-md p-0">
            <Link to="/products/leaderboards/weekly">Explore All Products &rarr;</Link>  
          </Button>
        </div>

        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={`weekly-${index}`}
            id={`weekly-${index}`}
            name={`Product Name ${index}`}
            description={`Product Description ${index}`}
            commentsCount={24}
            viewsCount={68}
            upvotes={240}
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
          <Button variant="link" asChild className="text-md p-0">
            <Link to="/products/leaderboards/monthly">Explore All Products &rarr;</Link>  
          </Button>
        </div>

        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={`monthly-${index}`}
            id={`monthly-${index}`}
            name={`Product Name ${index}`}
            description={`Product Description ${index}`}
            commentsCount={48}
            viewsCount={136}
            upvotes={480}
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
          <Button variant="link" asChild className="text-md p-0">
            <Link to="/products/leaderboards/yearly">Explore All Products &rarr;</Link>  
          </Button>
        </div>

        {Array.from({ length: 10 }).map((_, index) => (
          <ProductCard
            key={`yearly-${index}`}
            id={`yearly-${index}`}
            name={`Product Name ${index}`}
            description={`Product Description ${index}`}
            commentsCount={96}
            viewsCount={272}
            upvotes={960}
          />
        ))}
        <Button variant="link" asChild className="text-md self-center">
          <Link to="/products/leaderboards/yearly">Explore All Products &rarr;</Link>
        </Button>
      </div>
    </div>
  );
} 