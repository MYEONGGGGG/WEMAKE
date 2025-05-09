import type { Route } from "./+types/submit-post-page";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Start Social | WeMaKe" }
    ];
};

export default function submitPostPage() {
    return (
        <div>
            submitPostPage
        </div>
    );
}