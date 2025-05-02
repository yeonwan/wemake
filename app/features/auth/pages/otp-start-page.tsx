import { Form, Link } from "react-router";
import { InputPair } from "~/common/components/input-pair";
import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";

export function meta() {
  return [
    { title: "OTP Authentication | WeMake" },
    { name: "description", content: "Enter your email to receive an OTP" },
  ];
}

export default function OtpStartPage() {
  return (
    <div className="flex flex-col items-center justify-center">
      <div className="flex flex-col items-center justify-between w-full max-w-md gap-10">
        <div className="flex flex-col items-center justify-center gap-1">
          <h1 className="text-2xl font-semibold">Login with OTP</h1>
          <p className="text-sm text-muted-foreground">We will send you a 4-digit code to verify your account.</p>
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
          <Button className="w-full" type="submit">Send OTP</Button>
        </Form>
      </div>

    </div>
  )
} 