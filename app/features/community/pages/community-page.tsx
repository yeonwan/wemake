import { ChevronDownIcon, FilterIcon } from "lucide-react";
import { useState } from "react";
import { Form, Link, useSearchParams, type MetaFunction } from "react-router";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components/ui/button";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "~/common/components/ui/dropdown-menu";
import { PERIOD_OPTIONS, SORT_OPTIONS } from "../constants";
import { Input } from "~/common/components/ui/input";
import { PostCard } from "../components/post-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Community | WeMake" },
    { name: "description", content: "Join our community of makers and share your thoughts" },
  ];
};

export default function CommunityPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") ?? "newest");
  const [period, setPeriod] = useState(searchParams.get("period") ?? "all-time");

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
                            {option.label}
                          </DropdownMenuCheckboxItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  )}
              </div>
              <Form className="w-2/3">
                <Input type="text" placeholder="Search" />
              </Form>
            </div>
            <Button asChild>
              <Link to="/community/submit">Create Discussion</Link>
            </Button>
          </div>
          <div className="space-y-4">
            {Array.from({ length: 11 }).map((_, index) => (
              <PostCard
                id={`postId-${index}`}
                title={`What is best tool for ${index}?`}
                author="Yeonwan"
                avatarUrl="https://github.com/apple.png"
                category="Productivity"
                postedAt="12 hours ago"
                upvotes={120}
                expanded
              />
            ))}
          </div>
        </div>
        <aside className="col-span-6 md:col-span-3 lg:col-span-2">
          <span className="text-sm text-muted-foreground font-bold">Topics</span>
          <div className="flex flex-col gap-4 items-start">
            {["AI Tools", "Design Tools", "Development Tools", "Productivity Tools", "Other Tools"].map((category) => (
              <Button variant="link" asChild key={category} className="pl-0">
                <Link to={`/community/${category}`} className="text-sm hover:text-primary">
                  {category}
                </Link>
              </Button>
            ))}
          </div>
        </aside>
      </div>
    </div>
  );
} 