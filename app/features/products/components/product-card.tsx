import { Card, CardHeader, CardTitle, CardDescription, CardFooter } from "~/common/components/ui/card";
import { ChevronUpIcon, EyeIcon, MessageCircleIcon } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  commentsCount?: number;
  viewsCount?: number;
  upvotes?: number;
}

export function ProductCard({
  id,
  name,
  description,
  commentsCount = 0,
  viewsCount = 0,
  upvotes = 0,
}: ProductCardProps) {
  return (
    <Link to={`/products/${id}`} className="block hover:shadow-lg transition">
      <Card className="flex flex-row items-start justify-between p-6 bg-transparent hover:bg-card/50">
        <CardHeader className="space-y-4 p-0 flex-1">
          <div>
            <CardTitle className="text-xl font-semibold leading-none tracking-tight whitespace-nowrap">
              {name}
            </CardTitle>
            <CardDescription className="text-muted-foreground text-sm mt-2">
              {description}
            </CardDescription>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-px text-muted-foreground text-xs">
              <MessageCircleIcon className="w-4 h-4" />
              <span className="ml-1">{commentsCount}</span>
            </div>
            <div className="flex items-center gap-px text-muted-foreground text-xs">
              <EyeIcon className="w-4 h-4" />
              <span className="ml-1">{viewsCount}</span>
            </div>
          </div>
        </CardHeader>
        <CardFooter className="p-0 self-start">
          <Button variant="outline" className="flex h-14">
            <ChevronUpIcon className="size-4 shrink-0" />
            <span className="text-sm font-medium">{upvotes}</span>
          </Button>
        </CardFooter>
      </Card>
    </Link>
  );
}