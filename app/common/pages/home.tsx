import { Link } from "react-router";
import type { LoaderFunctionArgs, MetaFunction as RouterMetaFunction } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/components/post-card";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { Button } from "../components/ui/button";
import { JobCard } from "~/features/jobs/components/job-card";
import { TeamCard } from "~/features/teams/components/team-card";
import type { Route } from "./+types/home";
import { getProductsByDateRange } from "~/features/products/queries";
import { DateTime } from "luxon";
import { getPosts } from "~/features/community/queries";
import { getGptIdeas } from "~/features/ideas/queries";
import { getJobs } from "~/features/jobs/queries";
import { getTeams } from "~/features/teams/queries";
import { makeSSRClient } from "~/supa-client";

export const meta: RouterMetaFunction = () => {
  return [
    { title: "Home | Wemake" },
    { name: "description", content: "Welcome to Wemake" }
  ]
}

export const loader = async ({request}: Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const [products, posts, ideas, jobs, teams] = await Promise.all([
    getProductsByDateRange(client, {
      startDate: DateTime.now().startOf("day"),
      endDate: DateTime.now().endOf("day"),
      limit: 7
    }),
    getPosts(client, {limit: 7, sorting: "newest"}),
    getGptIdeas(client, {limit: 7}),
    getJobs(client, { limit: 7}),
    getTeams(client, {limit: 7})
  ]);
   
  return {
    products, posts, ideas, jobs, teams
  }
}

export default function HomePage({ loaderData }: Route.ComponentProps) {
  const { products, posts, ideas, jobs, teams } = loaderData;
  return (
    <div className="px-20 space-y-40">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight">Today's Products</h2>
          <p className="text-lg font-light text-foreground">
            Discover the latest products from our store
          </p>
          <Button variant="link" asChild className="text-md p-0">
            <Link to="/products/leaderboards">Explore All Products &rarr;</Link>
          </Button>
        </div>

        {products.map((product, index) => (
          <ProductCard
            key={product.product_id.toString()}
            id={product.product_id.toString()}
            name={product.name}
            description={product.tagline}
            commentsCount={Number(product.reviews)}
            viewsCount={Number(product.views)}
            upvotes={Number(product.upvotes)}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight">Latest Discussions</h2>
          <p className="text-lg font-light text-foreground">
            Discover the latest discussions from our store
          </p>
          <Button variant="link" asChild className="text-md p-0">
            <Link to="/community" prefetch="viewport">
              Explore All Discussions &rarr;
            </Link>
          </Button>
        </div>  
        {posts.map((post) => (
          <PostCard
            key={post.post_id.toString()}
            id={post.post_id.toString()}
            title={post.title}
            author={post.author}
            avatarUrl={post.author_avatar}
            category={post.topic}
            postedAt={post.created_at}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight">IdeasGPT</h2>
          <p className="text-lg font-light text-foreground">
            Find ideas for your next project.
          </p>
          <Button variant="link" asChild className="text-md p-0">
            <Link to="/ideas" prefetch="viewport">
              Explore All Ideas &rarr;
            </Link>
          </Button>
        </div>
        {ideas.map((idea) => (
          <IdeaCard
            id={idea.gpt_idea_id.toString()}
            title={idea.title}
            views={Number(idea.views)}
            likes={Number(idea.likes)}
            timeAgo={idea.created_at}
            claimed={idea.is_claimed}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight">Latest Jobs</h2>
          <p className="text-lg font-light text-foreground">
            Find your dream jobs.
          </p>
          <Button variant="link" asChild className="text-md p-0">
            <Link to="/jobs" prefetch="viewport">
              Explore All Jobs &rarr;
            </Link>
          </Button>
        </div>
        {jobs.map((job) => (
          <JobCard
            id={job.job_id.toString()}
            companyName={job.company_name}
            companyHq={job.company_location}
            companyLogoUrl={job.company_logo_url}
            postedAt={job.created_at}
            title={job.position}
            employmentType={job.job_type.toString()}
            positionLocation={job.location.toString()}
            salary={job.salary_range.toString()}
          />
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        <div>
          <h2 className="text-4xl font-bold leading-tight tracking-tight">Find a team mate</h2>
          <p className="text-lg font-light text-foreground">
            Join a team to build your next big idea.
          </p>
          <Button variant="link" asChild className="text-md p-0">
            <Link to="/teams" prefetch="viewport">
              Explore All Teams &rarr;
            </Link>
          </Button>
        </div>
        {teams.map((team) => (
          <TeamCard
            id={team.team_id.toString()}
            leaderUsername={team.team_leader.username}
            leaderAvatarUrl={team.team_leader.avatar}
            positions={team.roles.split(",")}
            projectDescription={team.description}
          />
        ))}
      </div>
    </div>
  );
}