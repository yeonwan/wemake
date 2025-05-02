import { useParams } from "react-router";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "~/common/components/ui/card";

export function meta() {
  return [
    { title: "Social Authentication | WeMake" },
    { name: "description", content: "Redirecting to social authentication provider" },
  ];
}

export default function SocialStartPage() {
  const { provider } = useParams();

  return (
    <Card>
      <CardHeader className="space-y-1">
        <CardTitle className="text-2xl">Redirecting...</CardTitle>
        <CardDescription>
          You are being redirected to {provider} for authentication
        </CardDescription>
      </CardHeader>
      <CardContent className="flex justify-center">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-primary border-t-transparent" />
      </CardContent>
    </Card>
  );
} 