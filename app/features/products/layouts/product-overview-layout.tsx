import { NavLink, Outlet } from "react-router";
import { ChevronUpIcon, StarIcon } from "lucide-react";
import { Button, buttonVariants } from "~/common/components";
import type { Route } from ".react-router/types/app/features/products/pages/+types/product-overview-page";
import { cn } from "~/lib/utils";
import { useIsMobile } from "~/hooks/use-mobile";

export default function ProductOverviewLayout({
  params: { productId },
}: Route.ComponentProps) {
    const isMobile = useIsMobile();

    return (
        <div className="space-y-10">
            {/* header */}
            <div className="flex flex-col md:flex-row md:justify-between gap-6">
                {/* Left */}
                <div className="flex gap-3 md:gap-10">
                    <div className="size-40 rounded-xl shadow-xl bg-primary/50"></div>
                    <div>
                        <h1 className="text-2xl md:text-5xl font-bold">Product Name</h1>
                        <p className="text-base md:text-2xl font-light">Product Description</p>
                        <div className="mt-5 flex items-center gap-2">
                            <div className="flex text-yellow-400">
                                {Array.from({length: 5}).map((_, i) => (
                                    <StarIcon className="size-3 md:size-4" fill="currentColor" key={i} />
                                ))}
                            </div>
                            <span className="text-xs md:text-base text-muted-foreground">100 reviews</span>
                        </div>
                    </div>
                </div>

                {/* Right - Tablet and Desktop */}
                <div className="hidden md:flex flex-row gap-4 md:gap-10 w-full items-start">
                    <Button
                        variant="secondary"
                        size="lg"
                        className="text-lg h-14 px-10"
                    >
                        Visit Website
                    </Button>
                    <Button
                        size="lg"
                        className="text-lg h-14 px-10 flex items-center gap-2"
                    >
                        <ChevronUpIcon className="size-4" />
                        Upvote (100)
                    </Button>
                </div>

                {/* Right - Mobile */}
                <div className="flex flex-col gap-3 md:hidden">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="text-sm h-10 px-6"
                    >
                        Visit Website
                    </Button>
                    <Button
                        size="sm"
                        className="text-sm h-10 px-6 flex items-center gap-2"
                    >
                        <ChevronUpIcon className="size-4" />
                        Upvote (100)
                    </Button>
                </div>
            </div>

            {/* overview and reviews */}
            <div className="flex gap-2.5">
                <NavLink
                    end
                    className={( {isActive} ) =>
                        cn(
                            buttonVariants({ variant: "outline" }),
                            isActive && "bg-accent text-foreground"
                        )
                    }
                    to={`/products/${productId}/overview`}
                >
                    Overview
                </NavLink>

                <NavLink
                    className={( {isActive} ) =>
                        cn(
                            buttonVariants({ variant: "outline" }),
                            isActive && "bg-accent text-foreground"
                        )
                    }
                    to={`/products/${productId}/reviews`}
                >
                    Reviews
                </NavLink>
            </div>

            {/* 자식 요소 */}
            <Outlet />
        </div>
    );
}