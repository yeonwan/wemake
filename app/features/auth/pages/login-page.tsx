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
    { title: "Login | WeMake" },
    { name: "description", content: "Sign in to your account" },
  ];
}

export default function LoginPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <Button variant="ghost" asChild className="absolute top-8 right-8">
        <Link to="/auth/join">
          Create an account
        </Link>
      </Button>
      <div className="flex flex-col items-center justify-between w-full max-w-md gap-10">
        <h1 className="text-2xl font-semibold">Login to your account</h1>
        <Form className="w-full space-y-4">
          <InputPair
            id="email" 
            label="Email"
            description="Enter your email"
            name="email"
            type="text"
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
          <Button className="w-full" type="submit">Login</Button>
        </Form>
        <AuthButton />
      </div>
    </div>
  )
} 