import { MenuIcon } from "lucide-react";
import { Link } from "react-router";
import {
    ButtonRef,
    Sheet,
    SheetContentRef,
    SheetTrigger,
    SheetTitle,
    SheetDescription,
    SheetFooter, SheetClose, SheetHeader,
} from "~/common/components";
import NavDropdownMenu from "~/common/components/nav-dropdown-menu";
import { MOBILE_MENUS } from "~/common/components/constants";

export function MobileMenu({
    isMobile,
    isLoggedIn,
    username,
    avatar,
    name,
}: {
    isMobile: boolean;
    isLoggedIn: boolean;
    username?: string;
    avatar?: string | null;
    name?: string;
}) {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <ButtonRef variant="ghost" size="icon">
                    <MenuIcon className="size-5" />
                </ButtonRef>
            </SheetTrigger>

            <SheetContentRef side="right" className="w-64 p-6">
                <SheetHeader>
                    {isLoggedIn && (
                        <div className="flex items-center gap-3">
                            <NavDropdownMenu
                                isMobile={isMobile}
                                username={username}
                                avatar={avatar}
                                name={name}
                            />
                        </div>
                    )}

                    <SheetTitle className="sr-only">모바일 메뉴</SheetTitle>
                    <SheetDescription className="sr-only">
                        네비게이션 메뉴를 선택하세요.
                    </SheetDescription>
                </SheetHeader>

                <nav className="flex flex-col gap-6 mt-4">
                    {MOBILE_MENUS.map((menu) => (
                        <div key={menu.name}>
                            <Link to={menu.to} className="text-base font-semibold">
                                {menu.name}
                            </Link>
                            {menu.items && menu.items.length > 0 && (
                                <div>
                                    {menu.items.map((item) => (
                                        <Link
                                            key={item.name}
                                            to={item.to}
                                            className="ml-4 block text-sm text-muted-foreground mt-1"
                                        >
                                            {item.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </nav>
                <SheetFooter className="mt-6">
                    {!isLoggedIn && (
                        <div className="flex flex-col gap-3 w-full">
                            <SheetClose asChild>
                                <ButtonRef asChild variant="outline" className="text-xs w-full">
                                    <Link to="/auth/login">Login</Link>
                                </ButtonRef>
                            </SheetClose>
                            <SheetClose asChild>
                                <ButtonRef asChild className="text-xs w-full">
                                    <Link to="/auth/join">Join</Link>
                                </ButtonRef>
                            </SheetClose>
                        </div>
                    )}
                </SheetFooter>
            </SheetContentRef>
        </Sheet>
    );
}