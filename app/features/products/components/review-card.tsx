import { Avatar, AvatarFallback, AvatarImage } from "~/common/components";
import { StarIcon } from "lucide-react";
import { DateTime } from "luxon";

interface ReviewCardProps {
    username: string;
    handle: string;
    avatarUrl: string | null;
    rating: number;
    content: string;
    postedAt: string;
}

export function ReviewCard({
    username,
    handle,
    avatarUrl,
    rating,
    content,
    postedAt
}: ReviewCardProps) {
    return (
        <div className="space-y-5">
            <header className="flex items-center gap-2">
                <Avatar>
                    <AvatarFallback>N</AvatarFallback>
                    {avatarUrl ? <AvatarImage src={avatarUrl} /> : null}
                </Avatar>
                <div>
                    <h4 className="text-lg font-bold">{username}</h4>
                    <p className="text-sm text-muted-foreground">{handle}</p>
                </div>
            </header>

            <div className="flex text-yellow-400">
                {Array.from({ length: rating }).map((_, i) => (
                    <StarIcon key={`star-${i}`} className="size-4" fill="currentColor" />
                ))}
            </div>

            <p className="text-muted-foreground">{content}</p>

            <footer>
                <time className="text-xs text-muted-foreground">
                    {DateTime.fromISO(postedAt).toRelative()}
                </time>
            </footer>
        </div>
    );
}