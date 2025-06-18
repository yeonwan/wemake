import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardHeader } from "~/common/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Hero } from "~/common/components/hero";
import { EyeIcon, HeartIcon } from "lucide-react";
import { DotIcon } from "lucide-react";
import { getGptIdea } from "../queries";
import type { Route } from "./+types/idea-page";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";



export const meta = ({ data: { idea: { gpt_idea_id, title } } }: Route.MetaArgs) => {
  return [
    { title: `Idea #${gpt_idea_id} | ${title}` },
    { name: "description", content: "View and discuss idea details" },
  ];
}

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const idea = await getGptIdea(client, { ideaId: Number(params.ideaId) });
  return { idea };
}

export default function IdeaPage({ loaderData }: Route.ComponentProps) {
  return (
    <div>
      <Hero
        title={`Idea #${loaderData.idea.gpt_idea_id}`}
      />
      <div className="flex flex-col max-w-screen-sm mx-auto p-6  gap-10">
        <p>
          {loaderData.idea.title}
        </p>
        <div className="flex items-center gap-1">
          <div className="flex gap-1 text-sm">
            <EyeIcon className="size-4" />
            <span>{loaderData.idea.views}</span>
          </div>
          <DotIcon className="size-4" />
          <span>{DateTime.fromISO(loaderData.idea.created_at).toRelative()}</span>
          <DotIcon className="size-4" />
          <Button variant="outline" className="gap-2">
            <HeartIcon className="size-4" />
            <span>{loaderData.idea.likes}</span>
          </Button>
        </div>
        <div>
          <Button size="lg">
            Claim idea now &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
} 