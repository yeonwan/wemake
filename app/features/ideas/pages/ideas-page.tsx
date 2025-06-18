import { Hero } from "~/common/components/hero";
import { IdeaCard } from "../components/idea-card";
import { getGptIdeas } from "../queries";
import type { Route } from "./+types/ideas-page";
import { makeSSRClient } from "~/supa-client";

export function meta() {
  return [
    { title: "IdeasGPT | WeMake" },
    { name: "description", content: "Explore your ideas with IdeasGPT" },
  ];
}

export const loader = async ({ request }: Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const ideas = await getGptIdeas(client, { limit: 20 });
  return { ideas };
}

export default function IdeasPage({ loaderData }: Route.ComponentProps) {
  
  return (
    <div>
      <Hero title="IdeasGPT" description="Explore your ideas with IdeasGPT" />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {loaderData.ideas.map((idea) => (
          <IdeaCard
            key={idea.gpt_idea_id}
            id={idea.gpt_idea_id.toString()}
            title={idea.title}
            views={idea.views}
            likes={idea.likes}
            timeAgo={idea.created_at}
            claimed={idea.is_claimed}
          />
        ))}
      </div>
    </div>
  );
} 