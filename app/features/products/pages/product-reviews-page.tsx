import { Plus } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { ReviewCard } from "../components/review-card";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import CreateReviewDialog from "../components/create-review-dialog";
import { useState } from "react";

interface Review {
    id: string;
    username: string;
    avatarUrl: string;
    postedAt: string;
    content: string;
    rating: number;
}

export function meta() {
    return [
        { title: "Product Reviews | WeMake" },
        { name: "description", content: "Read and explore product reviews" },
    ];
}

export default function ProductReviewsPage({ params: { productId } }: { params: { productId: string } }) {
    const [reviews, setReviews] = useState([
        {
            id: "1",
            username: "John Doe",
            avatarUrl: "https://github.com/elonmusk.png",
            postedAt: "2021-01-01",
            content: "This product is great!",
            rating: 5
        },
        {
            id: "2",
            username: "Jane Doe",
            avatarUrl: "https://github.com/elonmusk.png",
            postedAt: "2021-01-02",
            content: "This product is good!",
            rating: 4
        },
        {
            id: "3",
            username: "John Doe",
            avatarUrl: "https://github.com/elonmusk.png",
            postedAt: "2021-01-03",
            content: "This product is bad!",
            rating: 1
        }
    ]);

    const handleRatingChange = (id: string, newRating: number) => {
        setReviews(reviews.map(review => 
            review.id === id ? { ...review, rating: newRating } : review
        ));
    };

    return (
        <Dialog>
            <div className="space-y-10 max-w-xl">
                <div className="flex flex-row justify-between items-center">
                    <h1>10 Reviews</h1>
                    <DialogTrigger asChild>
                        <Button variant={"secondary"} >
                            <Plus />
                            Write a Review
                        </Button>
                    </DialogTrigger>
                </div>
                <div>
                    {reviews.map((review) => (
                        <ReviewCard
                            key={review.id}
                            id={review.id}
                            username={review.username}
                            avatarUrl={review.avatarUrl}
                            postedAt={review.postedAt}
                            content={review.content}
                            rating={review.rating}
                            onRatingChange={handleRatingChange}
                        />
                    ))}
                </div>
            </div>
            <CreateReviewDialog />
        </Dialog>
    )
} 