import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/team-page";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "team-page | WeMaKe" }
    ];
};

export default function TeamPage() {
    return (
        <div className="space-y-20">
            <Hero
                title="Team"
                subtitle="Browse team"
            />

        </div>
    );
}