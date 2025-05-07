import { NavLink, Outlet } from "react-router";
import { ChevronUpIcon, StarIcon } from "lucide-react";
import { Button, buttonVariants } from "~/common/components";
import type { Route } from ".react-router/types/app/features/products/pages/+types/product-overview-page";
import { cn } from "~/lib/utils";

export default function ProductOverviewLayout({
  params: { productId },
}: Route.ComponentProps) {
    return (
        <div className="space-y-10">
            {/* header */}
            <div className="flex justify-between">
                {/* Left */}
                <div className="flex gap-10">
                    <div className="size-40 rounded-xl shadow-xl bg-primary/50"></div>
                    <div>
                        <h1 className="text-5xl font-bold">Product Name</h1>
                        <p className="text-2xl font-light">Product Description</p>
                        <div className="mt-5 flex items-center gap-2">
                            <div className="flex text-yellow-400">
                                {Array.from({length: 5}).map((_, i) => (
                                    <StarIcon className="size-4" fill="currentColor" key={i} />
                                ))}
                            </div>
                            <span className="text-muted-foreground">100 reviews</span>
                        </div>
                    </div>
                </div>

                {/* Right */}
                <div className="flex gap-10">
                    <Button
                        variant={"secondary"}
                        size="lg"
                        className="text-lg h-14 px-10"
                    >
                        Visit Website
                    </Button>
                    <Button
                        size="lg"
                        className="text-lg h-14 px-10"
                    >
                        <ChevronUpIcon className="size-4" />
                        Upvote (100)
                    </Button>
                </div>
            </div>

            {/* overview and reviews */}
            <div className="flex gap-2.5">
                <NavLink
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