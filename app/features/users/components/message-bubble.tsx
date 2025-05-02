import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { cn } from "~/lib/utils";

interface MessageBubbleProps {
  avatarUrl?: string;
  avatarFallback: string;
  message: string;
  isCurrentUser?: boolean;
}

export function MessageBubble({ 
  avatarUrl, avatarFallback, message, isCurrentUser=false 
}: MessageBubbleProps) {
  return (
    <div className={cn("flex items-start gap-2",
      isCurrentUser && "flex-row-reverse")}>
      <Avatar>
        <AvatarImage src={avatarUrl} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>
      <div className={cn("text-sm rounded-md p-4 w-1/3",
        !isCurrentUser && "bg-primary/20", isCurrentUser && "bg-accent rounded-br-none")}>
        <p>{message}</p>
      </div>
    </div>
  );
} 