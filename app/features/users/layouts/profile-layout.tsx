import { Form, Link, NavLink, Outlet, useParams } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button, buttonVariants } from "~/common/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "~/common/components/ui/dialog";
import { Textarea } from "~/common/components/ui/textarea";
import { cn } from "~/lib/utils";
import {getUserProfile } from "../queries";
import type { Route } from "./+types/profile-layout";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({params, request}: Route.LoaderArgs & {params: {username: string}}) => {
  const {client, headers} = makeSSRClient(request);
  const decodedUsername = decodeURIComponent(params.username);
  const user = await getUserProfile (client, { username: decodedUsername });
  return {user};
}

export default function ProfileLayout({loaderData} : Route.ComponentProps) {
  const user = loaderData.user;
  return (
    <div className="py-5 space-y-10">
      <div className="flex items-center gap-4">
        <Avatar className="size-40">
          {user.avatar ?
            <AvatarImage src={user.avatar}/>
            : <AvatarFallback className="text-4xl">{user.name[0]}</AvatarFallback>}
        </Avatar>
        <div className="space-y-4">
          <div className="flex items-center gap-2">
            <h1 className="text-2xl font-bold">{user.name}</h1>
            <Button variant="outline" asChild>
              <Link to="/my/settings">
                Edit Profile
              </Link>
            </Button>
            <Dialog>
              <DialogTrigger asChild>
                <Button variant="outline">
                  Message
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Message</DialogTitle>
                </DialogHeader>
                <DialogDescription className="space-y-4">
                  Send a message to {user.name}
                  <Form className="mt-4 space-y-4">
                    <Textarea 
                      className="resize-none"
                      rows={4} 
                      placeholder="Message" />
                    <Button type="submit">Send</Button>
                  </Form>
                </DialogDescription>
              </DialogContent>
            </Dialog>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">@{user.username}</span>
            <Badge variant="secondary">
              {user.role}
            </Badge>
            <Badge variant="secondary">
              100 followers
            </Badge>
            <Badge variant="secondary">
              100 following
            </Badge>
          </div>
        </div>
      </div>
      <div className="flex items-center gap-10">
        {[
          {label: "About", to: `/users/${user.username}`},
          {label: "Products", to: `/users/${user.username}/products`},
          {label: "Posts", to: `/users/${user.username}/posts`},
        ].map(({label, to}) => (
          <NavLink
            end 
            to={to} 
            key={label}
            className={({isActive}) =>
               cn(
                buttonVariants({variant:"outline"}),
                isActive && "bg-accent text-foreground"
               )
            }
          >
            {label}
          </NavLink>
        ))}
      </div>
      <div className="max-w-screen-md">
        <Outlet context={{headline: user.headline, bio: user.bio}} />
      </div>
    </div>
  );
} 

export function ErrorBoundary({error}: Route.ErrorBoundaryProps) {
  if (error instanceof Error) {
  return (
    <div>
      <h1>Error</h1>
        <p>{error.message}</p>
      </div>
    );
  }
  return (
    <div>
      <h1>Error</h1>
      <p>Unknown error</p>
    </div>
  );
} 