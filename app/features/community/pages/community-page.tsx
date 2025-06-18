import { ChevronDownIcon, FilterIcon } from "lucide-react";
import { Suspense, useState } from "react";
import { Await, data, Form, Link, useSearchParams, type MetaFunction } from "react-router";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/common/components/ui/dropdown-menu";
import { PERIOD_OPTIONS, SORT_OPTIONS } from "../constants";
import { Input } from "~/common/components/ui/input";
import { PostCard } from "../components/post-card";
import { getPosts, getTopics } from "../queries";
import type { Route } from "./+types/community-page";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";

export const meta: MetaFunction = () => {
  return [
    { title: "Community | WeMake" },
    { name: "description", content: "Join our community of makers and share your thoughts" },
  ];
};

const searchParamsSchema = z.object({
  sort: z.enum(["newest", "popular"]).optional().default("newest"),
  period: z.enum(["all-time", "today", "week", "month", "year"]).optional().default("all-time"),
  keyword: z.string().optional(),
  topic: z.string().optional(),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  //  await new Promise((resolve) => setTimeout(resolve, 10000));
  const url = new URL(request.url);
  const { success, data: parsedData } = searchParamsSchema.safeParse(Object.fromEntries(url.searchParams));
  if (!success) {
    throw data({
      error_code: "INVALID_SEARCH_PARAMS",
      message: "Invalid search params",
    }, { status: 400 });
  }
  const [topics, posts] = await Promise.all([
    getTopics(client),
    getPosts(client, {
      limit: 7,
      sorting: parsedData.sort,
      period: parsedData.period,
      keyword: parsedData.keyword,
      topic: parsedData.topic
    })
  ]);
  return { topics, posts };
}

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") ?? "newest");
  const [period, setPeriod] = useState(searchParams.get("period") ?? "all-time");
  const { topics, posts } = loaderData;
  return (
    <div>
      <Hero title="Community" description="Ask questions, share ideas, and get help from the WeMake community" />
      <div className="grid grid-cols-6 items-start gap-20">
        <div className="col-span-6 md:col-span-3 lg:col-span-4 space-y-10">
          <div className="flex justify-between">
            <div className="space-y-5 w-full">
              <div className="flex items-center gap-5">
                <DropdownMenu>
                  <DropdownMenuTrigger className="flex items-center gap-1 capitalize">
                    {sort}
                    <ChevronDownIcon className="w-4 h-4" />
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="capitalize">
                    {SORT_OPTIONS.map((option) => (
                      <DropdownMenuCheckboxItem key={option.value}
                        onCheckedChange={() => {
                          setSearchParams({ sort: option.value });
                          setSort(option.value as "newest" | "popular");
                        }}
                        checked={sort === option.value}
                      >
                        {option.label}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                {sort === "popular"
                  && (
                    <DropdownMenu>
                      <DropdownMenuTrigger className="flex items-center gap-1 capitalize">
                        {period}
                        <ChevronDownIcon className="w-4 h-4" />
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="capitalize">
                        {PERIOD_OPTIONS.map((option) => (
                          <DropdownMenuCheckboxItem key={option.value}
                            onCheckedChange={() => {
                              searchParams.set("period", option.value);
                              setSearchParams(searchParams);
                              setPeriod(option.value);
                            }}
                            checked={period === option.value}
                          >
                            {option.value}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
              </div>
              <Form className="w-2/3">
                <Input type="text"
                name = "keyword"
                placeholder="Search" />
              </Form>
            </div>
            <Button asChild>
              <Link to="/community/create">Create Discussion</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {posts.map((post) => (
              <PostCard
                id={post.post_id.toString()}
                title={post.title}
                author={post.author}
                avatarUrl={post.author_avatar}
                category={post.topic}
                postedAt={post.created_at}
                upvotes={post.upvotes}
                expanded
              />
            ))}
          </div>
        </div>
        <aside className="col-span-6 md:col-span-3 lg:col-span-2">
          <span className="text-sm text-muted-foreground font-bold">Topics</span>
          <div className="flex flex-col gap-4 items-start">
            {topics.map((topic) => (
              <Button variant="link" asChild key={topic.slug} className="pl-0">
                <Link to={`/community?topic=${topic.slug}`} className="text-sm hover:text-primary">
                  {topic.name}
                </Link>
              </Button>
            ))}
          </div>


        </aside>
      </div >
    </div >
  );
} 