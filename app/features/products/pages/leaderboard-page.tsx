import type { Route } from "./+types/leaderboard-page";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components";
import { Link } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";

export const meta : Route.MetaFunction = () => {
    return [
        { title: "Leaderboards | WeMaKe" },
        { name: "description", content: "Top products leaderboard" }
    ];
}

export default function LeaderboardPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-20">
            <Hero
                title="Leaderboards"
                subtitle="The most popular products on WeMaKe"
            />

            {/* Daily */}
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight">
                        Daily Leaderboard
                    </h2>
                    <p className="text-xl font-light text-foreground">
                        The most popular products on WeMaKe by day.
                    </p>
                </div>
                {Array.from({ length: 7 }).map((_, index) => (
                    <ProductCard
                        key={index}
                        id={`productId-${index}`}
                        name="Product Name"
                        description="Product Description"
                        commentsCount={12}
                        viewsCount={12}
                        votesCount={120}
                    />
                ))}
                <Button variant="link" asChild className="text-lg p-0 self-center">
                    <Link to="/products/leaderboards/daily">
                        Explore all products &rarr;
                    </Link>
                </Button>
            </div>

            {/* Weekly */}
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight">
                        Weekly Leaderboard
                    </h2>
                    <p className="text-xl font-light text-foreground">
                        The most popular products on WeMaKe by week.
                    </p>
                </div>
                {Array.from({ length: 7 }).map((_, index) => (
                    <ProductCard
                        key={index}
                        id={`productId-${index}`}
                        name="Product Name"
                        description="Product Description"
                        commentsCount={12}
                        viewsCount={12}
                        votesCount={120}
                    />
                ))}
                <Button variant="link" asChild className="text-lg p-0 self-center">
                    <Link to="/products/leaderboards/weekly">
                        Explore all products &rarr;
                    </Link>
                </Button>
            </div>

            {/* Monthly */}
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight">
                        Monthly Leaderboard
                    </h2>
                    <p className="text-xl font-light text-foreground">
                        The most popular products on WeMaKe by month.
                    </p>
                </div>
                {Array.from({ length: 7 }).map((_, index) => (
                    <ProductCard
                        key={index}
                        id={`productId-${index}`}
                        name="Product Name"
                        description="Product Description"
                        commentsCount={12}
                        viewsCount={12}
                        votesCount={120}
                    />
                ))}
                <Button variant="link" asChild className="text-lg p-0 self-center">
                    <Link to="/products/leaderboards/monthly">
                        Explore all products &rarr;
                    </Link>
                </Button>
            </div>

            {/* Yearly */}
            <div className="grid grid-cols-3 gap-4">
                <div>
                    <h2 className="text-3xl font-bold leading-tight tracking-tight">
                        Yearly Leaderboard
                    </h2>
                    <p className="text-xl font-light text-foreground">
                        The most popular products on WeMaKe by year.
                    </p>
                </div>
                {Array.from({ length: 7 }).map((_, index) => (
                    <ProductCard
                        key={index}
                        id={`productId-${index}`}
                        name="Product Name"
                        description="Product Description"
                        commentsCount={12}
                        viewsCount={12}
                        votesCount={120}
                    />
                ))}
                <Button variant="link" asChild className="text-lg p-0 self-center">
                    <Link to="/products/leaderboards/yearly">
                        Explore all products &rarr;
                    </Link>
                </Button>
            </div>
        </div>
    );
}