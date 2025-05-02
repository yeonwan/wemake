import type { Route } from "./+types/leaderboards-redirection-page";
import { redirect } from "react-router";
import { DateTime } from "luxon";

export function loader({ params }: Route.LoaderArgs) { 
    const { period } = params;
    let url: string;
    const today = DateTime.now();
    switch (period) {
        case "daily":
            url = `/products/leaderboards/daily/${today.year}/${today.month}/${today.day}`;
            break;
        case "weekly":
            url = `/products/leaderboards/weekly/${today.year}/${today.weekNumber}`;
            break;
        case "monthly":
            url = `/products/leaderboards/monthly/${today.year}/${today.month}`;
            break;
        case "yearly":
            url = `/products/leaderboards/yearly/${today.year}`;
            break;
        default:
            return { error: "Invalid period" };
    }
    return redirect(url);
}