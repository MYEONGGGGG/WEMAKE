import { NavLink, Outlet } from "react-router";
import { ChevronUpIcon, StarIcon } from "lucide-react";
import { Button, buttonVariants } from "~/common/components";
import type { Route } from "./+types/product-overview-layout";
import { cn } from "~/lib/utils";
import { useIsMobile } from "~/hooks/use-mobile";
import { getProductById } from "~/features/products/queries";
import { Link } from "react-router";
import { makeSSRClient } from "~/supa-client";

export function meta({ data }: Route.MetaArgs) {
    return [
        { title: `${data.product.name} Overview | WeMaKe` },
        { name: "description", content: "Product overview and reviews" },
    ];
};

export const loader = async ({
    params, request
}: Route.LoaderArgs & { params: {productId: string} }) => {
    const { client, headers } = makeSSRClient(request);
    const product = await getProductById(client, { productId: params.productId });
    return { product };
}

export default function ProductOverviewLayout({loaderData}: Route.ComponentProps) {
    const isMobile = useIsMobile();

    return (
        <div className="space-y-10">
            {/* header */}
            <div className="flex flex-col md:flex-row md:justify-between gap-6 w-full">
                {/* Left */}
                <div className="flex gap-3 md:gap-10">
                    <div className="size-40 rounded-xl overflow-hidden shadow-xl bg-primary/50"></div>
                    <div>
                        <h1 className="text-2xl md:text-5xl font-bold">{loaderData.product.name}</h1>
                        <p className="text-base md:text-2xl font-light">{loaderData.product.tagline}</p>
                        <div className="mt-5 flex items-center gap-2">
                            <div className="flex text-yellow-400">
                                {Array.from({length: 5}).map((_, i) => (
                                    <StarIcon
                                        key={i}
                                        className="size-3 md:size-4"
                                        fill={i < Math.floor(loaderData.product.average_rating)
                                            ? "currentColor"
                                            : "none"}
                                    />
                                ))}
                            </div>
                            <span className="text-xs md:text-base text-muted-foreground">
                                {loaderData.product.reviews} reviews
                            </span>
                        </div>
                    </div>
                </div>

                {/* Right - Tablet and Desktop */}
                <div className="hidden md:flex flex-row gap-4 md:gap-10 items-start">
                    <Button
                        variant="secondary"
                        size="lg"
                        className="text-lg h-14 px-10"
                        asChild
                    >
                        <Link to={`/products/${loaderData.product.product_id}/visit`}>
                            Visit Website
                        </Link>
                    </Button>
                    <Button
                        size="lg"
                        className="text-lg h-14 px-10 flex items-center gap-2"
                    >
                        <ChevronUpIcon className="size-4" />
                        Upvote ({loaderData.product.upvotes})
                    </Button>
                </div>

                {/* Right - Mobile */}
                <div className="flex flex-col gap-3 md:hidden">
                    <Button
                        variant="secondary"
                        size="sm"
                        className="text-sm h-10 px-6"
                        asChild
                    >
                        <Link to={`/products/${loaderData.product.product_id}/visit`}>
                            Visit Website
                        </Link>
                    </Button>
                    <Button
                        size="sm"
                        className="text-sm h-10 px-6 flex items-center gap-2"
                    >
                        <ChevronUpIcon className="size-4" />
                        Upvote ({loaderData.product.upvotes})
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
                    to={`/products/${loaderData.product.product_id}/overview`}
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
                    to={`/products/${loaderData.product.product_id}/reviews`}
                >
                    Reviews
                </NavLink>
            </div>

            <div>
                {/* 자식 요소 */}
                <Outlet context={{
                    product_id: loaderData.product.product_id,
                    description: loaderData.product.description,
                    how_it_works: loaderData.product.how_it_works,
                    review_count: loaderData.product.reviews,
                }} />
            </div>
        </div>
    );
}