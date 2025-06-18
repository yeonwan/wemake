import { type MetaFunction } from "react-router";
import { Hero } from "~/common/components/hero";
import { TeamCard } from "../components/team-card";
import { getTeams } from "../queries";
import type { Route } from "./+types/teams-page"
import { makeSSRClient } from "~/supa-client";

export const meta: MetaFunction = () => {
  return [
    { title: "Teams | WeMake" },
    { name: "description", content: "Find and join teams of makers" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const teams = await getTeams(client, { limit: 10 });
  return { teams };
};

export default function TeamsPage({ loaderData }: Route.ComponentProps) {
  return (
    <div className="container py-8">
      <Hero
        title="Teams"
        description="Find and join teams of makers"
      />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {loaderData.teams.map((team) => (
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