import type { Route } from "./+types/leaderboard-page";
import { Hero } from "~/common/components/hero";
import { Button } from "~/common/components";
import { Link } from "react-router";
import { ProductCard } from "~/features/products/components/product-card";
import { getProductsByDateRange } from "~/features/products/queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";

export const meta : Route.MetaFunction = () => {
    return [
        { title: "Leaderboards | WeMaKe" },
        { name: "description", content: "Top products leaderboard" }
    ];
}

/**
 * # 개념 정리
 *   - loader 란?
 *     "백엔드 API로 부터 데이터를 가져오는 함수"
 *     (React Router, Remix 등에서 사용되는 방식)
 *
 *     getProductsByDateRange() 라는 백엔드 요청 함수를 통해
 *     일별/주별/월별/연별의 제품 목록을 7개씩(*limit) 병렬로 받아와서
 *     그 결과를 객체로 반환한다.
 *
 *     => 데이터를 조회 + 정리하여 UI 컴포넌트로 넘겨주기 위한 역할을 수행함.
 * */
export const loader = async ({request}: Route.LoaderArgs) => {
    const { client, headers } = makeSSRClient(request);
    const [dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts] = await Promise.all([
        getProductsByDateRange(client, {
            startDate: DateTime.now().startOf("day"),
            endDate: DateTime.now().endOf("day"),
            limit: 7,
        }),
        getProductsByDateRange(client, {
            startDate: DateTime.now().startOf("week"),
            endDate: DateTime.now().endOf("week"),
            limit: 7,
        }),
        getProductsByDateRange(client, {
            startDate: DateTime.now().startOf("month"),
            endDate: DateTime.now().endOf("month"),
            limit: 7,
        }),
        getProductsByDateRange(client, {
            startDate: DateTime.now().startOf("year"),
            endDate: DateTime.now().endOf("year"),
            limit: 7,
        }),
    ]);

    return { dailyProducts, weeklyProducts, monthlyProducts, yearlyProducts };
};

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
                {loaderData.dailyProducts.map((product) => (
                    <ProductCard
                        key={product.product_id}
                        id={product.product_id}
                        name={product.name}
                        description={product.tagline}
                        reviewsCount={product.reviews}
                        viewsCount={product.views}
                        votesCount={product.upvotes}
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
                {loaderData.weeklyProducts.map((product) => (
                    <ProductCard
                        key={product.product_id}
                        id={product.product_id}
                        name={product.name}
                        description={product.tagline}
                        reviewsCount={product.reviews}
                        viewsCount={product.views}
                        votesCount={product.upvotes}
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
                {loaderData.monthlyProducts.map((product) => (
                    <ProductCard
                        key={product.product_id}
                        id={product.product_id}
                        name={product.name}
                        description={product.tagline}
                        reviewsCount={product.reviews}
                        viewsCount={product.views}
                        votesCount={product.upvotes}
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
                {loaderData.yearlyProducts.map((product) => (
                    <ProductCard
                        key={product.product_id}
                        id={product.product_id}
                        name={product.name}
                        description={product.tagline}
                        reviewsCount={product.reviews}
                        viewsCount={product.views}
                        votesCount={product.upvotes}
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