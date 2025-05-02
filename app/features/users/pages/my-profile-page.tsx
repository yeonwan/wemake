import { redirect, type MetaFunction } from "react-router";
import { Card, CardContent, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Button } from "~/common/components/ui/button";
import { InputPair } from "~/common/components/input-pair";

export const loader = async () => {
  // TODO: Find user using the cookie
  return redirect("/users/yeonwan");
};

export const meta: MetaFunction = () => {
  return [
    { title: "My Profile | WeMake" },
    { name: "description", content: "View and edit your profile" },
  ];
};

