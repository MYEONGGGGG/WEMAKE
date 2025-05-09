import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Button,
    Card,
    CardFooter,
    CardHeader,
    CardTitle
} from "~/common/components";
import { EyeIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface NotificationCardProps {
    avatarUrl: string;
    avatarFallback: string;
    userName: string;
    message: string;
    timestamp: string;
    seen: boolean;
}

export function NotificationCard({
    avatarUrl,
    avatarFallback,
    userName,
    message,
    timestamp,
    seen,
}: NotificationCardProps) {

    return (
        <Card className={cn("min-w-[450px]", seen ? "" : "bg-yellow-500/60")}>
            <CardHeader className="flex flex-row gap-5 items-start">
                <Avatar>
                    <AvatarImage src={avatarUrl} alt="avatar" />
                    <AvatarFallback>{avatarFallback}</AvatarFallback>
                </Avatar>
                <div>
                    <CardTitle className="text-lg font-bold">
                        <span>{userName}</span>
                        <span>{message}</span>
                    </CardTitle>
                    <small className="text-muted-foreground text-sm">
                        {timestamp}
                    </small>
                </div>
            </CardHeader>
            <CardFooter className="flex justify-end">
                <Button variant="outline" size="icon">
                    <EyeIcon className="w-4 h-4" />
                </Button>
            </CardFooter>
        </Card>
    );
}