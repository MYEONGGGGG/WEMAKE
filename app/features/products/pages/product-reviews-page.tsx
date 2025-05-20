import {
    Button,
    Dialog,
    DialogTrigger
} from "~/common/components";
import { ReviewCard } from "~/features/products/components/review-card";
import { CreateReviewDialog } from "~/features/products/components/create-review-dialog";
import { useOutletContext } from "react-router";
import { getReviews } from "~/features/products/queries";
import type { Route } from "./+types/product-reviews-page";

export function meta() {
    return [
        { title: "Product Reviews | WeMaKe" },
        { name: "description", content: "Read and write product reviews" },
    ];
};

export const loader = async ({ params }: Route.LoaderArgs) => {
    const reviews = await getReviews(params.productId);
    return { reviews };
};

export default function ProductReviewsPage({ loaderData }: Route.ComponentProps) {
    const { review_count } = useOutletContext<{
        review_count: string;
    }>();

    return (
        <Dialog>
            <div className="space-y-10 max-w-xl">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">
                        {review_count} {review_count === "1" ? "review" : "reviews"}
                    </h2>
                    <DialogTrigger>
                        <Button variant={"secondary"}>Write a review</Button>
                    </DialogTrigger>
                </div>

                {/* Review Card */}
                <div className="space-y-20">
                    {loaderData.reviews.map((review) => (
                        <ReviewCard
                            key={review.review_id}
                            username={review.user.name}
                            handle={review.user.username}
                            avatarUrl={review.user.avatar}
                            rating={review.rating}
                            content={review.review}
                            postedAt={review.created_at}
                        />
                    ))}
                </div>
            </div>

            <CreateReviewDialog />
        </Dialog>
    );
}