import { ChevronUp, DotIcon } from "lucide-react";
import { Form, Link, useNavigation, useOutletContext, type MetaFunction } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbSeparator } from "~/common/components/ui/breadcrumb";
import { Button } from "~/common/components/ui/button";
import { Textarea } from "~/common/components/ui/textarea";
import { Reply } from "~/features/community/components/reply";
import type { Route } from "./+types/post-page";
import { getPostById, getReplies } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";
import { z } from "zod";
import { getLoggedInUserId } from "~/features/users/queries";
import { createReply } from "../mutations";
import { LoadingButton } from "~/features/auth/components/loading-button";
import { useEffect, useRef } from "react";

export const meta: MetaFunction = ({ params }) => {
  return [
    { title: `Post ${params.postId} | WeMake Community` },
    { name: "description", content: "View and discuss this post in our community" },
  ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
  const { client, headers } = makeSSRClient(request);
  const postId = Number(params.postId);
  const [post, replies] = await Promise.all([
    getPostById(client, { postId }),
    getReplies(client, { postId })
  ]);
  return { post, replies };
};

export const formSchema = z.object({
  reply: z.string().min(1, { message: "Reply is required" }),
  parentReplyId: z.coerce.number().optional(),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return { fieldErrors: error.flatten().fieldErrors };
  }
  const userId = await getLoggedInUserId(client);
  await createReply(client, { reply: data.reply, userId, postId: params.postId, parentReplyId: data.parentReplyId });
  return { ok: true };
}

export default function PostPage({ loaderData, actionData }: Route.ComponentProps) {
  const post = loaderData.post;
  const replies = loaderData.replies;
  const naviation = useNavigation();
  const isSubmitting = naviation.state === "submitting" || naviation.state === "loading";
  const { isLoggedIn, name, avatar } = useOutletContext<{
    isLoggedIn: boolean,
    name?: string | null,
    avatar?: string | null
  }>();
  const formRef = useRef<HTMLFormElement>(null);
  useEffect(() => {
    if (actionData?.ok) {
      formRef.current?.reset();
    }
  }, [actionData?.ok]);
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
              <Link to={`/community?topic=${post.topic_slug}`}>{post.topic_name}</Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink asChild>
              <Link to={`/community/${post.post_id}`}>
                {post.title}
              </Link>
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="grid grid-cols-6 gap-40 items-start w-full">
        <div className="col-span-4 space-y-10">
          <div className="flex flex-row items-start gap-10">
            <Button variant="outline" className="flex flex-col items-center gap-2 h-14">
              <ChevronUp />
              {post.upvotes}
            </Button>
            <div className="space-y-20 w-full">
              <div className="space-y-2 w-full">
                <h2 className="text-2xl font-bold">
                  {post.title}
                </h2>
                <div className="flex items-center text-sm font-normal text-muted-foreground">
                  <span>{post.author_name}</span>
                  <DotIcon></DotIcon>
                  <span>{DateTime.fromISO(post.created_at).toRelative()}</span>
                  <DotIcon></DotIcon>
                  <span>{post.reply_count} replies</span>
                </div>
                <p className="max-w-3/4 text-sm font-normal text-muted-foreground">
                  {post.content}
                </p>
              </div>
              {isLoggedIn && (
                <Form ref={formRef} className="flex flex-row gap-5 items-start w-3/4" method="post">
                  <Avatar className="size-14">
                    {avatar !== null && <AvatarImage src={avatar} />}
                    {avatar === null && <AvatarFallback>{name?.charAt(0) || "U"}</AvatarFallback>}
                  </Avatar>
                  <div className="flex flex-col items-end gap-5 w-full">
                    <Textarea
                      className="w-full resize-none"
                      placeholder="Add a reply..."
                      rows={6}
                      name="reply"
                    />
                    <LoadingButton type="submit" isLoading={isSubmitting} disabled={isSubmitting}>
                      Reply
                    </LoadingButton>
                  </div>
                </Form>
              )}
              <div className="flex flex-col gap-5">
                <h4 className="text-lg font-medium">{post.reply_count} Replies</h4>
                {replies.map((reply) => (
                  <Reply
                    key={reply.reply_id}
                    name={reply.user.name}
                    username={reply.user.username}
                    avatarUrl={reply.user.avatar}
                    content={reply.reply}
                    postedAt={reply.created_at}
                    replies={reply.post_replies}
                    topLevel={true}
                    parentReplyId={reply.reply_id}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
        <aside className="col-span-2 border rounded-lg shadow-sm p-6 space-y-3 bg-transparent/30">
          <div className="flex flex-row gap-5">
            <Avatar className="size-14">
              {post.author_avatar ? <AvatarImage src={post.author_avatar} /> : <AvatarFallback>{post.author_name.charAt(0)}</AvatarFallback>}

            </Avatar>
            <div className="flex flex-col">
              <h4 className="text-lg font-medium">{post.author_name}</h4>
              <Badge variant="secondary" className="capitalize">{post.author_role}</Badge>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <span> 📅 Joined {DateTime.fromISO(post.author_created_at).toRelative()}</span>
            <span> 🚀 Launched {post.product_count} products</span>
          </div>
          <Button variant="outline" className="w-full">Follow</Button>
        </aside>
      </div>
    </div>
  );
} 