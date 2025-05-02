import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { EyeIcon } from "lucide-react";
import { cn } from "~/lib/utils";

interface NotificationCardProps {
  avatarUrl: string;
  avatarFallback: string;
  name: string;
  action: string;
  timeAgo: string;
  seen?: boolean;
  onMarkAsRead?: () => void;
}

export function NotificationCard({
  avatarUrl,
  avatarFallback,
  name,
  action,
  timeAgo,
  seen = false,
  onMarkAsRead,
}: NotificationCardProps) {
  return (
    <Card className={cn("min-w-[450px]", seen ? "" : "bg-yellow-500/60")}>
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="size-12">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>
        <div className="flex-1">
          <CardTitle className="text-xl font-bold">
            <span>{name}</span>
            <span>{" "}{action}</span>
          </CardTitle>
          <p className="text-muted-foreground">{timeAgo}</p>
        </div>
      </CardHeader>
      <CardFooter className="flex justify-end">
        <Button variant="outline" size="icon" onClick={onMarkAsRead}>
          <EyeIcon className="size-4" />
        </Button>
      </CardFooter>
    </Card>
  );
} 