import { Link } from "react-router";
import {
    Avatar, AvatarImage, AvatarFallback,
    DropdownMenu,
    DropdownMenuTrigger,
    DropdownMenuContent,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuGroup,
    DropdownMenuItem,
} from "~/common/components/index";
import { LucideBarChart3, SettingsIcon, UserIcon } from "lucide-react";

export default function NavDropdownMenu({
    isMobile,
    username,
    avatar,
    name,
}: {
    isMobile: boolean;
    username?: string;
    avatar?: string | null;
    name?: string;
}) {

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild className="cursor-pointer">
                <div className="flex items-center gap-2">
                    <Avatar>
                        {avatar ? (
                            <AvatarImage src={avatar} alt="Avatar" />
                        ) : (
                            <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                        )}
                    </Avatar>
                    {isMobile && (
                        <span className="text-sm">{name} 님</span>
                    )}
                </div>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-56">
                <DropdownMenuLabel className="flex flex-col">
                    <span className="font-medium">{name}</span>
                    <span className="text-xs text-muted-foreground">@{username}</span>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link to="/my/dashboard">
                            <LucideBarChart3 className="size-4 mr-2" />
                            Dashboard
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link to="/my/profile">
                            <UserIcon className="size-4 mr-2" />
                            Profile
                        </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild className="cursor-pointer">
                        <Link to="/my/settings">
                            <SettingsIcon className="size-4 mr-2" />
                            Settings
                        </Link>
                    </DropdownMenuItem>
                </DropdownMenuGroup>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild className="cursor-pointer">
                    <Link to="/auth/logout">
                        Logout
                    </Link>
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    );
}