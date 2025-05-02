import { Link } from "react-router";
import { ChevronRightIcon } from "lucide-react";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "~/common/components/ui/card";

interface CategoryCardProps {
  id: string;
  name: string;
  description: string;
}

export function CategoryCard({ id, name, description }: CategoryCardProps) {
  return (
    <Link to={`/products/categories/${id}`}>
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            {name}
            <ChevronRightIcon className="w-4 h-4" />
          </CardTitle>
          <CardDescription className="text-base">
            {description}
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
} 