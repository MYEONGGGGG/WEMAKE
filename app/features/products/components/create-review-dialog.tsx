import {
    Button,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    Label
} from "~/common/components";
import InputPair from "~/common/components/input-pair";
import { Form } from "react-router";
import { StarIcon } from "lucide-react";
import { useState } from "react";

export function CreateReviewDialog() {
    const [rating, setRating] = useState<number>(0);
    const [hoveredStar, setHoveredStar] = useState<number>(0);

    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle className="text-2xl">
                    What do you think of this product?
                </DialogTitle>
                <DialogDescription>
                    Share your thoughts and feedback with the product.
                </DialogDescription>
            </DialogHeader>

            <Form className="space-y-10">
                <div>
                    <Label className="flex flex-col gap-1">
                        Rating
                        <small className="text-muted-foreground">
                            What would you rate this product?
                        </small>
                    </Label>
                    <div className="flex gap-2 mt-5">
                        {[1, 2, 3, 4, 5].map((star) => (
                            <label
                                key={star}
                                className="relative"
                                onMouseEnter={() => setHoveredStar(star)}
                                onMouseLeave={() => setHoveredStar(0)}
                            >
                                <StarIcon
                                    className="size-5 text-yellow-400"
                                    fill={
                                    hoveredStar >= star || rating >= star
                                        ? "currentColor"
                                        : "none"
                                }
                                />
                                <input
                                    className="opacity-0 h-px w-px absolute"
                                    type="radio"
                                    name="rating"
                                    value={star}
                                    required
                                    onChange={() => setRating(star)}
                                />
                            </label>
                        ))}
                    </div>
                </div>

                <InputPair
                    label="Review"
                    placeholder="Tell us more about your experience with this product"
                    description="Maximun 1000 characters"
                    textArea
                    required
                />

                <DialogFooter>
                    <Button type="submit">Submit review</Button>
                </DialogFooter>
            </Form>
        </DialogContent>
    );
}