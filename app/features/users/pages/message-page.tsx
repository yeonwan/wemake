import { Form, type MetaFunction } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { InputPair } from "~/common/components/input-pair";
import { Textarea } from "~/common/components/ui/textarea";
import { SendIcon } from "lucide-react";
import { MessageBubble } from "../components/message-bubble";

export const meta: MetaFunction = () => {
  return [
    { title: "Message | WeMake" },
    { name: "description", content: "View your message" },
  ];
};

export default function MyMessagePage() {
  return (
    <div className="flex flex-col justify-between h-full">
      <Card>
        <CardHeader className="flex flex-row items-center gap-4">
          <Avatar className="size-12">
            <AvatarImage src="https://github.com/shadcn.png" />
            <AvatarFallback>CN</AvatarFallback>
          </Avatar>
          <div className="flex flex-col gap-1">
            <CardTitle>John Doe</CardTitle>
            <CardDescription>2 minutes ago</CardDescription>
          </div>
        </CardHeader>
      </Card>

      <div className="py-10 overflow-y-scroll flex flex-col justify-start h-full">
        {Array.from({ length: 2 }).map((_, index) => (
          <MessageBubble
            key={index}
            avatarUrl="https://github.com/shadcn.png"
            avatarFallback="CN"
            message="this is message from user, make it long enough to see the effect and make it look like a real message"
            isCurrentUser={index % 2 === 0}
          />
        ))}

      </div>

      <Card>
        <CardHeader>
          <Form className="relative flex justify-end items-center">
            <Textarea
              className="resize-none"
              placeholder="Type your message here..."
              rows={4}
            />
            <Button
              type="submit"
              size="icon"
              className="absolute right-2 bottom-2"
            >
              <SendIcon className="size-4" />
            </Button>
          </Form>
        </CardHeader>

      </Card>
    </div>
  );
} 