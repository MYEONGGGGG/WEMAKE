import type { Route } from "./+types/profile-posts-page";
import { PostCard } from "~/features/community/components/post-card";


export const meta: Route.MetaFunction = () => {
    return [
        { title: "Profile posts page | WeMaKe" }
    ];
};

export default function profilePostsPage() {
    return(
        <div className="flex flex-col gap-5">
            {Array.from({length: 5}, (_, index) => (
                <PostCard
                    key={`productId-${index}`}
                    id={`productId-${index}`}
                    title="What is the best way to learn React?"
                    author="Steve Jobs"
                    authorAvatarUrl="https://github.com/apple.png"
                    category="Programming"
                    postedAt="8 hours ago"
                    expanded
                />
            ))}
        </div>
    );
}