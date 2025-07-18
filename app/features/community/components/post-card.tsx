import { Card, CardHeader, CardTitle, CardFooter } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Link } from "react-router";
import { ChevronUpIcon, DotIcon } from "lucide-react";
import { cn } from "~/lib/utils";
import { DateTime } from "luxon";

interface PostCardProps {
  id: string;
  title: string;
  author: string;
  avatarUrl?: string | null;
  category: string;
  postedAt: string;
  expanded?: boolean;
  upvotes?: number;
}

export function PostCard({
  id,
  title,
  author,
  avatarUrl,
  category,
  postedAt,
  expanded = false,
  upvotes = 0,
}: PostCardProps) {
  return (
    <Link to={`/community/${id}`} className="block" key={id}>
      <Card className={cn("bg-transparent hover:bg-card/50 transition-colors", 
        expanded ? "flex flex-row items-center justify-between" : "")}>
        <CardHeader className="flex items-center gap-3 flex-1 min-w-0">
          <Avatar className="size-14">
            {avatarUrl ? (
              <AvatarImage src={avatarUrl} />
            ) : (
              <AvatarFallback>{author.charAt(0).toUpperCase()}</AvatarFallback>
            )}
          </Avatar>
          <div className="space-y-2 w-0 flex-1 min-w-0">
            <CardTitle className="truncate">{title}</CardTitle>
            <div className="flex flex-row gap-1 text-sm leading-tight text-muted-foreground truncate">
              <span className="">{author} on</span>
              <span className="">{category}</span>
              <DotIcon className="size-4" />
              <span className="">{DateTime.fromISO(postedAt).toRelative()}</span>
            </div>
          </div>
        </CardHeader>
        {!expanded && (
          <CardFooter className="flex justify-end">
            <Button variant="link"> Reply &rarr; </Button>
          </CardFooter>
        )}
        {expanded && (
          <CardFooter className="flex justify-end pt-0 pb-0">
            <Button variant="outline" className="flex flex-col items-center gap-1 h-14">
              <ChevronUpIcon className="size-4" />
              <span className="text-sm font-medium">{upvotes}</span>
            </Button>
          </CardFooter>
        )}
      </Card>
    </Link>
  );
} 