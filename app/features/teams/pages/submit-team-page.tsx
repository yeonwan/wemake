import { Button } from "~/common/components/ui/button";
import { Hero } from "~/common/components/hero";
import { Form, redirect } from "react-router";
import { InputPair } from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { PRODUCT_STAGES, TEAM_SIZES, EQUITY_RANGES } from "../constants";
import type { Route } from "./+types/submit-team-page";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { createTeam } from "../mutations";
import { LoadingButton } from "~/features/auth/components/loading-button";



export const meta = () => {
  return [
    { title: "Submit Team | WeMake" },
    { name: "description", content: "Create a new team and invite makers" },
  ];
};

export const loader = async ({ request }: Route.LoaderArgs) => {
  const {client} = makeSSRClient(request);
  await getLoggedInUserId(client);
}

export const formSchema =  z.object({
  productName: z.string().min(1).max(40, {message: "Product name must be less than 40 characters"}),
  productStage: z.enum(PRODUCT_STAGES as [string, ...string[]], {message: "Invalid product stage"}),
  teamSize: z.coerce.number().min(1).max(100, {message: "Team size must be between 1 and 100"}),
  equity: z.coerce.number().min(0).max(100, {message: "Equity must be between 0 and 100"}),
  roles: z.string().min(1).max(400, {message: "Roles must be less than 400 characters"}),
  productDescription: z.string().min(1).max(1000, {message: "Product description must be less than 1000 characters"}),
})

export const action = async ({request}: Route.ActionArgs) => {
  const {client} = makeSSRClient(request);
  const formData = await request.formData();
  const {success, data, error} = formSchema.safeParse(Object.fromEntries(formData));
  if (!success) {
    return {fieldErrors: error.flatten().fieldErrors}
  }
  const userId = await getLoggedInUserId(client);
  const teamId = await createTeam(client, userId, {...data});
  console.log(teamId);
  return redirect(`/teams/${teamId}`);
  
}

export default function SubmitTeamPage({actionData}: Route.ComponentProps) {
  return (
    <div>
      <Hero 
        title="Create Team" 
        description="Create a new team and invite makers" 
      />
      <Form className="w-full px-4 md:px-8 lg:px-16 flex flex-col items-center gap-5" method="post">
        <div className="w-full max-w-7xl grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          <InputPair
            id="productName"
            label="What is the name of your product?"
            description="(40 characters max)"
            name="productName"
            placeholder="i.e WeMake Platform"
            type="text"
            required
            maxLength={40}
            className="h-[72px]"
          />
          {actionData?.fieldErrors?.productName && (
            <p className="text-red-500">{actionData.fieldErrors.productName}</p>
          )}
          <SelectPair
            label="What is the stage of your product?"
            description="Select your product's current stage"
            name="productStage"
            required
            placeholder="Select product stage"
            options={PRODUCT_STAGES.map((stage) => ({ label: stage, value: stage }))}
          />
          {actionData?.fieldErrors?.productStage && (
            <p className="text-red-500">{actionData.fieldErrors.productStage}</p>
          )}
          <InputPair
            id="teamSize"
            label="What is the size of your team?"
            description="Enter the number of team members"
            name="teamSize"
            type="number"
            required
            min={1}
            max={100}
          />
          {actionData?.fieldErrors?.teamSize && (
            <p className="text-red-500">{actionData.fieldErrors.teamSize}</p>
          )}
          <InputPair
            id="equity"
            label="How much equity are you willing to give?"
            description="Enter the percentage (0-100)"
            name="equity"
            type="number"
            required
            min={0}
            max={100}
          />
          {actionData?.fieldErrors?.equity && (
            <p className="text-red-500">{actionData.fieldErrors.equity}</p>
          )}
          <InputPair
            id="roles"
            label="What roles are you looking for?"
            description="(400 characters max, separated by commas)"
            name="roles"
            placeholder="i.e Frontend Developer, Backend Developer, UI/UX Designer"
            type="text"
            required
            maxLength={400}
            textArea
          />
          {actionData?.fieldErrors?.roles && (
            <p className="text-red-500">{actionData.fieldErrors.roles}</p>
          )}
          <InputPair
            id="productDescription"
            label="What is the description of your product?"
            description="(1000 characters max)"
            name="productDescription"
            placeholder="Describe your product, its mission, and what makes it unique"
            type="text"
            required
            maxLength={1000}
            textArea
          />
          {actionData?.fieldErrors?.productDescription && (
            <p className="text-red-500">{actionData.fieldErrors.productDescription}</p>
          )}
        </div>
        <LoadingButton
          type="submit"
          className="w-full max-w-lg mt-10"
          size="lg"
        >
          Create Team
        </LoadingButton>
      </Form>
    </div>
  );
} 