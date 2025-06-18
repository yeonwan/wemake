import { Form, redirect, useNavigation, useSearchParams } from "react-router";
import { InputPair } from "~/common/components/input-pair";
import type { Route } from "./+types/otp-start-page";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { LoadingButton } from "../components/loading-button";

export function meta() {
  return [
    { title: "OTP Authentication | WeMake" },
    { name: "description", content: "Enter your email to receive an OTP" },
  ];
}

const paramsSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export const action = async ({request}: Route.ActionArgs) => {
  const { success, data, error : emailError} = paramsSchema.safeParse(Object.fromEntries(await request.formData()));
  if (!success) {
    return { emailError: emailError?.flatten().fieldErrors.email };
  }
  const { email } = data;
  const { client, headers } = makeSSRClient(request);
  const { data: { user }, error } 
  = await client.auth.signInWithOtp({
     email, 
    options: {
      shouldCreateUser: true,
    }
    });
  if (error) {
    return { error: "Failed to send OTP" };
  }
  const searchParams = new URLSearchParams();
  searchParams.set("email", email);
  return redirect(`/auth/otp/complete?${searchParams.toString()}`, { headers });
};

export default function OtpStartPage({actionData}: Route.ComponentProps) {
  const emailError = actionData?.emailError;
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-between w-full max-w-md gap-10">
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="text-2xl font-semibold">Login with OTP</h1>
          <p className="text-sm text-muted-foreground">We will send you a 4-digit code to verify your account.</p>
        </div>
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
            {emailError && <p className="text-sm text-red-500">{emailError}</p>}
          <LoadingButton className="w-full" type="submit" isLoading={isSubmitting}>Send OTP</LoadingButton>
        </Form>
      </div>

    </div>

  )
} 