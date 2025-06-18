import { Plus } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { ReviewCard } from "../components/review-card";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import CreateReviewDialog from "../components/create-review-dialog";
import { useOutletContext } from "react-router";
import type { Route } from "./+types/product-reviews-page";
import { getReviewsByProductId } from "../queries";
import { makeSSRClient } from "~/supa-client";


export function meta() {
  return [
    { title: "Product Reviews | WeMake" },
    { name: "description", content: "Read and explore product reviews" },
  ];
}

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const reviews = await getReviewsByProductId(client, { productId: Number(params.productId) });
  return { reviews };
}

export default function ProductReviewsPage({ loaderData }: Route.ComponentProps) {
  const { review_count } = useOutletContext<{ review_count: number }>();
  const { reviews } = loaderData;

  return (
    <Dialog>
      <div className="space-y-10 max-w-xl">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-2xl font-bold">{review_count} Reviews</h1>
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
              key={review.review_id}
              id={review.review_id.toString()}
              username={review.user.username}
              avatarUrl={review.user.avatar ?? ""}
              postedAt={review.created_at}
              content={review.review}
              rating={review.rating} 
              onRatingChange={() => {}}
            />
          ))}
        </div>
      </div>
      <CreateReviewDialog />
    </Dialog>
  )
} 