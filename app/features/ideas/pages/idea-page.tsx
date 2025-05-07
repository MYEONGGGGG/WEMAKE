import { Hero } from "~/common/components/hero";
import { DotIcon, EyeIcon, HeartIcon } from "lucide-react";
import { Button } from "~/common/components";

export const meta = () => {
    return [
        { title: "IdeasGPT | WeMaKe" },
        { name: "description", content: "Find ideas for your next project" }
    ];
}

export default function IdeaPage() {
    return (
        <div className="space-y-20">
            <Hero title="Idea #121212" />
            <div className="max-w-screen-sm mx-auto flex flex-col items-center gap-10">
                <p className="italic text-center">
                    "A startup that creates AI-powered generated personal trainer,
                    delivering customized fitness recommendations and tracking of progress
                    using a mobile app to track workouts and progress as well as a website
                    to manage the business."
                </p>

                <div className="flex items-center text-sm">
                    <div className="flex items-center gap-1">
                        <EyeIcon className="w-4 h-4"/>
                        <span>123</span>
                    </div>
                    <DotIcon className="w-4 h-4" />
                    <span>12 hours ago</span>
                    <DotIcon className="w-4 h-4" />
                    <Button variant="outline">
                        <HeartIcon className="w-4 h-4" />
                        <span>12</span>
                    </Button>
                </div>
                <Button size="lg">Claim idea now &rarr;</Button>
            </div>
        </div>
    );
}