import { Form } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { Icons } from "~/common/components/ui/icons";
import { Link } from "react-router";
import { InputPair } from "~/common/components/input-pair";
import AuthButton from "../components/auth-button";

export function meta() {
  return [
    { title: "Join | WeMake" },
    { name: "description", content: "Create a new account" },
  ];
}

export default function JoinPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Button variant="ghost" asChild className="absolute top-8 right-8">
        <Link to="/auth/login">
          Login
        </Link>
      </Button>
      <div className="flex flex-col items-center justify-between w-full max-w-md gap-10">
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <Form className="w-full space-y-4">
          <InputPair
            id="name" 
            label="Name"
            description="Enter your name"
            name="name"
            type="text"
            placeholder="John Doe"
            required
            autoCapitalize="none"
            autoComplete="name"
            autoCorrect="off" />
          <InputPair
            id="username"
            label="Username"
            description="Enter your username"
            name="username"
            type="text"
            placeholder="your_username"
            required
            autoCapitalize="none"
            autoComplete="username"
            autoCorrect="off" />
          <InputPair
            id="email"
            label="Email"
            description="Enter your email"
            name="email"
            type="email"
            placeholder="example@email.com"
            required
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off" />
          <InputPair
            id="password"
            label="Password"
            description="Enter your password"
            name="password"
            type="password"
            placeholder="********"
            required
            autoCapitalize="none"
            autoComplete="password"
            autoCorrect="off" />
          <Button className="w-full" type="submit">Create account</Button>
        </Form>
        <AuthButton />
      </div>
    </div>
  )
}