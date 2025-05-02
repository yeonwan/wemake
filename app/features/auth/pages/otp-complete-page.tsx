import { Form } from "react-router";
import { InputPair } from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";

export function meta() {
  return [
    { title: "Verify OTP | WeMake" },
    { name: "description", content: "Enter the OTP code sent to your email" },
  ];
}

export default function OtpCompletePage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-between w-full max-w-md gap-10">
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="text-2xl font-semibold">Verify your account</h1>
          <p className="text-sm text-muted-foreground">Enter the 4-digit code sent to your email.</p>
        </div>
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
            id="otp"
            label="OTP"
            description="Enter the OTP code sent to your email"
            name="otp"
            type="text"
            placeholder="1234" />
          <Button className="w-full" type="submit">Verify</Button>
        </Form>
      </div>

    </div>
  )
} 