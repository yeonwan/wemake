import { DotIcon, MessageCircleIcon } from "lucide-react";
import { useState } from "react";
import { Form, Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";

interface ReplyProps {
  username: string;
  avatarUrl?: string;
  content: string;
  postedAt: string;
  topLevel?: boolean;
}

export function Reply({ username, avatarUrl, content, postedAt, topLevel }: ReplyProps) {
  const [toggleReply, setToggleReply] = useState(false);
  const toggleReplyHandler = () => {
    setToggleReply(prev => !prev);
  }
  return (
    <div className="space-y-5">
      <div className="flex flex-row gap-5">
        <Avatar className="size-14">
          <AvatarImage src={avatarUrl} />
          <AvatarFallback>{username[0]}</AvatarFallback>
        </Avatar>
        <div className="space-y-5 w-2/3 flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            <Link to={`/users/@${username}`}>
              <h4 className="text-lg font-medium">{username}</h4>
            </Link>
            <DotIcon />
            <span className="text-xs font-normal text-muted-foreground">{postedAt}</span>
          </div>
          <p className="text-sm font-normal text-muted-foreground">{content}</p>
          <Button variant="ghost"
            className="flex flex-row gap-1 self-end"
            onClick={toggleReplyHandler}>
            <MessageCircleIcon className="size-4 font-semibold" />
            <span className="text-sm font-semibold">Reply</span>
          </Button>
        </div>
      </div>
      {toggleReply && (
        <Form className="flex flex-row gap-5 items-start w-3/4">
          <Avatar className="size-14">
            <AvatarImage src="https://github.com/yeonwan.png" />
            <AvatarFallback>N</AvatarFallback>
          </Avatar>
          <div className="flex flex-col items-end gap-5 w-full">
            <Textarea
              className="w-full resize-none"
              placeholder="Add a reply..."
              rows={6} />
            <Button type="submit">
              Reply
            </Button>
          </div>
        </Form>
      )}
      {topLevel && (
        <div className="space-y-5 pl-15">
          <Reply
            username="yeonwan"
            avatarUrl="https://github.com/yeonwan.png"
            content="I'm looking for a productivity tool that can help me get more done. I've tried a lot of them, but I'm still not sure which one is the best."
            postedAt="12 hours ago"
          />
        </div>
      )}
    </div>
  );
} 