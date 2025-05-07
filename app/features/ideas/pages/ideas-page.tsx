import type { Route } from ".react-router/types/app/+types/root";
import { Hero } from "~/common/components/hero";
import { IdeaCard } from "~/features/ideas/components/idea-card";

export const meta : Route.MetaFunction = () => {
    return [
        { title: "IdeasGPT | WeMaKe" },
        { name: "description", content: "Find ideas for your next project" }
    ];
}

export default function IdeasPage() {
    return (
        <div className="space-y-20">
            <Hero
                title="IdeasGPT"
                subtitle="Find ideas for your next project"
            />
            <div className="grid grid-cols-4 gap-4">
                {Array.from({ length: 10 }).map((_, index) => (
                    <IdeaCard
                        key={index}
                        id={`ideasId-${index}`}
                        title="A startup that creates AI-powered generated personal trainer, delivering
                        customized fitness recommendations and tracking of progress using a mobile app to track
                        workouts and progress as well as a website to manage the business."
                        viewsCount={123}
                        postedAt="12 hours ago"
                        likesCount={12}
                        claimed={index % 2 === 0}
                    />
                ))}
            </div>
        </div>
    );
}