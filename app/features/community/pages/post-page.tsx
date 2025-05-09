import type { Route } from "./+types/post-page";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Start Social | WeMaKe" }
    ];
};

export default function postPage() {
    return (
        <div>
            postPage
        </div>
    );
}