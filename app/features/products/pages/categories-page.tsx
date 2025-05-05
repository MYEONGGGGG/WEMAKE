import type { Route } from "./+types/leaderboard-page";

export const meta : Route.MetaFunction = () => {
    return [
        { title: "Categories | ProductHunt Clone" },
        { name: "description", content: "Browse products by category" }
    ];
}

export const loader = async ({ request }: Route.LoaderArgs)=> {
    return {
        categories: []
    };
}

export default function CategoriesPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-20">

        </div>
    );
}