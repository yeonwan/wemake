import { useOutletContext, type MetaFunction } from "react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";
import type { Route } from "./+types/profile-page";
import { makeSSRClient } from "~/supa-client";

export const meta: MetaFunction = ({ params }) => {
  return [
    { title: `${params.username}'s Profile | WeMake` },
    { name: "description", content: `View ${params.username}'s profile` },
  ];
};

export const loader = async ({params, request}: Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  await client.rpc("track_event", {
    event_type: "profile_view",
    event_data: {
      username: params.username,
    },
  });
  return {};
}

export default function ProfilePage() {
  const {headline, bio} = useOutletContext<{headline: string, bio: string}>();
  return (
    <div className="flex flex-col gap-10 max-w-screen-md">
      <div className="space-y-2">
        <h4 className="text-2xl font-bold">Headline</h4>
        <p className="text-muted-foreground">
          {headline}
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="text-2xl font-bold">About</h4>
        <p className="text-muted-foreground">
          {bio}
        </p>
      </div>
    </div>
  )
} 