import type { Route } from "./+types/post-page";
import {
    Avatar, AvatarFallback, AvatarImage,
    Breadcrumb,
    BreadcrumbItem,
    BreadcrumbLink,
    BreadcrumbList,
    BreadcrumbSeparator,
    Button, Textarea, Badge
} from "~/common/components";
import { Form, Link } from "react-router";
import { ChevronUpIcon, DotIcon } from "lucide-react";
import { Reply } from "~/features/community/components/reply";

export const meta: Route.MetaFunction = ({ params }) => {
    return [
        { title: `${params.postId} | WeMaKe` }
    ];
};

export default function postPage() {
    return (
        <div className="space-y-10">
            {/* top */}
            <Breadcrumb>
                <BreadcrumbList>
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/community">Community</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/community?topic=productivity">Productivity</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to="/community/postId">
                                What is the best productivity tool?
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-6 gap-40 items-start">
                {/* left */}
                <div className="col-span-4 space-y-10">
                    <div className="flex w-full items-start gap-10">
                        <Button variant="outline" className="flex flex-col h-14">
                            <ChevronUpIcon className="size-4 shrink-0" />
                            <span>123</span>
                        </Button>

                        <div className="space-y-20">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold">
                                    What is the best productivity tool?
                                </h2>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                            <span>
                                @nico
                            </span>
                                    <DotIcon className="size-5" />
                                    <span>
                                12 hours ago
                            </span>
                                    <DotIcon className="size-5" />
                                    <span>
                                10 replies
                            </span>
                                </div>
                                <p className="text-muted-foreground max-w-2/3">
                                    Hello, I'm looking for a productivity tool that can help me
                                    manage my tasks and projects. Any recommendations?
                                    I have tried Notion, but it's not what I'm looking for.
                                    I dream of a tool that can help me manage my tasks and projects.
                                    Any recommendations?
                                </p>
                            </div>
                            <Form className="flex items-start gap-5 w-3/4">
                                <Avatar className="size-14">
                                    <AvatarFallback>N</AvatarFallback>
                                    <AvatarImage src="https://github.com/serranoarevalo.png" alt="avatar" />
                                </Avatar>
                                <div className="flex flex-col gap-5 items-end w-full">
                                    <Textarea
                                        placeholder="Write a reply"
                                        className="w-full resize-none"
                                        rows={10}
                                    />
                                    <Button>Reply</Button>
                                </div>
                            </Form>
                            <div className="space-y-10">
                                <h4 className="font-semibold">10 Replies</h4>
                                <div className="flex flex-col gap-5">
                                    <Reply
                                        username="Nicolas"
                                        avatarUrl="https://github.com/microsoft.png"
                                        content="I've been using Todoist for a while now, and it's really great.
                                        It's simple, clean, and has a lot of features."
                                        timestamp="12 hours ago"
                                        topLevel
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* right */}
                <aside className="col-span-2 space-y-5 border rounded-lg p-6 shadow-sm">
                    <div className="flex gap-5">
                        <Avatar className="size-14">
                            <AvatarFallback>N</AvatarFallback>
                            <AvatarImage src="https://github.com/serranoarevalo.png" alt="avatar" />
                        </Avatar>
                        <div className="flex flex-col">
                            <h4 className="text-lg font-medium">Nicolas</h4>
                            <Badge variant="secondary">Entrepreneur</Badge>
                        </div>
                    </div>
                    <div className="gap-2 text-sm flex flex-col">
                        <span>🎂 Joined 3 months ago</span>
                        <span>🚀 Launched 10 products</span>
                    </div>
                    <Button variant="outline" className="w-full">Follow</Button>
                </aside>
            </div>
        </div>
    );
}