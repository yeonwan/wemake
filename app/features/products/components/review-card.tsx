import { Star as StarIcon } from "lucide-react";
import { DateTime } from "luxon";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Card, CardContent } from "~/common/components/ui/card";
import { cn } from "~/lib/utils";

interface ReviewCardProps {
  id: string;
  username: string;
  avatarUrl: string;
  postedAt: string;
  content: string;
  rating: number;
  onRatingChange: (id: string, newRating: number) => void;
}

export function ReviewCard({ id, username, avatarUrl, postedAt, content, rating, onRatingChange }: ReviewCardProps) {
  return (
    <Card className="w-full transition-all duration-200 hover:shadow-md">
      <CardContent className="pt-1">
        <div className="flex flex-col gap-4">
          {/* Header: Avatar, Username, and Date */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-3">
              <Avatar className="border-2 border-primary/10">
                <AvatarImage src={avatarUrl} />
                <AvatarFallback className="bg-primary/5">
                  {username.charAt(0).toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="flex flex-col">
                <h4 className="font-semibold tracking-tight">{username}</h4>
                <time className="text-sm text-muted-foreground">
                  {DateTime.fromISO(postedAt).toRelative()}
                </time>
              </div>
            </div>
            
            {/* Rating Stars */}
            <div className="flex items-center gap-0.5">
              {Array.from({ length: 5 }).map((_, index) => (
                <StarIcon
                  key={index}
                  className={cn(
                    "w-5 h-5 transition-all duration-200 cursor-pointer hover:scale-110",
                    index < rating ? "text-yellow-400" : "text-muted-foreground/25"
                  )}
                  onClick={() => onRatingChange(id, index + 1)}
                  fill={index < rating ? "currentColor" : "none"}
                />
              ))}
            </div>
          </div>

          {/* Review Content */}
          <div className="pl-3 ">
            <p className="text-card-foreground leading-relaxed">{content}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
} 