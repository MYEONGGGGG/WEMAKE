import { Avatar, AvatarFallback, AvatarImage } from "~/common/components";
import { cn } from "~/lib/utils";

interface MessageBubbleProps {
    avatarUrl: string;
    avatarFallback: string;
    content: string;
    isCurrentUser?: boolean;
}

export default function MessageBubble({
    avatarUrl,
    avatarFallback,
    content,
    isCurrentUser = false,
}: MessageBubbleProps) {

    return (
        <div className={cn(
            "flex items-end gap-4",
            isCurrentUser ? "flex-row-reverse" : ""
        )}>
            <Avatar>
                <AvatarImage src={avatarUrl} alt="avatar" />
                <AvatarFallback>{avatarFallback}</AvatarFallback>
            </Avatar>
            <div className={cn({
                "bg-accent rounded-md p-4 text-sm w-1/4": true,
                "bg-accent rounded-br-none": isCurrentUser,
                "bg-primary/80 text-primary-foreground rounded-bl-none": !isCurrentUser,
            })}>
                <p>{content}</p>
            </div>
        </div>
    );
}