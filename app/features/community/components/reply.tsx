import { DotIcon, MessageCircleIcon } from "lucide-react";
import { DateTime } from "luxon";
import { useEffect, useState } from "react";
import { Form, Link, useActionData, useOutletContext } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";
import { cn } from "~/lib/utils";
import type { action } from "../pages/post-page";

interface ReplyProps {
  name: string;
  username: string;
  avatarUrl?: string | null;
  content: string;
  postedAt: string;
  topLevel?: boolean;
  parentReplyId?: number;
  replies?: {
    reply_id: number;
    reply: string;
    created_at: string;
    user: {
      name: string;
      username: string;
      avatar: string | null;
    },
  }[]
}

export function Reply({ name, username, avatarUrl, content, postedAt, topLevel, replies, parentReplyId }: ReplyProps) {
  const actionData = useActionData<typeof action>();
  const [toggleReply, setToggleReply] = useState(false);
  const toggleReplyHandler = () => {
    setToggleReply(prev => !prev);
  }
  const { isLoggedIn, name : loggedInName, avatar } = useOutletContext<{
    isLoggedIn: boolean,
    name?: string | null,
    avatar?: string | null
  }>();
  useEffect(() => {
    if (actionData?.ok) {
      setToggleReply(false);
    }
  }, [actionData?.ok]);
  return (
    <div className="space-y-5">
      <div className="flex flex-row gap-5">
        <Avatar className="size-14">
          {avatarUrl !== null && <AvatarImage src={avatarUrl} />}
          {avatarUrl === null && <AvatarFallback>{name?.charAt(0) || "U"}</AvatarFallback>}
        </Avatar>
        <div className="space-y-5 w-2/3 flex flex-col">
          <div className="flex flex-row gap-2 items-center">
            <Link to={`/users/@${username}`}>
              <h4 className="text-lg font-medium">{name}</h4>
            </Link>
            <DotIcon />
            <span className="text-xs font-normal text-muted-foreground">{DateTime.fromISO(postedAt).toRelative()}</span>
          </div>
          <p className={cn("text-sm font-normal text-muted-foreground", 
            !topLevel && "pb-10")}>{content}</p>
          {topLevel && isLoggedIn && (
            <Button variant="ghost"
              className="flex flex-row gap-1 self-end"
              onClick={toggleReplyHandler}>
            <MessageCircleIcon className="size-4 font-semibold" />
              <span className="text-sm font-semibold">Reply</span>
            </Button>
          )}
        </div>
      </div>
      {toggleReply && topLevel && (
        <Form className="flex flex-row gap-5 items-start w-3/4" method="post">
          <input type="hidden" name="parentReplyId" value={parentReplyId} />
          <Avatar className="size-14">
            {avatar !== null && <AvatarImage src={avatar} />}
            {avatar === null && <AvatarFallback>{loggedInName?.charAt(0) || "U"}</AvatarFallback>}
          </Avatar>
          <div className="flex flex-col items-end gap-5 w-full">
            <Textarea
              className="w-full resize-none"
              placeholder="Add a reply..."
              defaultValue={`@${username} `}
              rows={6}
              name="reply"
              />
            <Button type="submit">
              Reply
            </Button>
          </div>
        </Form>
      )}
      {topLevel && replies && (
        <div className="space-y-5 pl-15">
          {replies.map((reply) => (
            <Reply    
              key={reply.reply_id}
              name={reply.user.name}
              username={reply.user.username}
              avatarUrl={reply.user.avatar}
              content={reply.reply}
              postedAt={reply.created_at}
              topLevel={false}
              parentReplyId={parentReplyId}
            />
          ))}
        </div>
      )}
    </div>
  );
} 