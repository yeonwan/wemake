import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-page";
import { Form } from "react-router";
import { InputPair } from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components/ui/button";
import { PlusIcon } from "lucide-react";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { useState } from "react";

export const meta: Route.MetaFunction = () => {
  return [
    { title: "Submit Product | WeMake" },
    { name: "description", content: "Submit your product to WeMake" }
  ];
};

export default function SubmitPage({ actionData }: Route.ComponentProps) {
  const [icon, setIcon] = useState<string | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setIcon(URL.createObjectURL(file));
    }
  }
  return (
    <div>
      <Hero title="Submit Product" description="Submit your product to WeMake" />

      <Form className="grid grid-cols-2 gap-10 max-w-screen-lg mx-auto">
        <div className="space-y-5">
          <InputPair
            label="Name"
            description="This is the name of your product"
            id="name"
            name="name"
            type="text"
            placeholder="Name of your product"
            required
          />
          <InputPair
            label="Tagline"
            description="60 characters or less"
            id="tagline"
            name="tagline"
            required
            type="text"
            placeholder="A concise description of your product"
          />
          <InputPair
            label="URL"
            description="The URL of your product"
            id="url"
            name="url"
            required
            type="text"
            placeholder="https://example.com"
          />
          <InputPair
            label="Description"
            description="A concise description of your product"
            id="description"
            name="description"
            required
            type="text"
            textArea
            placeholder="A concise description of your product"
          />
          <SelectPair
            label="Category"
            description="The category of your product"
            name="category"
            required
            placeholder="Select a category"
            options={[
              { label: "Light", value: "light" },
              { label: "Dark", value: "dark" },
              { label: "System", value: "system" },
            ]}
          />
          <Button type="submit" className="w-full">Submit</Button>
          <div className="h-5"></div>
        </div>

        <div className="flex flex-col space-y-2">

          <Label className="flex flex-col gap-1 items-start">
            Icon{" "}
            <small className="text-muted-foreground">
              This is the icon of your product
            </small>
            <div className="size-40 rounded-xl shadow-xl overflow-hidden">
              {icon && <img src={icon} alt="Icon" className="w-full h-full object-cover" />}
            </div>
          </Label>
          <Input type="file" className="w-1/2" onChange={onChange} />
          <div className="flex flex-col text-xs">
            <span className="text-muted-foreground">Recommended size : 128x128</span>
            <span className="text-muted-foreground">Allowed formats : PNG, JPG, SVG</span>
            <span className="text-muted-foreground">Max file size : 1MB</span>
          </div>

        </div>
      </Form>
    </div>

  );
} 