import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardHeader } from "~/common/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Hero } from "~/common/components/hero";
import { EyeIcon, HeartIcon } from "lucide-react";
import { DotIcon } from "lucide-react";



export const meta = () => {
  return [
    { title: "Idea Details | WeMake" },
    { name: "description", content: "View and discuss idea details" },
  ];
}

export default function IdeaPage({ params: { ideaId } }: { params: { ideaId: string } }) {

  return (
    <div>
      <Hero
        title={`Idea #${ideaId}`}
      />
      <div className="flex flex-col max-w-screen-sm mx-auto p-6  gap-10">
        <p>
          "A startup that creates an AI-powered generated personal trainer, delivering customized fitness plans based on users' goals and preferences."
        </p>
        <div className="flex items-center gap-1">
          <div className="flex gap-1 text-sm">
            <EyeIcon className="size-4" />
            <span>123</span>
          </div>
          <DotIcon className="size-4" />
          <span>12 hours ago</span>
          <DotIcon className="size-4" />
          <Button variant="outline" className="gap-2">
            <HeartIcon className="size-4" />
            <span>12</span>
          </Button>
        </div>
        <div>
          <Button size="lg">
            Claim idea now &rarr;
          </Button>
        </div>
      </div>
    </div>
  );
} 