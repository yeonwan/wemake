import { Outlet, data } from "react-router";
import { z } from "zod";
import type { Route } from "./+types/leaderboard-layout";


const searchParamsSchema = z.object({ 
  page: z.coerce.number().min(1).optional().default(1),
});



export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const url = new URL(request.url);
  const { success: pageParseSuccess, data: parsedPage } = searchParamsSchema.safeParse(Object.fromEntries(url.searchParams));

  if (!pageParseSuccess) {
    throw data({
      error_code: "INVALID_PAGE",
      message: "Invalid page",
    }, { status: 400 });
  }
}

export default function LeaderboardLayout() {
  return (
    <Outlet />
  );
}