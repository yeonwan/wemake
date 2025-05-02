import { StarIcon } from "lucide-react";
import { useState } from "react";
import { Form } from "react-router";
import { InputPair } from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "~/common/components/ui/dialog";
import { Label } from "~/common/components/ui/label";
import { cn } from "~/lib/utils";

export default function CreateReviewDialog() {
    const [hover, setHover] = useState(0);
    const [rating, setRating] = useState(0);
    return (
        <DialogContent>
            <DialogHeader>
                <DialogTitle>What do you think of this product?</DialogTitle>
                <DialogDescription>
                    Share your thoughts with other customers
                </DialogDescription>
            </DialogHeader>
            <Form className="space-y-4">
                <Label className="flex flex-col gap-1 items-start">
                    Rating{" "}
                    <small className="text-muted-foreground">
                        What would you rate this product?
                    </small>
                </Label>
                <div className="flex gap-2">
                    {[1, 2, 3, 4, 5].map((star) => (
                        <label
                            key={star}
                            className="relative"
                            onMouseEnter={() => setHover(star)}
                            onMouseLeave={() => setHover(0)}
                        >
                            <StarIcon
                                className="w-5 h-5 text-yellow-400 transition-all duration-300"
                                fill={
                                    star <= hover || star <= rating
                                        ? "currentColor" : "none"
                                }
                            />
                            <input
                                type="radio"
                                name="rating"
                                value={star}
                                required
                                className="sr-only"
                                onChange={() => setRating(star)}
                            />
                        </label>
                    ))}
                </div>
                <InputPair
                    textArea
                    required
                    placeholder="Write your review here..."
                    label="Review"
                    description="What did you think of this product?"

                />
                <DialogFooter>
                    <Button type="submit">Submit review</Button>
                </DialogFooter>
            </Form>

        </DialogContent>
    )
}