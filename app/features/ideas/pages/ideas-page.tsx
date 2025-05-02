import { Plus } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Dialog, DialogTrigger } from "~/common/components/ui/dialog";
import CreateIdeaDialog from "../components/create-idea-dialog";
import { useState } from "react";
import { Hero } from "~/common/components/hero";
import { IdeaCard } from "../components/idea-card";

interface Idea {
    id: string;
    title: string;
    description: string;
    author: string;
    createdAt: string;
}

export function meta() {
    return [
        { title: "IdeasGPT | WeMake" },
        { name: "description", content: "Explore your ideas with IdeasGPT" },
    ];
}

export default function IdeasPage() {
    return (
        <div>
            <Hero title="IdeasGPT" description="Explore your ideas with IdeasGPT" />
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                {Array.from({ length: 6 }).map((_, index) => (
                    <IdeaCard
                        id={`ideaId-${index}`}
                        title="A startup that creates an AI-powered generated personal trainer, delivering customized fitness plans based on users' goals and preferences."
                        views={123}
                        likes={12}
                        timeAgo="12 hours ago"
                        claimed={index % 2 === 0}
                    />
                ))}
            </div>
        </div>
    );
} 