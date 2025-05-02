import { ChevronUp, StarIcon } from "lucide-react";
import { Link, NavLink, Outlet } from "react-router";
import { Button, buttonVariants } from "~/common/components/ui/button";
import { cn } from "~/lib/utils";

export default function ProductOverviewLayout({ params: { productId } }: { params: { productId: string } }) {
    return (
        <div className="space-y-10">
            <div className="flex justify-between">
                <div className="flex gap-10">
                    <div className="size-40 rounded-xl shadow-xl bg-primary/50"></div>
                    <div className="flex flex-col">
                        <h1 className="text-5xl font-bold">Product Name</h1>
                        <p className="text-2xl text-muted-foreground">Product Description</p>
                        <div className="flex flex-row items-center gap-2 mt-5">
                            <div className="flex flex-row items-center text-yellow-400">
                                {Array.from({ length: 5 }).map((_, index) => (
                                    <StarIcon key={index} className="w-5 h-5" fill="currentColor" />
                                ))}

                            </div>
                            <span className="text-muted-foreground">100 reviews</span>
                        </div>
                    </div>
                </div>

                <div className="flex flex-row gap-2">
                    <Button variant="secondary" size="lg" className="text-lg h-14 px-10">Visit Website</Button>
                    <Button size="lg" className="text-lg h-14 px-10">
                        <ChevronUp className="w-4 h-4" />
                        Upvote(100)
                    </Button>
                </div>
            </div>
            <div className="flex flex-row gap-2.5">
                <NavLink
                    to={`/products/${productId}/overview`}
                    className={({ isActive }) => cn(
                        buttonVariants({ variant: "outline" }),
                        isActive ? "bg-accent text-foreground" : "text-md"
                    )}
                >
                    Overview
                </NavLink>
                <NavLink
                    to={`/products/${productId}/reviews`}
                    className={({ isActive }) => cn(
                        buttonVariants({ variant: "outline" }),
                        isActive ? "bg-accent text-foreground" : "text-md"
                    )}
                >
                    Reviews
                </NavLink>
            </div>
            <Outlet />
        </div>
    )
}
