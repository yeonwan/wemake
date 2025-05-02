import { Link } from "react-router";
import type { LoaderFunctionArgs, MetaFunction as RouterMetaFunction } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/components/post-card";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { Button } from "../components/ui/button";
import { JobCard } from "~/features/jobs/components/job-card";
import { TeamCard } from "~/features/teams/components/team-card";
import type { Route } from "./+types/home";
export const meta: RouterMetaFunction = () => {
    return [
        {title: "Home | Wemake"},
        {name: "description", content: "Welcome to Wemake"}
    ]
}

export const  loader = () => {
    return {
        hello: "world"
    };
}

export default function HomePage({ loaderData} : Route.ComponentProps) {
    return (
        <div className="px-20 space-y-40">
            <div className="grid grid-cols-3 gap-5">
                <div>
                    <h2 className="text-4xl font-bold leading-tight tracking-tight">Today's Products</h2>
                    <p className="text-lg font-light text-foreground">
                        Discover the latest products from our store
                    </p>
                    <Button variant="link" asChild className="text-md p-0">
                        <Link to="/products/leaderboards">Explore All Products &rarr;</Link>
                    </Button>
                </div>
                
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
            <div className="grid grid-cols-3 gap-5">
                <div>
                    <h2 className="text-4xl font-bold leading-tight tracking-tight">Latest Discussions</h2>
                    <p className="text-lg font-light text-foreground">
                        Discover the latest discussions from our store
                    </p>
                    <Button variant="link" asChild className="text-md p-0">
                        <Link to="/community">Explore All Discussions &rarr;</Link>
                    </Button>
                </div>
                {Array.from({ length: 11 }).map((_, index) => (
                    <PostCard
                        id={`postId-${index}`}
                        title={`What is best tool for ${index}?`}
                        author="Yeonwan"
                        avatarUrl="https://github.com/apple.png"
                        category="Productivity"
                        postedAt="12 hours ago"
                    />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-5">
                <div>
                    <h2 className="text-4xl font-bold leading-tight tracking-tight">IdeasGPT</h2>
                    <p className="text-lg font-light text-foreground">
                        Find ideas for your next project.
                    </p>
                    <Button variant="link" asChild className="text-md p-0">
                        <Link to="/ideas">Explore All Ideas &rarr;</Link>
                    </Button>   
                </div>
                {Array.from({ length: 6 }).map((_, index) => (
                    <IdeaCard
                        id={`ideaId-${index}`}
                        title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness plans based on users' goals and preferences."
                        views={123}
                        likes={12}
                        timeAgo="12 hours ago"
                        claimed={index % 2 === 0}
                    />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-5">
                <div>
                    <h2 className="text-4xl font-bold leading-tight tracking-tight">Latest Jobs</h2>
                    <p className="text-lg font-light text-foreground">
                        Find your dream jobs.
                    </p>
                    <Button variant="link" asChild className="text-md p-0">
                        <Link to="/jobs">Explore All Jobs &rarr;</Link>
                    </Button>   
                </div>
                {Array.from({ length: 10 }).map((_, index) => (
                    <JobCard
                        id={`jobId-${index}`}
                        companyName="Meta"
                        companyHq="San Francisco, CA"
                        companyLogoUrl="https://github.com/facebook.png"
                        postedAt="12 hours ago"
                        title="Software Engineer"
                        employmentType="Full-time"
                        positionLocation="Remote"
                        salary="$100,000 - $120,000"
                    />
                ))}
            </div>
            <div className="grid grid-cols-3 gap-5">
                <div>
                    <h2 className="text-4xl font-bold leading-tight tracking-tight">Find a team mate</h2>
                    <p className="text-lg font-light text-foreground">
                        Join a team to build your next big idea.
                    </p>
                    <Button variant="link" asChild className="text-md p-0">
                        <Link to="/teams">Explore All Teams &rarr;</Link>
                    </Button>   
                </div>
                {Array.from({ length: 5 }).map((_, index) => (
                    <TeamCard
                        id={`teamId-${index}`}
                        leaderUsername="yeonwan"
                    leaderAvatarUrl="https://github.com/inthetiger.png"
                    positions={[
                        "React Developer",
                        "Backend Developer",
                        "Product Manager"
                    ]}
                        projectDescription="a new social media platform"
                    />
                ))}
            </div>
        </div>
    );
}