import { Form, redirect, type MetaFunction } from "react-router";
import { Hero } from "~/common/components/hero";
import { InputPair } from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/submit-post-page";
import { getLoggedInUserId } from "~/features/users/queries";
import { getTopics } from "~/features/community/queries";
import { z } from "zod";
import { createPost } from "../mutations";

export const meta: MetaFunction = () => {
  return [
    { title: "Submit Post | WeMake Community" },
    { name: "description", content: "Share your thoughts with the WeMake community" },
  ];
};

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  category: z.string().min(1, "Category is required"),
  content: z.string().min(1, "Content is required").max(1000, "Content must be less than 1000 characters"),
});

export const loader = async ({request}: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
  const topics = await getTopics(client);
  return { topics };
};

export const action = async ({request}: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  const userId = await getLoggedInUserId(client);
  const { success, data, error: formErrors } = formSchema.safeParse(Object.fromEntries(await request.formData()));
  if (!success) {
    return { fieldErrors: formErrors.flatten().fieldErrors };
  }
  const { title, category, content } = data;
  const post = await createPost(client, { title, category, content, userId });
  return redirect(`/community/${post.post_id}`);
}
 
export default function SubmitPostPage({loaderData , actionData}: Route.ComponentProps) {
  const { topics } = loaderData;
  return (
    <div className="container py-8">
      <Hero title="Create Discussion" description="Share your thoughts with the WeMake community" />
      <Form className="flex flex-col gap-10 max-w-screen-md mx-auto w-full" method="post">
        <InputPair
          label="Title"
          description="Title of your discussion (100 characters max)"
          id="title"
          name="title"
          type="text"
          placeholder="Title of your discussion"
          required
        />
        <SelectPair
          label="Category"
          description="Category of your discussion"
          name="category"
          options={topics.map((topic) => ({ label: topic.name, value: topic.slug }))}
          required
          placeholder="Select category"
        />
        <InputPair
          label="Content"
          description="Content of your discussion (1,000 characters max)"
          id="content"
          name="content"
          type="text"
          placeholder="Content of your discussion"
          required
          textArea
        />
        {actionData?.fieldErrors && <div className="text-sm text-red-500">{actionData.fieldErrors.content}</div>}
        <Button className="self-center" type="submit">Create Discussion</Button>
      </Form>
    </div>
  );
} 