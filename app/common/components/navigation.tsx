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
} from "~/common/components/index";
import { cn } from "~/lib/utils";
import { BellIcon, MessageCircleIcon } from "lucide-react";
import { useIsMobile } from "~/hooks/use-mobile";
import { MobileMenu } from "~/common/components/mobile-menu";
import NavDropdownMenu from "~/common/components/nav-dropdown-menu";
import { DESKTOP_MENUS } from "~/common/components/constants";

const menus = DESKTOP_MENUS;

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

                <NavDropdownMenu
                    isMobile={isMobile}
                    username={username}
                    avatar={avatar}
                    name={name}
                />
            </div>
          ) : (
            <div className="hidden md:flex items-start gap-2 sm:gap-4">
                <Button asChild variant="secondary" className="text-xs px-3 py-1.5">
                    <Link to="/auth/login">Login</Link>
                </Button>
                <Button asChild className="text-xs px-3 py-1.5">
                    <Link to="/auth/join">Join</Link>
                </Button>
            </div>
          )}

          {isMobile &&
              <MobileMenu
                  isMobile={isMobile}
                  isLoggedIn={isLoggedIn}
                  username={username}
                  avatar={avatar}
                  name={name}
              />
          }
        </nav>
    );
}