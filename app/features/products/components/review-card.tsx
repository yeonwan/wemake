import { Star as StarIcon } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";

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
    <div className="flex flex-col gap-2 mt-10">
      <div className="flex flex-row items-center gap-2">
        <Avatar>
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>
            {username.charAt(0).toUpperCase()}
          </AvatarFallback>
        </Avatar>
        <div>
          <h4 className="text-lg font-bold">{username}</h4>
          <p className="text-sm text-muted-foreground">{postedAt}</p>
        </div>
      </div>
      <div className="flex flex-row items-center text-yellow-400">
        {Array.from({ length: 5 }).map((_, index) => (
          <StarIcon
            key={index}
            className="w-5 h-5 cursor-pointer"
            onClick={() => onRatingChange(id, index + 1)}
            fill={index < rating ? "currentColor" : "none"}
          />
        ))}
      </div>
      <p className="text-muted-foreground">{content}</p>
      <span className="text-muted-foreground text-sm">
        {(() => {
          const reviewDate = new Date(postedAt);
          const now = new Date();
          const diffTime = Math.abs(now.getTime() - reviewDate.getTime());
          const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
          const diffMonths = Math.floor(diffDays / 30);
          const diffYears = Math.floor(diffDays / 365);

          if (diffYears > 0) return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
          if (diffMonths > 0) return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
          if (diffDays > 0) return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
          return 'Today';
        })()}
      </span>
    </div>
  );
} 