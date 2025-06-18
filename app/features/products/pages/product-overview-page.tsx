import { useOutletContext } from "react-router";
import type { Route } from "./+types/product-overview-page";
import { makeSSRClient } from "~/supa-client";

export function meta() {
    return [
        { title: "Product Overview | WeMake" },
        { name: "description", content: "Detailed product overview and information" },
    ];
}

export const loader = async ({params, request}: Route.LoaderArgs) => {
    const {client, headers} = makeSSRClient(request);
    await client.rpc("track_event", {
        event_type: "product_view",
        event_data: {
            product_id: params.productId,
        },
    });
    return {};
}

interface HowItWorks {
    steps: string[];
}

export default function ProductOverviewPage(
    { params: { productId } }: Route.ComponentProps) {
    const { description, how_it_works } = useOutletContext<{description: string, how_it_works: HowItWorks }>();
    return (
        <div className="space-y-10 ">
            <div className="flex flex-col gap-10">
                <div>
                    <h3 className="text-2xl font-bold">What is this product?</h3>
                    <p className="text-muted-foreground">{description}</p>
                </div>
                <div>
                    <h3 className="text-2xl font-bold">How does it work?</h3>
                    <ol className="list-decimal list-inside space-y-2 text-muted-foreground">
                        {how_it_works.steps.map((step, index) => (
                            <li key={index}>{step}</li>
                        ))}
                    </ol>
                </div>
            </div>
        </div>
    );
} 