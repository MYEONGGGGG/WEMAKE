import { Avatar, AvatarFallback, AvatarImage, SidebarMenuButton, SidebarMenuItem } from "~/common/components";
import { Link, useLocation } from "react-router";

interface MessageCardProps {
    id: string;
    name: string;
    lastMessage: string;
    avatarUrl: string;
}

export function MessageCard({
    id,
    name,
    lastMessage,
    avatarUrl,
}: MessageCardProps) {
    const location = useLocation();

    return (
        <SidebarMenuItem>
            <SidebarMenuButton
                className="h-18"
                asChild
                isActive={location.pathname === `/my/messages/${id}`}
            >
                <Link to={`/my/messages/${id}`}>
                    <div className="flex items-center gap-2">
                        <Avatar>
                            <AvatarImage src={avatarUrl} alt="avatar" />
                            <AvatarFallback>{name[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                            <span className="text-sm font-medium">{name}</span>
                            <span className="text-xs text-muted-foreground">{lastMessage}</span>
                        </div>
                    </div>
                </Link>
            </SidebarMenuButton>
        </SidebarMenuItem>
    );
}