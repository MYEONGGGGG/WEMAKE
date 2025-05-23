import { Link } from "react-router";
import {
    Separator,
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
    Button,
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
    Avatar,
    AvatarFallback,
    AvatarImage,
} from "~/common/components/index";
import { cn } from "~/lib/utils";
import { BellIcon, LucideBarChart3, MessageCircleIcon, SettingsIcon, UserIcon } from "lucide-react";
import { useIsMobile } from "~/hooks/use-mobile";
import { MobileMenu } from "~/common/components/mobile-menu";

const menus = [
    {
        name: "Products",
        to: "/products",
        items: [
            {
                name: "Leaderboards",
                description: "See the top performers in your community.",
                to: "/products/leaderboards",
            },
            {
                name: "Categories",
                description: "See the top Categories in your community.",
                to: "/products/categories",
            },
            {
                name: "Search",
                description: "Search for products",
                to: "/products/search",
            },
            {
                name: "Submit a Product",
                description: "Submit a product to our community.",
                to: "/products/submit",
            },
            {
                name: "Promote",
                description: "Submit a promote to our community.",
                to: "/products/promote",
            }
        ],
    },
    {
        name: "Jobs",
        to: "/jobs",
        items: [
            {
                name: "Remote Jobs",
                description: "Find a remote job in our community.",
                to: "/jobs?location=remote",
            },
            {
                name: "Full-Time Jobs",
                description: "Find a full-time job in our community.",
                to: "/jobs?location=full-time",
            },
            {
                name: "Freelance Jobs",
                description: "Find a freelance job in our community.",
                to: "/jobs?location=freelance",
            },
            {
                name: "Internships",
                description: "Find an internships in our community.",
                to: "/jobs?location=internship",
            },
            {
                name: "Submit a Job",
                description: "Submit a job to our community.",
                to: "/jobs/submit",
            }
        ]
    },
    {
        name: "Community",
        to: "/community",
        items: [
            {
                name: "All Posts",
                description: "See all posts in our community.",
                to: "/community",
            },
            {
                name: "Top Posts",
                description: "See the top posts in our community.",
                to: "/community?sort=top",
            },
            {
                name: "New Posts",
                description: "See the new posts in our community.",
                to: "/community?sort=new",
            },
            {
                name: "Create a Post",
                description: "Create a post in our community.",
                to: "/community/create",
            }
        ]
    },
    {
        name: "IdeasGPT",
        to: "/ideas",
    },
    {
        name: "Teams",
        to: "/teams",
        items: [
            {
                name: "All Teams",
                description: "See all teams in our community.",
                to: "/teams",
            },
            {
                name: "Create a Team",
                description: "Create a team in our community.",
                to: "/teams/create",
            }
        ]
    }
];

