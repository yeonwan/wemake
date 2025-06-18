import { redirect, useParams } from "react-router";
import { z } from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import type { Route } from "./+types/social-complete-page";
import { makeSSRClient } from "~/supa-client";

export function meta() {
  return [
    { title: "Authentication Complete | WeMake" },
    { name: "description", content: "Completing social authentication" },
  ];
}

const paramsSchema = z.object({
  provider: z.enum(["kakao", "github"]),
}); 

export const loader = async ({params, request}: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const code = url.searchParams.get("code");
  if (!code) {
    return redirect("/auth/login");
  }
  const { success, data } = paramsSchema.safeParse(params);
  if (!success) {
    return redirect("/auth/login");
  }

  const { client, headers } = makeSSRClient(request);
  const { error } = await client.auth.exchangeCodeForSession(code);
  if (error) {
    throw error;
  }
  return redirect("/", { headers });
  
};