import type { Route } from "./+types/leaderboard-page";

export const meta : Route.MetaFunction = () => {
    return [
        { title: "Leaderboards | WeMaKe" },
        { name: "description", content: "Top products leaderboard" }
    ];
}

export function loader({ request }: Route.LoaderArgs) {
    return {
        products: []
    };
}

export default function YearlyLeaderboardPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-20">

        </div>
    );
}