import { Form, redirect, useNavigation } from "react-router";
import { Button } from "~/common/components/ui/button";
import { Link } from "react-router";
import { InputPair } from "~/common/components/input-pair";
import AuthButton from "../components/auth-button";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/join-page";
import { z } from "zod";
import { checkUsernameExists } from "../qureries";
import { Loader2 } from "lucide-react";

export function meta() {
  return [
    { title: "Join | WeMake" },
    { name: "description", content: "Create a new account" },
  ];
}

const formSchema = z.object({
  name: z.string().min(3),
  username: z.string().min(3),
  email: z.string().email(),
  password: z.string().min(8),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { client, headers } = makeSSRClient(request);
  const formData = await request.formData();
  const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {
      formErrors: error.flatten().fieldErrors,
      signUpError: null,
    };
  }
  const { email, password, name, username } = data;
  const exists = await checkUsernameExists(client, { username });
  if (exists) {
    return {
      formErrors: "Username alreday exists",           
      signUpError: null
    };
  }
  const { error: signUpError } = await client.auth.signUp({
    email,
    password,
    options: {
      data: {
        name: name,
        username: username,
      },
    },
  });
  if (signUpError) {
    return {
      formErrors: null,
      signUpError: signUpError.message
    };
  }
  return redirect("/", { headers });
}

export default function JoinPage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-8">
      <Button variant="ghost" asChild className="absolute top-8 right-8">
        <Link to="/auth/login">
          Login
        </Link>
      </Button>
      <div className="flex flex-col items-center justify-between w-full max-w-md gap-10 mt-24">
        <h1 className="text-2xl font-semibold">Create an account</h1>
        <Form className="w-full space-y-4" method="post">
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
 
          <Button className="w-full"
            type="submit"
            disabled={isSubmitting}>
            {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : "Create account"}
          </Button>
          {actionData?.signUpError &&
            <p className="text-sm text-red-500">{actionData.signUpError}</p>}
        </Form>
        <AuthButton />
      </div>
    </div>
  )
}