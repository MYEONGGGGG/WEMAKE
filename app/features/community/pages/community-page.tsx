import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/community-page";
import { Await, Form, Link, useSearchParams } from "react-router";
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
import { getTopics, getPosts } from "~/features/community/queries";
import { Suspense } from "react";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Start Social | WeMaKe" }
    ];
};

export const loader = async () => {
    // await new Promise((resolve) => setTimeout(resolve, 1000));
    // const topics = await getTopics();
    // const posts = await getPosts();

    // const [topics, posts] = await Promise.all([getTopics(), getPosts()]);
    const topics = getTopics();
    const posts = getPosts();

    return { topics, posts };
};

export default function CommunityPage({ loaderData }: Route.ComponentProps) {
    const { topics, posts } = loaderData;
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
                    <Suspense fallback={<div>Loading...</div>}>
                        <Await resolve={posts}>
                            {(data) => (
                                <div className="space-y-5 w-full">
                                    {data.map((post) => (
                                        <PostCard
                                            key={post.post_id}
                                            id={post.post_id}
                                            title={post.title}
                                            author={post.author}
                                            authorAvatarUrl={post.author_avatar}
                                            category={post.topic}
                                            postedAt={post.created_at}
                                            voteCount={post.upvotes}
                                            expanded
                                        />
                                    ))}
                                </div>
                            )}
                        </Await>
                    </Suspense>
                </div>

                {/* right */}
                <aside className="col-span-2 space-y-5">
                    <span className="text-sm font-bold text-muted-foreground uppercase">
                        Topics
                    </span>
                    <Suspense fallback={<div>Loading...</div>}>
                        <Await resolve={topics}>
                            {(data) => (
                                <div className="flex flex-col gap-8 items-start">
                                    {data.map((topic) => (
                                        <Button
                                            asChild
                                            variant="link"
                                            key={topic.slug}
                                            className="pl-0"
                                        >
                                            <Link to={`/community?topic=${topic.slug}`} >
                                                {topic.name}
                                            </Link>
                                        </Button>
                                    ))}
                                </div>
                            )}
                        </Await>
                    </Suspense>
                </aside>
            </div>
        </div>
    );
}