import { type RouteConfig, index, prefix, layout, route } from "@react-router/dev/routes";

/**
 * routes.ts 파일은
 * React router가 웹사이트에 어떤 페이지가 있는지 확인하는 곳(사용자가 이동할 수 있는 URL)
 *
 * - 구조화된 선언형 방식으로 라우팅 정의
 * @index(path: string): 루트(index) 경로를 나타내며, URL이 정확히 해당 디렉토리일 때 표시되는 페이지
 * @prefix(path: string, routes: RouteConfig[]): 경로 접두어로, 내부 라우트를 그룹핑할 수 있음. 중첩 URL 구조에 최적
 * @route(path: string, page: string): 명시적인 경로(/path)에 대응하는 단일 페이지
 * @layout(path: string, children: RouteConfig[]): 특정 구간에 Layout 컴포넌트를 적용하고, 하위 경로들을 묶을 때 사용
 *
 * - 이런 구조로 설계된 이유?
 * 1. URL 계층 구조를 선언형으로 관리하여 유지보수성을 높임
 * 2. 반복되는 레이아웃 처리("layout()"을 통해 특정 URL 계층에 공통 레이아웃 적용)
 * 3. 동적 라우팅에 대응(다양한 상세 페이지에 적합)
 * */

export default [
    // 최상위 index ("/" 경로 → 홈페이지)
    index("common/pages/home-page.tsx"),

    // "/products" 그룹 라우팅
    ...prefix("products", [
        // "/products" 경로의 index 페이지
        index("features/products/pages/product-page.tsx"),

        // "/products/leaderboards" 관련 페이지 그룹
        ...prefix("leaderboards", [
            // "/products/leaderboards" 기본 페이지
            index("features/products/pages/leaderboard-page.tsx"),
            // 연도별 순위
            route(
                "/yearly/:year",
                "features/products/pages/yearly-leaderboard-page.tsx"
            ),
            // 월별 순위
            route(
                "/monthly/:year/:month",
                "features/products/pages/monthly-leaderboard-page.tsx"
            ),
            // 일별 순위
            route(
                "/daily/:year/:month/:day",
                "features/products/pages/daily-leaderboard-page.tsx"
            ),
            // 주간 순위
            route(
                "/weekly/:year/:week",
                "features/products/pages/weekly-leaderboard-page.tsx"
            ),
            // 기타(월/일/주 외 값)에 따른 redirection 처리 용도
            route(
                "/:period",
                "features/products/pages/leaderboards-redirection-page.tsx",
            ),
        ]),

        // "/products/categories" 관련 페이지 그룹
        ...prefix("categories", [
            index("features/products/pages/categories-page.tsx"),
            route("/:category", "features/products/pages/category-page.tsx"),
        ]),

        // 개별 라우트(독립적인 페이지)
        route("/search", "features/products/pages/search-page.tsx"),
        route("/submit", "features/products/pages/submit-product-page.tsx"),
        route("/promote", "features/products/pages/promote-page.tsx"),

        // "/products/:productId" 상세 제품 페이지 (동적 라우팅 구조)
        ...prefix("/:productId", [
            // "/products/:productId" 기본 진입 시 redirection 처리 용도
            index("features/products/pages/product-redirect-page.tsx"),

            // 해당 제품 ID 하위에서 공통 레이아웃을 사용하는 영역
            layout("features/products/layouts/product-overview-layout.tsx", [
                // "/overview" 제품 개요 페이지
                route(
                    "/overview",
                    "features/products/pages/product-overview-page.tsx"
                ),

                // "/reviews" 하위 그룹: 제품 리뷰
                ...prefix("/reviews", [
                    // 리뷰 목록
                    index("features/products/pages/product-reviews-page.tsx"),
                ]),
            ]),
        ]),
    ]),

    // "/ideas" 그룹 라우팅
    ...prefix("/ideas", [
        index("features/ideas/pages/ideas-page.tsx"),
        route("/:ideaId", "features/ideas/pages/idea-page.tsx"),
    ]),

    // "/jobs" 그룹 라우팅
    ...prefix("/jobs", [
        index("features/jobs/pages/jobs-page.tsx"),
        route("/:jobId", "features/jobs/pages/job-page.tsx"),
        route("/submit", "features/jobs/pages/submit-job-page.tsx"),
    ]),

    // "/auth" 그룹 라우팅
    ...prefix("/auth", [
        layout("features/auth/layouts/auth-layout.tsx", [
            route("/login", "features/auth/pages/login-page.tsx"),
            route("/join", "features/auth/pages/join-page.tsx"),

            // "/opt" 하위 그룹
            ...prefix("/otp", [
                route("/start", "features/auth/pages/otp-start-page.tsx"),
                route("/complete", "features/auth/pages/otp-complete-page.tsx"),
            ]),

            // "/social" 하위 그룹
            ...prefix("/social/:provider", [
                route(
                    "/start",
                    "features/auth/pages/social-start-page.tsx"
                ),
                route(
                    "/complete",
                    "features/auth/pages/social-complete-page.tsx"
                )
            ]),
        ]),
    ]),

    // "/community" 그룹 라우팅
    ...prefix("/community", [
        index("features/community/pages/community-page.tsx"),
        route("/:postId", "features/community/pages/post-page.tsx"),
        route("/submit", "features/community/pages/submit-post-page.tsx"),
    ]),

    // "/teams" 그룹 라우팅
    ...prefix("/teams", [
        index("features/teams/pages/teams-page.tsx"),
        route("/:teamId", "features/teams/pages/team-page.tsx"),
        route("/create", "features/teams/pages/submit-team-page.tsx"),
    ]),

    // "/my" 그룹 라우팅
    ...prefix("/my", [
        // "/my/dashboard" 관련 페이지 그룹
        ...prefix("dashboard", [
            index("features/users/pages/dashboard-page.tsx"),
            route("/ideas", "features/users/pages/dashboard-ideas-page.tsx"),
            route("/products/:productId", "features/users/pages/dashboard-product-page.tsx"),
        ]),

        route("/profile", "features/users/pages/my-profile-page.tsx"),
        route("/settings", "features/users/pages/settings-page.tsx"),
        route("/notifications", "features/users/pages/notifications-page.tsx"),

        // "/my/messages" 관련 페이지 그룹
        ...prefix("/messages", [
            index("features/users/pages/messages-page.tsx"),
            route("/:messageId", "features/users/pages/message-page.tsx"),
        ]),
    ]),

    layout("features/users/layouts/profile-layout.tsx", [
        ...prefix("/users/:username", [
            index("features/users/pages/profile-page.tsx"),
            route("/products", "features/users/pages/profile-products-page.tsx"),
            route("/posts", "features/users/pages/profile-posts-page.tsx"),
        ]),
    ]),

] satisfies RouteConfig;
