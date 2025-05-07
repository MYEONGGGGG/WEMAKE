import { type RouteConfig, index, prefix, route } from "@react-router/dev/routes";

/**
 * routes.ts 파일은 React router가 웹사이트에 어떤 페이지가 있는지 확인하는 곳(사용자가 이동할 수 있는 URL)
 * */

export default [
    index("common/pages/home-page.tsx"),
    ...prefix("products", [

        index("features/products/pages/product-page.tsx"),
        ...prefix("leaderboards", [
            index("features/products/pages/leaderboard-page.tsx"),
            route(
                "/yearly/:year",
                "features/products/pages/yearly-leaderboard-page.tsx"
            ),
            route(
                "/monthly/:year/:month",
                "features/products/pages/monthly-leaderboard-page.tsx"
            ),
            route(
                "/daily/:year/:month/:day",
                "features/products/pages/daily-leaderboard-page.tsx"
            ),
            route(
                "/weekly/:year/:week",
                "features/products/pages/weekly-leaderboard-page.tsx"
            ),
            route(
                "/:period",
                "features/products/pages/leaderboards-redirection-page.tsx",
            ),
        ]),

        ...prefix("categories", [
            index("features/products/pages/categories-page.tsx"),
            route("/:category", "features/products/pages/category-page.tsx"),
        ]),

        route("/search", "features/products/pages/search-page.tsx"),
        route("/submit", "features/products/pages/submit-page.tsx"),

        route("/promote", "features/products/pages/promote-page.tsx"),
        ...prefix("/:productId", [
            index("features/products/pages/product-redirect-page.tsx"),
            route(
                "/overview",
                "features/products/pages/product-overview-page.tsx"
            ),
            ...prefix("/reviews", [
                index("features/products/pages/product-reviews-page.tsx"),
                route("/new", "features/products/pages/new-product-review-page.tsx"),
            ]),
        ]),
    ])
] satisfies RouteConfig;