export default function Navigation({
    isLoggedIn,
    hasNotifications,
    hasMessages,
    username,
    avatar,
    name,
} : {
    isLoggedIn: boolean;
    hasNotifications: boolean;
    hasMessages: boolean;
    username?: string;
    avatar?: string | null;
    name?: string;
}) {
    const isMobile = useIsMobile();

    return (
        <nav className="fixed top-0 left-0 right-0 z-50 h-16 flex items-center justify-between px-4 sm:px-6 md:px-20 backdrop-blur bg-background/50 md:bg-background-500/50">
        <div className="flex items-center gap-4">
            {/* Logo */}
            <Link to="/" className="font-bold tracking-tighter text-lg">
                WeMaKe
            </Link>

            {/* Desk-top, Tablet: 메뉴, 구분선 표시 */}
            {!isMobile && (
                <>
                    <Separator orientation="vertical" className="h-6 mx-4" />
                    <NavigationMenu className="hidden md:flex max-w-[60vw]">
                        <NavigationMenuList className="gap-0 md:gap-2 lg:gap-5">
                            {menus.map((menu) => (
                                <NavigationMenuItem key={menu.name}>
                                    {menu.items ? (
                                        <>
                                            <Link to={menu.to} prefetch="render">
                                                <NavigationMenuTrigger className="text-sm md:text-xs lg:text-sm truncate max-w-[100px]">
                                                    {menu.name}
                                                </NavigationMenuTrigger>
                                            </Link>

                                            <NavigationMenuContent className="w-full md:w-[400px] lg:w-[600px]">
                                                <ul className="grid px-2 gap-2 md:grid-cols-2">
                                                    {menu.items?.map((item) => (
                                                        <NavigationMenuItem
                                                            key={item.name}
                                                            className={cn([
                                                                "select-none rounded-md transition-colors focus:bg-accent hover:bg-accent",
                                                                (item.to === "/products/promote" ||
                                                                    item.to === "/jobs/submit") &&
                                                                "col-span-2 bg-primary/10 hover:bg-primary/20 focus:bg-primary/20",
                                                            ])}
                                                        >
                                                            <NavigationMenuLink asChild>
                                                                <Link
                                                                    className="p-3 space-y-1 block leading-none no-underline outline-none"
                                                                    to={item.to}
                                                                >
                                                                <span className="md:text-xs lg:text-sm font-medium leading-none">
                                                                    {item.name}
                                                                </span>
                                                                    <p className="md:text-xs lg:text-sm leading-snug text-muted-foreground">
                                                                        {item.description}
                                                                    </p>
                                                                </Link>
                                                            </NavigationMenuLink>
                                                        </NavigationMenuItem>
                                                    ))}
                                                </ul>
                                            </NavigationMenuContent>
                                        </>
                                    ) : (
                                        <Link
                                            className={cn(
                                                navigationMenuTriggerStyle(),
                                                "text-sm md:text-xs lg:text-sm"
                                            )}
                                            to={menu.to}
                                        >
                                            {menu.name}
                                        </Link>
                                    )}
                                </NavigationMenuItem>
                            ))}
                        </NavigationMenuList>
                    </NavigationMenu>
                </>
            )}
        </div>

        {isLoggedIn ? (
            <div className="hidden sm:flex items-center gap-2">
                <Button
                    size="icon"
                    variant="ghost"
                    asChild
                    className="relative"
                >
                    <Link to="/my/notifications">
                        <BellIcon className="size-4" />
                        {hasNotifications && (
                            <div className="absolute -top-0.5 -right-0.5 size-2 bg-red-500 rounded-full"/>
                        )}
                    </Link>
                </Button>

                <Button
                    size="icon"
                    variant="ghost"
                    asChild
                    className="relative"
                >
                    <Link to="/my/messages">
                        <MessageCircleIcon className="size-4" />
                        {hasMessages && (
                            <div className="absolute -top-0.5 -right-0.5 size-2 bg-red-500 rounded-full"/>
                        )}
                    </Link>
                </Button>

                <DropdownMenu>
                    <DropdownMenuTrigger asChild className="cursor-pointer">
                        <Avatar>
                            {avatar ? (
                                <AvatarImage src={avatar} alt="Avatar" />
                            ) : (
                                <AvatarFallback>{name?.charAt(0)}</AvatarFallback>
                            )}
                        </Avatar>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="w-56">
                        <DropdownMenuLabel className="flex flex-col">
                            <span className="font-medium">
                                {name}
                            </span>
                            <span className="text-xs text-muted-foreground">
                                @{username}
                            </span>
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

            </div>
          ) : (
            <div className="hidden sm:flex items-center gap-2 sm:gap-4">
                <Button asChild variant="secondary" className="text-xs px-3 py-1.5">
                    <Link to="/auth/login">Login</Link>
                </Button>
                <Button asChild className="text-xs px-3 py-1.5">
                    <Link to="/auth/join">Join</Link>
                </Button>
            </div>
          )}

          {/* Mobile : 햄버거 메뉴 활성화 // MobileMenu는 임시로 넣어둔것이며, 추후에 발생하는 오류에 대해 수정할 필요가 있음!! */}
          {isMobile && <MobileMenu />}
        </nav>
    );
}