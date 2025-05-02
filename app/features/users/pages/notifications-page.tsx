import type { MetaFunction } from "react-router";
import { NotificationCard } from "../components/notification-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Notifications | WeMake" },
    { name: "description", content: "View your notifications" },
  ];
};

export default function NotificationsPage() {
  return (
    <div className="space-y-20">
      <h1 className="text-4xl font-bold">Notifications</h1>
      <div className="flex flex-col gap-5 items-start">
        <NotificationCard
          avatarUrl="https://github.com/yeonwan.png"
          avatarFallback="S"
          name="John Doe"
          action="followed you."
          timeAgo="2 hours ago"
          seen={false}
        />
      </div>
    </div>
  );
} 