import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/teams-page";
import { TeamCard } from "~/features/teams/team-card";
import { getTeams } from "~/features/teams/queries";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Teams | WeMaKe" }
    ];
};

export const loader = async () => {
    const teams = await getTeams({ limit: 8 });
    return { teams };
};

export default function TeamsPage({loaderData}: Route.ComponentProps) {
    return (
        <div className="space-y-20">
            <Hero
                title="Teams"
                subtitle="Find a team looking for a developer"
            />

            <div className="grid grid-cols-4 gap-4">
                {loaderData.teams.map((team) => (
                    <TeamCard
                        key={team.team_id}
                        id={team.team_id}
                        leaderUsername={team.team_leader.username}
                        leaderAvatarUrl={team.team_leader.avatar}
                        positions={team.roles.split(",")}
                        projectsDescription={team.product_description}
                    />
                ))}
            </div>
        </div>
    );
}