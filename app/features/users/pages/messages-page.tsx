import type { MetaFunction } from "react-router";
import { MessageCircleIcon } from "lucide-react";
export const meta: MetaFunction = () => {
  return [
    { title: "Messages | WeMake" },
    { name: "description", content: "View your messages" },
  ];
};

export default function MyMessagesPage() {
  return (
    <div className="flex flex-col items-center justify-center h-full w-full gap-4">
      <MessageCircleIcon className="size-12 text-muted-foreground" />
      <h1 className="text-xl font-semibold text-muted-foreground">Click on a message in the sidebar to start chatting</h1>
    </div>
  );
} 