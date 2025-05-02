import { type MetaFunction } from "react-router";
import { Hero } from "~/common/components/hero";
import { TeamCard } from "../components/team-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Teams | WeMake" },
    { name: "description", content: "Find and join teams of makers" },
  ];
};

export default function TeamsPage() {
  return (
    <div className="container py-8">
      <Hero
        title="Teams"
        description="Find and join teams of makers"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
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