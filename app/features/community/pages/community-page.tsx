import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/community-page";
import { Form, Link, useSearchParams } from "react-router";
import {
    Button,
    DropdownMenu,
    DropdownMenuCheckboxItem,
    DropdownMenuContent,
    DropdownMenuTrigger, Input
} from "~/common/components";
import { ChevronDownIcon } from "lucide-react";
import { PERIOD_OPTIONS, SORT_OPTIONS } from "~/features/community/constants";
import { PostCard } from "~/features/community/components/post-card";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Start Social | WeMaKe" }
    ];
};

export default function CommunityPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const sorting = searchParams.get("sorting") || "newest";
    const period = searchParams.get("period") || "all";

    return (
        <div className="space-y-20">
            <Hero
                title="Community"
                subtitle="Ask questions, share ideas, and connect with other developers"
            />

            <div className="grid grid-cols-6 items-start gap-40">
                {/* left */}
                <div className="col-span-4">
                    <div className="flex justify-between">
                        <div className="space-y-5 w-full">
                            <div className="flex items-center gap-5">
                                <DropdownMenu>
                                    <DropdownMenuTrigger className="flex items-center gap-2">
                                        <span className="text-sm capitalize">{ sorting }</span>
                                        <ChevronDownIcon className="size-5" />
                                    </DropdownMenuTrigger>
                                    <DropdownMenuContent>
                                        {SORT_OPTIONS.map((option) => (
                                            <DropdownMenuCheckboxItem
                                                key={option}
                                                className="capitalize cursor-pointer"
                                                onCheckedChange={(checked: boolean) => {
                                                    if (checked) {
                                                        searchParams.set("sorting", option);
                                                        setSearchParams(searchParams);
                                                    }
                                                }}
                                            >
                                                {option}
                                            </DropdownMenuCheckboxItem>
                                        ))}
                                    </DropdownMenuContent>
                                </DropdownMenu>

                                { sorting === "popular" && (
                                    <DropdownMenu>
                                        <DropdownMenuTrigger className="flex items-center gap-2">
                                            <span className="text-sm capitalize">{ period }</span>
                                            <ChevronDownIcon className="size-5" />
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent>
                                            {PERIOD_OPTIONS.map((option) => (
                                                <DropdownMenuCheckboxItem
                                                    key={option}
                                                    className="capitalize cursor-pointer"
                                                    onCheckedChange={(checked: boolean) => {
                                                        if (checked) {
                                                            searchParams.set("period", option);
                                                            setSearchParams(searchParams);
                                                        }
                                                    }}
                                                >
                                                    {option}
                                                </DropdownMenuCheckboxItem>
                                            ))}
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                ) }
                            </div>
                            <Form className="w-2/3">
                                <Input
                                    type="text"
                                    name="keyword"
                                    placeholder="Search for discussions"
                                />
                            </Form>
                        </div>
                        <Button asChild>
                            <Link to={`/community/submit`}>Create Discussion</Link>
                        </Button>
                    </div>
                    <div className="space-y-5">
                        {Array.from({ length: 11 }).map((_, index) => (
                            <PostCard
                                key={`postId-${index}`}
                                id={`postId-${index}`}
                                title="What is the best way to create a product?"
                                author="John Doe"
                                authorAvatarUrl="https://github.com/apple.png"
                                category="Productivity"
                                postedAt="12 hours ago"
                                expanded
                            />
                        ))}
                    </div>
                </div>

                {/* right */}
                <aside className="col-span-2 space-y-5">
                    <span className="text-sm font-bold text-muted-foreground uppercase">
                        Topics
                    </span>
                    <div className="flex flex-col gap-8 items-start">
                        {[
                            "AI Tools",
                            "Design Tools",
                            "Dev Tools",
                            "Note Taking Apps",
                            "Productivity Tools",
                        ].map((category) => (
                            <Button asChild variant="link" key={category} className="pl-0">
                                <Link to={`/community?topic=${category}`} >
                                    {category}
                                </Link>
                            </Button>
                        ))}
                    </div>
                </aside>
            </div>
        </div>
    );
}