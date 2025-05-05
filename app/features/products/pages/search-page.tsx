import type { Route } from "./+types/leaderboard-page";

export const meta : Route.MetaFunction = () => {
    return [
        { title: "Search Product | WeMaKe" },
        { name: "description", content: "Search for products" }
    ];
}

export const loader = async ({ request }: Route.LoaderArgs)=> {
    return {
        products: []
    };
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-20">

        </div>
    );
}