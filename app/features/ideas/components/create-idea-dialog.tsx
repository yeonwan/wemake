import { Button } from "~/common/components/ui/button";
import {
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "~/common/components/ui/dialog";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { Textarea } from "~/common/components/ui/textarea";

export default function CreateIdeaDialog() {
  return (
    <DialogContent className="sm:max-w-[425px]">
      <DialogHeader>
        <DialogTitle>Create New Idea</DialogTitle>
        <DialogDescription>
          Share your innovative idea with the community.
        </DialogDescription>
      </DialogHeader>
      <div className="grid gap-4 py-4">
        <div className="grid gap-2">
          <Label htmlFor="title">Title</Label>
          <Input id="title" placeholder="Enter your idea title" />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="description">Description</Label>
          <Textarea
            id="description"
            placeholder="Briefly describe your idea"
            className="h-20"
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="content">Content</Label>
          <Textarea
            id="content"
            placeholder="Detailed explanation of your idea"
            className="h-40"
          />
        </div>
      </div>
      <DialogFooter>
        <Button type="submit">Create Idea</Button>
      </DialogFooter>
    </DialogContent>
  );
} 