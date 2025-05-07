import {
    Button,
    Dialog,
    DialogTrigger
} from "~/common/components";
import { ReviewCard } from "~/features/products/components/review-card";
import { CreateReviewDialog } from "~/features/products/components/create-review-dialog";

export function meta() {
    return [
        { title: "Product Reviews | WeMaKe" },
        { name: "description", content: "Read and write product reviews" },
    ];
}

export default function ProductReviewsPage() {
    return (
        <Dialog>
            <div className="space-y-10 max-w-xl">
                <div className="flex justify-between items-center">
                    <h2 className="text-2xl font-bold">10 Reviews</h2>
                    <DialogTrigger>
                        <Button variant={"secondary"}>Write a review</Button>
                    </DialogTrigger>
                </div>

                {/* Review Card */}
                <div className="space-y-20">
                    {Array.from({ length: 10 }).map((_, index) => (
                        <ReviewCard
                            key={index}
                            username="John Doe"
                            handle="@username"
                            avatarUrl="https://github.com/facebook.png"
                            rating={5}
                            content="Lorem ipsum dolor sit amot consectetur adipiscing elit, sed do.
                        Lorem ipsum dolor sit amot consectetur adipiscing elit, sed do.
                        Lorem ipsum dolor sit amot consectetur adipiscing elit, sed do."
                            postedAt="10 days ago"
                        />
                    ))}
                </div>
            </div>

            <CreateReviewDialog />
        </Dialog>
    );
}