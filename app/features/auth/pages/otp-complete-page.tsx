import { Form, redirect, useNavigation, useSearchParams } from "react-router";
import { InputPair } from "~/common/components/input-pair";
import { LoadingButton } from "../components/loading-button";
import type { Route } from "./+types/otp-complete-page";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { Alert, AlertTitle } from "~/common/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export function meta() {
  return [
    { title: "Verify OTP | WeMake" },
    { name: "description", content: "Enter the OTP code sent to your email" },
  ];
}

const formSchema = z.object({
  email: z.string().email("Invalid email address"),
  otp: z.string().min(6).max(6, "OTP must be 6 digits"),
});

export const action = async ({ request }: Route.ActionArgs) => {
  const { success, data, error: formErrors } = formSchema.safeParse(Object.fromEntries(await request.formData()));
  if (!success) {
    return {
      formError: formErrors.flatten().fieldErrors,
      otpError: null
    };
  }
  const { email, otp } = data;
  const { client, headers } = makeSSRClient(request);
  const { error: otpError } = await client.auth.verifyOtp({ email, token: otp, type: "email" });
  if (otpError) {
    return {
      formError: null,
      otpError: otpError.message
    };
  }
  return redirect("/", { headers });
};


export default function OtpCompletePage({ actionData }: Route.ComponentProps) {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";
  const [searchParams, _] = useSearchParams();
  const email = searchParams.get("email");
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-between w-full max-w-md gap-10">
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="text-2xl font-semibold">Verify your account</h1>
          <p className="text-sm text-muted-foreground">Enter the 4-digit code sent to your email.</p>
        </div>
        <Form className="w-full space-y-4" method="post">
          <InputPair
            id="email"
            label="Email"
            description="Enter your email"
            name="email"
            type="text"
            defaultValue={email || ""}
            placeholder="example@email.com"
            required
            autoCapitalize="none"
            autoComplete="email"
            autoCorrect="off" />
          {actionData?.formError?.email && <p className="text-sm text-red-500">{actionData.formError.email}</p>}
          <InputPair
            id="otp"
            label="OTP"
            description="Enter the OTP code sent to your email"
            name="otp"
            type="text"
            placeholder="1234" />
          {actionData?.formError?.otp && <p className="text-sm text-red-500">{actionData.formError.otp}</p>}
          <LoadingButton className="w-full" type="submit" isLoading={isSubmitting}>Verify</LoadingButton>
          {actionData?.otpError &&
           <Alert variant="destructive">
              <AlertCircleIcon />
              <AlertTitle>Unable to verify OTP. Please check your email and OTP.</AlertTitle>
            </Alert>}
        </Form>
      </div>

    </div>
  )
} 