import { Avatar, AvatarFallback, AvatarImage, Button, Textarea } from "~/common/components";
import { Form, Link } from "react-router";
import { DotIcon, MessageCircleIcon } from "lucide-react";
import { useState } from "react";

interface ReplyProps {
    username: string;
    avatarUrl: string;
    content: string;
    timestamp: string;
    topLevel?: boolean;
}

export function Reply({
  username,
  avatarUrl,
  content,
  timestamp,
  topLevel
}: ReplyProps) {
    const [replying, setReplying] = useState(false);
    const toggleReplying = () => setReplying((prev) => !prev);

    return (
        <div className="flex flex-col gap-2">
            <div className="flex items-start gap-5 w-2/3">
                <Avatar className="size-14">
                    <AvatarFallback>N</AvatarFallback>
                    <AvatarImage src={avatarUrl} alt="avatar" />
                </Avatar>
                <div className="flex flex-col gap-4 items-start w-full">
                    <div className="flex gap-2 items-center">
                        <Link to="/users/@nico">
                            <h4 className="font-medium">{username}</h4>
                        </Link>
                        <DotIcon className="size-5" />
                        <span className="text-xs text-muted-foreground">
                        {timestamp}
                    </span>
                    </div>
                    <p className="text-muted-foreground w-1/2">
                        {content}
                    </p>
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
                        <AvatarFallback>N</AvatarFallback>
                        <AvatarImage src="https://github.com/serranoarevalo.png" />
                    </Avatar>
                    <div className="flex flex-col gap-5 items-end w-full">
                        <Textarea
                            placeholder="Write a reply"
                            className="w-full resize-none"
                            rows={5}
                        />
                    </div>
                </Form>
            )}

            {topLevel && (
                <div className="pl-20 w-full">
                    <Reply
                        username="Nicolas"
                        avatarUrl="https://github.com/microsoft.png"
                        content="I've been using Todoist for a while now, and it's really great.
                                        It's simple, clean, and has a lot of features."
                        timestamp="12 hours ago"
                        topLevel={false}
                    />
                </div>
            )}
        </div>
    )
}