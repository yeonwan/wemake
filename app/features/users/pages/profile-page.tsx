import type { MetaFunction } from "react-router";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";

export const meta: MetaFunction = ({ params }) => {
  return [
    { title: `${params.username}'s Profile | WeMake` },
    { name: "description", content: `View ${params.username}'s profile` },
  ];
};

export default function ProfilePage() {
  return (
    <div className="flex flex-col gap-10 max-w-screen-md">
      <div className="space-y-2">
        <h4 className="text-lg font-bold">Headline</h4>
        <p className="text-muted-foreground">
          I'm a product designer based in San Francisco. I'm passionate about creating products that are easy to use and help people.
        </p>
      </div>
      <div className="space-y-2">
        <h4 className="text-lg font-bold">About</h4>
        <p className="text-muted-foreground">
          I'm a product designer based in San Francisco. I'm passionate about creating products that are easy to use and help people.
        </p>
      </div>
    </div>
  )
} 