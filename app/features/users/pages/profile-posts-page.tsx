import type { MetaFunction } from "react-router";
import { PostCard } from "~/features/community/components/post-card";
import { getUserPosts } from "../queries";
import type { Route } from "./+types/profile-posts-page";
import { makeSSRClient } from "~/supa-client";

export const meta: MetaFunction = () => {
  return [
    { title: "Posts | WeMake" },
    { name: "description", content: "View user's posts" },
  ];
};

export const loader = async ({params, request}: Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const posts = await getUserPosts(client, { username: params.username });
  return { posts };
};

export default function ProfilePostsPage({loaderData} : Route.ComponentProps) {
  const {posts} = loaderData;
  return (
    <div className="flex flex-col gap-5">
      {posts.map((post) => (
        <PostCard
          id={post.post_id.toString()}
          title={post.title}
          author={post.author}
          avatarUrl={post.author_avatar}
          category={post.topic}
          postedAt={post.created_at}
          expanded
        />
      ))}

    </div>
  );
} 