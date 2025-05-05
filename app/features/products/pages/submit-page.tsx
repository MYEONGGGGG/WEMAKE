import type { Route } from "./+types/leaderboard-page";

export const meta : Route.MetaFunction = () => {
    return [
        { title: "Submit Product | WeMaKe" },
        { name: "description", content: "Submit your product" },
    ];
}

export const loader = async ({ request }: Route.LoaderArgs)=> {
    return {
        products: []
    };
}

export default function SubmitPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-20">

        </div>
    );
}