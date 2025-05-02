import type { MetaFunction } from "react-router";
import { PostCard } from "~/features/community/components/post-card";

export const meta: MetaFunction = () => {
  return [
    { title: "Posts | WeMake" },
    { name: "description", content: "View user's posts" },
  ];
};

export default function ProfilePostsPage() {
  return (
    <div className="flex flex-col gap-5">
      {Array.from({ length: 11 }).map((_, index) => (
        <PostCard
          id={`postId-${index}`}
          title={`What is best tool for ${index}?`}
          author="Yeonwan"
          avatarUrl="https://github.com/apple.png"
          category="Productivity"
          postedAt="12 hours ago"
          expanded
        />
      ))}

    </div>
  );
} 