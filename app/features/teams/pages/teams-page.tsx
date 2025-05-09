import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/teams-page";
import { TeamCard } from "~/features/teams/team-card";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Teams | WeMaKe" }
    ];
};

export default function TeamsPage() {
    return (
        <div className="space-y-20">
            <Hero
                title="Teams"
                subtitle="Find a team looking for a developer"
            />

            <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 8 }).map((_, index) => (
                    <TeamCard
                        key={`teamId-${index}`}
                        id={`teamId-${index}`}
                        leaderUsername="lynn"
                        leaderAvatarUrl="https://github.com/lynn.png"
                        positions={[
                            "React Developer",
                            "Backend Developer",
                            "Product Manager",
                        ]}
                        projectsDescription="a new social media platform for developers to share their projects and ideas."
                    />
                ))}
            </div>
        </div>
    );
}