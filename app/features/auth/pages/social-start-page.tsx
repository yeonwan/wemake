import { redirect, useParams } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/social-start-page";
import { z } from "zod";

export function meta() {
  return [
    { title: "Social Authentication | WeMake" },
    { name: "description", content: "Redirecting to social authentication provider" },
  ];
}

export const paramsSchema = z.object({
  provider: z.enum(["kakao", "github"]),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { success, data } = paramsSchema.safeParse(params);
  if (!success) {
    return redirect("/auth/login");
  }

  const redirectTo = `http://localhost:5173/auth/social/${data.provider}/complete`;
  const { client, headers } = makeSSRClient(request);
  const provider = data.provider;
  const { data: { url }, error } = await client.auth.signInWithOAuth({
    provider, options: {
      redirectTo: redirectTo
    }
  });
  if (url) {
    return redirect(url, { headers });
  }
  if( error ) {
    throw error;
  }
};
