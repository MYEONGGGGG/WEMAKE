import { Avatar, AvatarFallback, AvatarImage, Button, Textarea } from "~/common/components";
import { Form, Link } from "react-router";
import { DotIcon, MessageCircleIcon } from "lucide-react";
import { useState } from "react";
import { DateTime } from "luxon";

interface ReplyProps {
    username: string;
    avatarUrl: string | null;
    content: string;
    timestamp: string;
    topLevel?: boolean;
    replies?: {
        post_reply_id: number;
        reply: string;
        created_at: string;
        user: {
            name: string;
            avatar: string | null;
            username: string;
        };
    }[];
}

export function Reply({
  username,
  avatarUrl,
  content,
  timestamp,
  topLevel,
  replies,
}: ReplyProps) {
    const [replying, setReplying] = useState(false);
    const toggleReplying = () => setReplying((prev) => !prev);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-start gap-5 w-2/3">
                <Avatar className="size-14">
                    <AvatarFallback>{username[0]}</AvatarFallback>
                    {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
                </Avatar>
                <div className="flex flex-col gap-4 items-start w-full">
                    <div className="flex gap-2 items-center">
                        <Link to={`/users/${username}`}>
                            <h4 className="font-medium">
                                {username}
                            </h4>
                        </Link>
                        <DotIcon className="size-5" />
                        <span className="text-xs text-muted-foreground">
                            {DateTime.fromISO(timestamp).toRelative()}
                        </span>
                    </div>
                    <p className="text-muted-foreground w-1/2">{content}</p>
                    <Button
                        variant="ghost"
                        className="self-end"
                        onClick={() => toggleReplying()}
                    >
                        <MessageCircleIcon className="size-5" />
                        Reply
                    </Button>
                </div>
            </div>

            {replying && (
                <Form className="flex item-start gap-5 w-3/4">
                    <Avatar className="size-14">
                        <AvatarFallback>{username[0]}</AvatarFallback>
                        {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
                    </Avatar>
                    <div className="flex flex-col gap-5 items-end w-full">
                        <Textarea
                            name="reply"
                            placeholder="Write a reply"
                            className="w-full resize-none"
                            defaultValue={`@${username} `}
                            rows={5}
                        />
                    </div>
                </Form>
            )}

            {topLevel && replies && (
                <div className="pl-20 w-full">
                    {replies.map((reply) => (
                        <Reply
                            username={reply.user.name}
                            avatarUrl={reply.user.avatar}
                            content={reply.reply}
                            timestamp={reply.created_at}
                            topLevel={false}
                        />
                    ))}
                </div>
            )}
        </div>
    )
}