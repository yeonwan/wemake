import { Form, type MetaFunction } from "react-router";
import { Hero } from "~/common/components/hero";
import { InputPair } from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";

export const meta: MetaFunction = () => {
  return [
    { title: "Submit Post | WeMake Community" },
    { name: "description", content: "Share your thoughts with the WeMake community" },
  ];
};

export default function SubmitPostPage() {
  return (
    <div className="container py-8">
      <Hero title="Create Discussion" description="Share your thoughts with the WeMake community" />
      <Form className="flex flex-col gap-10 max-w-screen-md mx-auto w-full">
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
          options={["Productivity", "Ideas", "Jobs", "Other"].map((category) => ({ label: category, value: category }))}
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
        <Button className="self-center" type="submit">Create Discussion</Button>
      </Form>
    </div>
  );
} 