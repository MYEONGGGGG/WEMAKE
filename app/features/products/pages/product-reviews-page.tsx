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
import { makeSSRClient } from "~/supa-client";
import { useEffect, useState } from "react";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { createProductReview } from "~/features/products/mutations";

export function meta() {
    return [
        { title: "Product Reviews | WeMaKe" },
        { name: "description", content: "Read and write product reviews" },
    ];
};

const formSchema = z.object({
    review: z.string().min(1),
    rating: z.coerce.number().min(1).max(5),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
    const { client, headers } = makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const formData = await request.formData();
    const { success, error, data } = formSchema.safeParse(
        Object.fromEntries(formData)
    );
    if (!success) {
        return {
            formErrors: error.flatten().fieldErrors,
        };
    }
    await createProductReview(client, {
        productId: params.productId,
        review: data.review,
        rating: data.rating,
        userId,
    });
    return {
        ok: true,
    };
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
    const { client, headers } = makeSSRClient(request);
    const reviews = await getReviews(client, { productId: params.productId });
    return { reviews };
};

export default function ProductReviewsPage({
    loaderData,
    actionData,
}: Route.ComponentProps) {
    const { review_count } = useOutletContext<{
        review_count: string;
    }>();

    const [open, setOpen] = useState(false);
    useEffect(() => {
        if (actionData?.ok) {
            setOpen(false);
        }
    }, [actionData]);

    return (
        <Dialog open={open} onOpenChange={setOpen}>
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