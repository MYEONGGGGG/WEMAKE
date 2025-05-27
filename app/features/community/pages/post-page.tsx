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
import { Form, Link, useFetcher, useOutletContext } from "react-router";
import { ChevronUpIcon, DotIcon } from "lucide-react";
import { Reply } from "~/features/community/components/reply";
import { getPostById, getReplies } from "~/features/community/queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { createReply } from "~/features/community/mutations";
import { z } from "zod";
import { useEffect, useRef } from "react";
import { cn } from "~/lib/utils";

export const meta: Route.MetaFunction = ({ data }) => {
    return [{ title: `${data.post.title} on ${data.post.topic_name} | WeMaKe` }];
};

const formSchema = z.object({
    reply: z.string().min(1),
    topLevelId: z.coerce.number().optional(),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
    const { client } = makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const formData = await request.formData();
    const { success, error, data } = formSchema.safeParse(
        Object.fromEntries(formData)
    );
    if (!success) {
        return {
            formErrors: error.flatten().fieldErrors,
        };
    }
    const { reply, topLevelId } = data;
    await createReply(client, {
        postId: params.postId,
        reply,
        userId,
        topLevelId,
    });
    return {
        ok: true,
    };
};

export const loader  = async ({ params, request }: Route.LoaderArgs) => {
    const { client, headers } = makeSSRClient(request);
    const [ post, replies ] = await Promise.all([
        getPostById(client, { postId: params.postId }),
        getReplies(client, { postId: params.postId }),
    ]);

    return { post, replies };
}

export default function PostPage({
    loaderData,
    actionData,
}: Route.ComponentProps) {
    const fetcher = useFetcher();
    const { isLoggedIn, name, username, avatar } = useOutletContext<{
        isLoggedIn: boolean;
        name?: string;
        username?: string;
        avatar?: string;
    }>();
    const formRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        if (actionData?.ok) {
            formRef.current?.reset();
        }
    }, [actionData?.ok]);

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
                            <Link to={`/community?topic=${loaderData.post.topic_slug}`}>
                                {loaderData.post.topic_name}
                            </Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                    <BreadcrumbSeparator />
                    <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                            <Link to={`/community/postId`}>{loaderData.post.title}</Link>
                        </BreadcrumbLink>
                    </BreadcrumbItem>
                </BreadcrumbList>
            </Breadcrumb>

            <div className="grid grid-cols-6 gap-40 items-start">
                {/* left */}
                <div className="col-span-4 space-y-10">
                    <div className="flex w-full items-start gap-10">
                        <fetcher.Form
                            method="post"
                            action={`/community/${loaderData.post.post_id}/upvote`}
                        >
                            <Button
                                variant="outline"
                                className={cn(
                                    "flex flex-col h-14",
                                    loaderData.post.is_upvoted
                                        ? "border-primary text-primary"
                                        : ""
                                )}
                            >
                                <ChevronUpIcon className="size-4 shrink-0" />
                                <span>{loaderData.post.upvotes}</span>
                            </Button>
                        </fetcher.Form>

                        <div className="space-y-20 w-full">
                            <div className="space-y-2">
                                <h2 className="text-3xl font-bold">{loaderData.post.title}</h2>
                                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                    <span>{loaderData.post.author_name}</span>
                                    <DotIcon className="size-5" />
                                    <span>
                                        {DateTime.fromISO(loaderData.post.created_at, {
                                            zone: "Asia/Seoul",
                                        }).toRelative()}
                                    </span>
                                    <DotIcon className="size-5" />
                                    <span>{loaderData.post.replies} replies</span>
                                </div>
                                <p className="text-muted-foreground max-w-2/3">
                                    {loaderData.post.content}
                                </p>
                            </div>
                            {isLoggedIn ? (
                                <Form
                                    ref={formRef}
                                    className="flex items-start gap-5 w-3/4"
                                    method="post"
                                >
                                    <Avatar className="size-14">
                                        <AvatarFallback>{name?.[0]}</AvatarFallback>
                                        <AvatarImage src={avatar} />
                                    </Avatar>
                                    <div className="flex flex-col gap-5 items-end w-full">
                                        <Textarea
                                            name="reply"
                                            placeholder="Write a reply"
                                            className="w-full resize-none"
                                            rows={5}
                                        />
                                        <Button>Reply</Button>
                                    </div>
                                </Form>
                            ) : null}
                            <div className="space-y-10">
                                <h4 className="font-semibold">
                                    {loaderData.post.replies} Replies
                                </h4>
                                <div className="flex flex-col gap-5">
                                    {loaderData.replies.map((reply) => (
                                        <Reply
                                            key={reply.post_reply_id}
                                            name={reply.user.name}
                                            username={reply.user.username}
                                            avatarUrl={reply.user.avatar}
                                            content={reply.reply}
                                            timestamp={reply.created_at}
                                            topLevel={true}
                                            topLevelId={reply.post_reply_id}
                                            replies={reply.post_replies}
                                        />
                                    ))}
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
                        <div className="flex flex-col items-start">
                            <h4 className="text-lg font-medium">
                                {loaderData.post.author_role}
                            </h4>
                            <Badge variant="secondary" className="capitalize">
                                {loaderData.post.author_role}
                            </Badge>
                        </div>
                    </div>
                    <div className="gap-2 text-sm flex flex-col">
                        <span>
                            🎂 Joined{" "}
                            {DateTime.fromISO(loaderData.post.author_created_at, {
                                zone: "Asia/Seoul",
                            }).toRelative()}{" "}
                        </span>
                        <span>🚀 Launched {loaderData.post.products} products</span>
                    </div>
                    <Button variant="outline" className="w-full">Follow</Button>
                </aside>
            </div>
        </div>
    );
}