import { ChevronUp, StarIcon } from "lucide-react";
import { Link, type LoaderFunctionArgs } from "react-router";
import { Button } from "~/common/components/ui/button";
import type { Route } from "./+types/product-overview-page";

export function meta() {
    return [
        { title: "Product Overview | WeMake" },
        { name: "description", content: "Detailed product overview and information" },
    ];
}


export default function ProductOverviewPage(
    { params: { productId } }: Route.ComponentProps) {
    return (
        <div className="space-y-10 ">

            <div className="flex flex-col gap-10">
                <div>
                    <h3 className="text-2xl font-bold">What is this product?</h3>
                    <p className="text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold">How does it work?</h3>
                    <p className="text-muted-foreground">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam, quos.</p>
                </div>
            </div>
        </div>
    );
} 