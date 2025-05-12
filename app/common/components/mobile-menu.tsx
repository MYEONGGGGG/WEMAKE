import { Sheet, SheetContent, SheetTrigger } from "~/common/components/ui/sheet";
import { Button } from "~/common/components/ui/button";
import { MenuIcon } from "lucide-react";
import { Link } from "react-router";

const menus = [
    {
        name: "Products",
        to: "/products",
        items: [
            { name: "Leaderboards", to: "/products/leaderboards" },
            { name: "Categories", to: "/products/categories" },
            { name: "Search", to: "/products/search" },
            { name: "Submit a Product", to: "/products/submit" },
            { name: "Promote", to: "/products/promote" },
        ],
    },
    {
        name: "Jobs",
        to: "/jobs",
        items: [
            { name: "Remote Jobs", to: "/jobs?location=remote" },
            { name: "Full-Time Jobs", to: "/jobs?location=full-time" },
            { name: "Freelance Jobs", to: "/jobs?location=freelance" },
            { name: "Internships", to: "/jobs?location=internship" },
            { name: "Submit a Job", to: "/jobs/submit" },
        ],
    },
    {
        name: "Community",
        to: "/community",
        items: [
            { name: "All Posts", to: "/community" },
            { name: "Top Posts", to: "/community?sort=top" },
            { name: "New Posts", to: "/community?sort=new" },
            { name: "Create a Post", to: "/community/create" },
        ],
    },
    {
        name: "IdeasGPT",
        to: "/ideas",
    },
    {
        name: "Teams",
        to: "/teams",
        items: [
            { name: "All Teams", to: "/teams" },
            { name: "Create a Team", to: "/teams/create" },
        ],
    },
];

export function MobileMenu() {
    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="ghost" size="icon">
                    <MenuIcon className="size-5" />
                </Button>
            </SheetTrigger>

            <SheetContent side="left" className="w-64 p-6">
                <nav className="flex flex-col gap-6 mt-4">
                    {menus.map((menu) => (
                        <div key={menu.name}>
                            <Link to={menu.to} className="text-base font-semibold">
                                {menu.name}
                            </Link>
                            {menu.items?.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.to}
                                    className="ml-4 block text-sm text-muted-foreground mt-1"
                                >
                                    {item.name}
                                </Link>
                            ))}
                        </div>
                    ))}
                </nav>
            </SheetContent>
        </Sheet>
    );
}