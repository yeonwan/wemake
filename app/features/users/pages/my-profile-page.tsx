import { redirect, type MetaFunction } from "react-router";
import { makeSSRClient } from "~/supa-client";
import { getUserById } from "../queries";
import type { Route } from "./+types/my-profile-page";


export const loader = async ({request}: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const { data: { user } } = await client.auth.getUser();
  if (!user) {
    return redirect("/auth/login");
  }
  const profile = await getUserById(client, { profileId: user.id });
  const encodedUsername = encodeURIComponent(profile.username);
  return redirect(`/users/${encodedUsername}`);
};

export const meta: MetaFunction = () => {
  return [
    { title: "My Profile | WeMake" },
    { name: "description", content: "View and edit your profile" },
  ];
};

