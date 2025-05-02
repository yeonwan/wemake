import type { MetaFunction } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Button } from "~/common/components/ui/button";
import { InputPair } from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Upload } from "lucide-react";
import { Form } from "react-router";
import { useEffect, useState } from "react";
import { Label } from "~/common/components/ui/label";
import { Input } from "~/common/components/ui/input";
export const meta: MetaFunction = () => {
  return [
    { title: "Settings | WeMake" },
    { name: "description", content: "Manage your account settings" },
  ];
};

export default function MySettingsPage() {
  const [avatar, setAvatar] = useState<string | null>(null);
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  }

  useEffect(() => {
    return () => {
      if (avatar) URL.revokeObjectURL(avatar);
    };
  }, [avatar]);


  return (
    <div>
      <div className="grid grid-cols-1 md:grid-cols-6 lg:grid-cols-12 gap-8">
        <div className="col-span-1 md:col-span-4 lg:col-span-8 space-y-10">
          <h1 className="text-2xl font-bold">Edit Profile</h1>
          <div className="flex flex-col gap-5">
            <Form className="space-y-5 w-1/2">
              <InputPair
                id="username"
                label="Username"
                name="username"
                description="Your public username."
                placeholder="Jhon Doe"
                required
              />
              <SelectPair
                label="Role"
                name="role"
                description="Your role is used to identify you on WeMake"
                placeholder="Select your role"
                options={[
                  { label: "Entrepreneur", value: "entrepreneur" },
                  { label: "Investor", value: "investor" },
                  { label: "Employee", value: "employee" },
                ]}
                required
              />
              <InputPair
                id="headline"
                label="Headline"
                name="headline"
                description="Your public headline. It will be displayed on your profile."
                placeholder="Jhon Doe"
                required
              />
              <InputPair
                id="bio"
                label="Bio"
                name="bio"
                description="Your public bio. It will be displayed on your profile."
                textArea
                placeholder="Jhon Doe"
                required
              />
              <Button className="w-full" type="submit">Update Profile</Button>
            </Form>

          </div>
        </div>
        <aside className="col-span-1 md:col-span-2 lg:col-span-4 border rounded-lg shadow-md space-y-5 p-6">
          <div className="space-y-7">
            <div className="flex flex-col gap-1 items-start">
              <span className="text-sm font-bold text-gray-500">
                AVATAR
              </span>
              <small className="text-muted-foreground">
                This is your avatar.
              </small>
            </div>
            <div className="flex flex-col space-y-5">
              <Label className="flex flex-col gap-1 items-start">
                <div className="size-40 rounded-full shadow-xl overflow-hidden">
                  {avatar && <img src={avatar} alt="Icon" className="w-full h-full object-cover" />}
                </div>
              </Label>
              <Input type="file" className="w-1/2" onChange={onChange} />
              <div className="flex flex-col text-xs">
                <span className="text-muted-foreground">Recommended size : 128x128</span>
                <span className="text-muted-foreground">Allowed formats : PNG, JPG, SVG</span>
                <span className="text-muted-foreground">Max file size : 1MB</span>
              </div>
              <Button type="submit">Update Avatar</Button>
            </div>
          </div>


        </aside>

      </div>

    </div>
  );
} 