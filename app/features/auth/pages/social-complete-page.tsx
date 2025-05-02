import { useParams } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";

export function meta() {
  return [
    { title: "Authentication Complete | WeMake" },
    { name: "description", content: "Completing social authentication" },
  ];
}

export default function SocialCompletePage() {
  const { provider } = useParams();

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Almost there...</CardTitle>
        <CardDescription>
          Completing authentication with {provider}
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </CardContent>
    </Card>
  );
} 