import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { DotIcon, EyeIcon, HeartIcon, LockIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface IdeaCardProps {
  id: string;
  title: string;
  views: number;
  likes: number;
  timeAgo: string;
  claimed?: boolean;
}

export function IdeaCard({
  id,
  title,
  views,
  likes,
  timeAgo,
  claimed = false,
}: IdeaCardProps) {
  return (
    <Card className="hover:bg-card/50 transition-colors bg-transparent flex flex-col justify-between">
      <CardHeader>
        <Link to={`/ideas/${id}`}>
          <CardTitle className="text-md">
            <span className={cn([claimed && "bg-muted-foreground text-muted-foreground", !claimed && "line-clamp-2"])}>{title}</span>
          </CardTitle>
        </Link>
      </CardHeader>
      
      <div className="flex flex-col gap-4">
        <CardContent className="flex gap-4 text-sm text-muted-foreground pt-0">
          <div className="flex items-center gap-1">
            <EyeIcon className="size-4" />
            <span>{views}</span>  
          </div>
          <div className="flex items-center gap-1">
            <DotIcon className="size-4" />
            <span>{timeAgo}</span>
          </div>
        </CardContent>

        <CardFooter className="flex justify-end gap-2 pt-0">
          <Button variant="outline" className="gap-2">
            <HeartIcon className="size-4" />
            <span>{likes}</span>
          </Button>
          {claimed ? (
            <Button variant="outline" disabled>
              <LockIcon className="size-4" />
              <span>Claimed</span>
            </Button>
          ) : (
            <Button asChild>
              <Link to={`/ideas/${id}/claim`}>Claim idea now &rarr;</Link>
            </Button>
          )}
        </CardFooter>
      </div>
    </Card>
  );
} 