import { type RouteConfig, index, route } from "@react-router/dev/routes";

/**
 * routes.ts 파일은 React router가 웹사이트에 어떤 페이지가 있는지 확인하는 곳(사용자가 이동할 수 있는 URL)
 * */

export default [
    index("routes/home.tsx"),
    route("/about", "potato/tomato.tsx"),
] satisfies RouteConfig;
