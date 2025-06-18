import { Form, type MetaFunction } from "react-router";
import { Hero } from "~/common/components/hero";
import { InputPair } from "~/common/components/input-pair";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import type { Route } from "./+types/team-page";
import { getTeamById } from "../queries";
import { makeSSRClient } from "~/supa-client";

export const meta: MetaFunction = ({ params }) => {
  return [
    { title: `Team ${params.teamId} | WeMake` },
    { name: "description", content: "View team details and join the team" },
  ];
};

export async function loader({ params, request }: Route.LoaderArgs) {
  const {client, headers} = makeSSRClient(request);
  const team = await getTeamById(client, { teamId: Number(params.teamId) });
  return { team };
}

export default function TeamPage({ loaderData }: Route.ComponentProps) {
  const team = loaderData.team;
  const leader = loaderData.team.team_leader;
  return (
    <div className="container py-8">
      <Hero
        title={`Join ${leader.name}'s Team`}
        description="View team details and join the team"
      />
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-8 items-start">
        <div className="col-span-1 md:col-span-2 lg:col-span-8 grid grid-cols-4 gap-5">
          {[
            {
              title: "Product name",
              value: team.product_name
            },
            {
              title: "Stage",
              value: team.product_stage
            },
            {
              title: "Team size",
              value: team.team_size
            },
            {
              title: "Available equity",
              value: team.equity_split
            },
          ].map((item) => (
            <Card key={item.title}>
              <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">
                  {item.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="font-bold text-2xl">
                <p>{item.value}</p>
              </CardContent>
            </Card>
          ))}
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Looking for
              </CardTitle>
              <CardContent className="font-semibold text-xl">
                <ul className="text-lg list-disc list-inside">
                  {team.roles.split(",").map((item) => (
                    <li key={item}>
                      {item}
                    </li>
                  ))}
                </ul>
              </CardContent>
            </CardHeader>
          </Card>
          <Card className="col-span-2">
            <CardHeader>
              <CardTitle className="text-sm font-medium text-muted-foreground">
                Description
              </CardTitle>
              <CardContent className="font-medium text-xl">
                <p>{team.description}</p>
              </CardContent>
            </CardHeader>
          </Card>
        </div>

        <aside className="col-span-1 md:col-span-1 lg:col-span-4 border rounded-lg shadow-sm space-y-6 p-8">
          <div className="flex flex-row gap-5">
            <Avatar className="size-14">
              {leader.avatar == null ? <AvatarFallback>{leader.name.charAt(0)} </AvatarFallback> : <AvatarImage src={leader.avatar} />}
            </Avatar>
            <div className="flex flex-col">
              <h4 className="text-lg font-medium">{leader.name}</h4>
              <Badge variant="secondary">{leader.role}</Badge>
            </div>
          </div>

          <Form className="space-y-5 flex flex-col gap-5">
            <InputPair
              label="Introduce yourself"
              description="Introduce yourself to the team"
              name="introduce"
              required
              textArea
            />
            <Button type="submit">Get in touch</Button>
          </Form>

          <Button variant="outline" className="w-full">Follow</Button>
        </aside>



      </div>
    </div>
  );
} 