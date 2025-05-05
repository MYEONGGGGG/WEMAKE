import type { Route } from "./+types/leaderboard-page";

export const meta : Route.MetaFunction = () => {
    return [
        { title: "Promote product | ProductHunt Clone" },
        { name: "description", content: "\"Promote your product" }
    ];
}

export const loader = async ({ request }: Route.LoaderArgs)=> {
    return {
        products: []
    };
}

export default function PromotePage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-20">

        </div>
    );
}