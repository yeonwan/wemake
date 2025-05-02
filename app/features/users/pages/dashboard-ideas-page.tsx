import type { MetaFunction } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { IdeaCard } from "~/features/ideas/components/idea-card";

export const meta: MetaFunction = () => {
  return [
    { title: "My Ideas | WeMake" },
    { name: "description", content: "View and manage your ideas" },
  ];
};

export default function MyDashboardIdeasPage() {
  return (
    <div className="space-y-20 h-full">
      <h1 className="text-2xl font-semibold mb-6">Claimed Ideas</h1>
      <div className="grid grid-cols-3 gap-5">
        {Array.from({ length: 6 }).map((_, index) => (
          <IdeaCard
            id={`ideaId-${index}`}
          title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness plans based on users' goals and preferences."
          views={123}
          likes={12}
          timeAgo="12 hours ago"
           
          />
        ))}
      </div>
    </div>
  );
} 