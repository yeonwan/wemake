import { ChevronUp, DotIcon, MessageCircleIcon } from "lucide-react";
import { Form, Link, type MetaFunction } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "~/common/components/ui/breadcrumb";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";
import { Reply } from "~/features/community/components/reply";

export const meta: MetaFunction = ({ params }) => {
  return [
    { title: `Post ${params.postId} | WeMake Community` },
    { name: "description", content: "View and discuss this post in our community" },
  ];
};

export default function PostPage() {
  return (
    <div className="space-y-20">
      <Breadcrumb>
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community">Community</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community?topic=productivity">Productivity</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to="/community/postId">
                What is the best productivity tool?
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-6 gap-40 items-start">
        <div className="col-span-4 space-y-10">
          <div className="flex flex-row items-start gap-10">
            <Button variant="outline" className="flex flex-col items-center gap-2 h-14">
              <ChevronUp />
              {10}
            </Button>
            <div className="space-y-20">
              <div className="space-y-2 w-full">
                <h2 className="text-2xl font-bold">
                  What is the best productivity tool?
                </h2>
                <div className="flex items-center text-sm font-normal text-muted-foreground">
                  <span>@nico</span>
                  <DotIcon></DotIcon>
                  <span>12 hours ago</span>
                  <DotIcon></DotIcon>
                  <span>10 replies</span>
                </div>
                <p className="max-w-3/4 text-sm font-normal text-muted-foreground">
                  I'm looking for a productivity tool that can help me get more done. I've tried a lot of them, but I'm still not sure which one is the best.
                </p>
              </div>
              <Form className="flex flex-row gap-5 items-start w-3/4">
                <Avatar className="size-14">
                  <AvatarImage src="https://github.com/yeonwan.png" />
                  <AvatarFallback>N</AvatarFallback>
                </Avatar>
                <div className="flex flex-col items-end gap-5 w-full">
                  <Textarea
                    className="w-full resize-none"
                    placeholder="Add a reply..."
                    rows={6} />
                  <Button type="submit">
                    Reply
                  </Button>
                </div>
              </Form>
              <div className="flex flex-col gap-5">
                <h4 className="text-lg font-medium">10 Replies</h4>
                <Reply
                  username="yeonwan"
                  avatarUrl="https://github.com/yeonwan.png"
                  content="I'm looking for a productivity tool that can help me get more done. I've tried a lot of them, but I'm still not sure which one is the best."
                  postedAt="12 hours ago"
                  topLevel  
                />
              </div>
            </div>
          </div>
        </div>
        <aside className="col-span-2 border rounded-lg shadow-sm p-6 space-y-6">
          <div className="flex flex-row gap-5">
            <Avatar className="size-14">
              <AvatarImage src="https://github.com/yeonwan.png" />
              <AvatarFallback>N</AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <h4 className="text-lg font-medium">Yeonwan</h4>
              <Badge variant="secondary">Entrepreneur</Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2 space-y-2">
            <span> 📅 Joined 3 months ago</span>
            <span> 🚀 Launched 10 products</span>
          </div>
          <Button variant="outline" className="w-full">Follow</Button>
        </aside>
      </div>
    </div>
  );
} 