import { Form, redirect, useNavigation } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { InputPair } from "~/common/components/input-pair";
import AuthButton from "../components/auth-button";
import type { Route } from "./+types/login-page";
import { AlertCircleIcon, Loader2 } from "lucide-react";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { Alert, AlertDescription, AlertTitle } from "~/common/components/ui/alert";
import { LoadingButton } from "~/features/auth/components/loading-button";

export function meta() {
  return [
    { title: "Login | WeMake" },
    { name: "description", content: "Sign in to your account" },
  ];
}

const loginSchema = z.object({
  email: z.string({
    required_error: "Email is required"
  }).email({
    message: "Invalid email address"
  }),
  password: z.string({
    required_error: "Password is required"
  }).min(8, {
    message: "Password must be at least 8 characters long"
  }),
});

export async function action({ request }: Route.ActionArgs) {
  const formData = await request.formData();
  const { success, data, error } = loginSchema.safeParse(Object.fromEntries(formData.entries()));
  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors,
      loginError: null,
    };
  }
  const { email, password } = data;
  const { client, headers } = makeSSRClient(request);
  const { error: loginError } = await client.auth.signInWithPassword({
    email,
    password,
  });
  if (loginError) {
    return {
      formErrors: null,
      loginError: loginError.message,
    };
  }
  return redirect("/", { headers });
}

export default function LoginPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Button variant="ghost" asChild className="absolute top-8 right-8">
        <Link to="/auth/join">
          Create an account
        </Link>
      </Button>
      <div className="flex flex-col items-center justify-between w-full max-w-md gap-10">
        <h1 className="text-2xl font-semibold">Login to your account</h1>
        <Form className="w-full space-y-4" method="post">
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
          {actionData?.formErrors?.email &&
            <p className="text-sm text-red-500">{actionData.formErrors.email?.join(", ")}</p>}
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
          {actionData?.formErrors?.password &&
            <p className="text-sm text-red-500">{actionData.formErrors.password?.join(", ")}</p>}
          <LoadingButton 
            className="w-full" 
            type="submit" 
            isLoading={isSubmitting}
          > 
            Login
          </LoadingButton>
          {actionData?.loginError &&
           <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Unable to login. Please check your email and password.</AlertTitle>
            </Alert>}
        </Form>
        <AuthButton />
      </div>
    </div>
  )
} 