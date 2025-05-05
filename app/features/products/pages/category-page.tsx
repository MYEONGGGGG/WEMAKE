import type { Route } from "./+types/leaderboard-page";

export const meta : Route.MetaFunction = () => {
    return [
        { title: `Developer Tools | ProductHunt Clone` },
        { name: "description", content: `Browse Developer Tools products` },
    ];
}

export const loader = async ({ request }: Route.LoaderArgs)=> {
    return {
        category: []
    };
}

export default function CategoryPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-20">

        </div>
    );
}