import { Hero } from "~/common/components/hero";
import { Form, redirect, useNavigate, useNavigation } from "react-router";
import { InputPair } from "~/common/components/input-pair";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constant";
import SelectPair from "~/common/components/select-pair";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import type { Route } from "./+types/submit-job-page";
import { z } from "zod";
import { createJob } from "../mutations";
import { LoadingButton } from "~/features/auth/components/loading-button";

export function meta() {
  return [
    { title: "Post a Job | WeMake" },
    { name: "description", content: "Post a new job opportunity" },
  ];
}

export const loader = async ({request}: Route.LoaderArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
}

export const formSchema = z.object({
  position: z.string().min(1, "Position is required").max(40, "Position must be less than 40 characters"),
  overview: z.string().min(1, "Overview is required").max(400, "Overview must be less than 400 characters"),
  responsibilities: z.string().min(1, "Responsibilities is required").max(400, "Responsibilities must be less than 400 characters"),
  qualifications: z.string().min(1, "Qualifications is required").max(400, "Qualifications must be less than 400 characters"),
  skills: z.string().min(1, "Skills is required").max(400, "Skills must be less than 400 characters"),
  benefits: z.string().min(1, "Benefits is required").max(400, "Benefits must be less than 400 characters"),
  companyName: z.string().min(1, "Company Name is required").max(40, "Company Name must be less than 40 characters"),
  companyLogoUrl: z.string().min(1, "Company Logo URL is required").max(40, "Company Logo URL must be less than 40 characters"),
  companyLocation: z.string().min(1, "Company Location is required").max(40, "Company Location must be less than 40 characters"),
  applyUrl: z.string().min(1, "Apply URL is required").max(40, "Apply URL must be less than 40 characters"),
  jobType: z.enum(JOB_TYPES.map((type) => type.value) as [string, ...string[]], { message: "Invalid job type" }),
  location: z.enum(LOCATION_TYPES.map((location) => location.value) as [string, ...string[]], { message: "Invalid location" }),
  salaryRange: z.enum(SALARY_RANGE as unknown as [string, ...string[]], { message: "Invalid salary range" }),
});

export const action = async ({request}: Route.ActionArgs) => {
  const { client } = makeSSRClient(request);
  await getLoggedInUserId(client);
  const { success, data, error: formErrors } = formSchema.safeParse(Object.fromEntries(await request.formData()));
  if (!success) {
    return { fieldErrors: formErrors.flatten().fieldErrors };
  }
  const {job_id} = await createJob(client, data);
  return redirect(`/jobs/${job_id}`);
}

export default function SubmitJobPage({actionData}: Route.ComponentProps) {
  const navigation = useNavigation();
  const isLoading = navigation.state == "submitting" || navigation.state == "loading";
  return <div>
    <Hero title="Post a Job"
      description="Reach out to the best developers in the world" />
    <Form className="max-w-screen-2xl mx-auto flex flex-col items-center gap-5 p-5" method="post">
      <div className="grid grid-cols-3 gap-5 space-y-5">
        <InputPair
          id="position"
          label="Position"
          description="(40 characters max)"
          name="position"
          defaultValue="i.e Software Engineer"
          type="text"
          required
          maxLength={40}
        />
        {actionData?.fieldErrors?.position && <p className="text-sm text-red-500">{actionData.fieldErrors.position}</p>}
        <InputPair
          id="overview"
          label="Overview"
          description="(400 characters max, separated by commas)"
          name="overview"
          defaultValue="i.e We are looking for a software engineer with a passion for building scalable systems. You will be responsible for designing and implementing scalable systems, collaborating with other engineers to build new features, and optimizing performance and maintainability."
          type="text"
          required
          maxLength={400}
          textArea
        />
        {actionData?.fieldErrors?.overview && <p className="text-sm text-red-500">{actionData.fieldErrors.overview}</p>}
        <InputPair
          id="responsibilities"
          label="Responsibilities"
          description="(400 characters max, separated by commas)"
          name="responsibilities"
          defaultValue="i.e Design and implement scalable systems, Collaborate with other engineers to build new features, Optimize performance and maintainability"
          type="text"
          required
          maxLength={400}
          textArea
        />
        {actionData?.fieldErrors?.responsibilities && <p className="text-sm text-red-500">{actionData.fieldErrors.responsibilities}</p>}
        <InputPair
          id="qualifications"
          label="Qualifications"
          description="(400 characters max, separated by commas)"
          name="qualifications"
          defaultValue="i.e Bachelor's degree in Computer Science, 3+ years of experience in software development, Strong understanding of object-oriented programming and design patterns"
          type="text"
          required
          maxLength={400}
          textArea
        />
        {actionData?.fieldErrors?.qualifications && <p className="text-sm text-red-500">{actionData.fieldErrors.qualifications}</p>}
        <InputPair
          id="skills"
          label="Skills"
          description="(400 characters max, separated by commas)"
          name="skills"
          defaultValue="i.e React, Node.js, Typescript, Docker, Kubernetes"
          type="text"
          required
          maxLength={400}
          textArea
        />
        {actionData?.fieldErrors?.skills && <p className="text-sm text-red-500">{actionData.fieldErrors.skills}</p>}
        <InputPair
          id="benefits"
          label="Benefits"
          description="(400 characters max, separated by commas)"
          name="benefits"
          defaultValue="i.e Health insurance, Dental insurance, Vision insurance"
          type="text"
          required
          maxLength={400}
          textArea
        />
        {actionData?.fieldErrors?.benefits && <p className="text-sm text-red-500">{actionData.fieldErrors.benefits}</p>}
        <InputPair
          id="companyName"
          label="Company Name"
          description="(40 characters max)"
          name="companyName"
          defaultValue="i.e Meta, Google, Apple"
          type="text"
          required
          maxLength={40}
        />
        {actionData?.fieldErrors?.companyName && <p className="text-sm text-red-500">{actionData.fieldErrors.companyName}</p>}
        <InputPair
          id="companyLogoUrl"
          label="Company Logo URL"
          description="(40 characters max)"
          name="companyLogoUrl"
          defaultValue="i.e https://example.com/logo.png"
          type="text"
          required
          maxLength={40}
        />
        {actionData?.fieldErrors?.companyLogoUrl && <p className="text-sm text-red-500">{actionData.fieldErrors.companyLogoUrl}</p>}
        <InputPair
          id="companyLocation"
          label="Company Location"
          description="(40 characters max)"
          name="companyLocation"
          defaultValue="i.e San Francisco, CA, USA"
          type="text"
          required
          maxLength={40}
        />
        {actionData?.fieldErrors?.companyLocation && <p className="text-sm text-red-500">{actionData.fieldErrors.companyLocation}</p>}
        <InputPair
          id="applyUrl"
          label="Apply URL"
          description="(40 characters max)"
          name="applyUrl"
          defaultValue="i.e https://example.com/apply"
          type="text"
          required
          maxLength={40}
        />
        {actionData?.fieldErrors?.applyUrl && <p className="text-sm text-red-500">{actionData.fieldErrors.applyUrl}</p>}
        <SelectPair
          label="Job Type"
          description="Select the type of job you are posting"
          name="jobType"
          required
          placeholder="i.e Full-time, Part-time, Contract"
          options={JOB_TYPES.map((type) => ({ label: type.label, value: type.value }))}
        />
        {actionData?.fieldErrors?.jobType && <p className="text-sm text-red-500">{actionData.fieldErrors.jobType}</p>}
        <SelectPair
          label="Location"
          description="Select the location of the job"
          name="location"
          required
          placeholder="i.e San Francisco, CA, USA"
          options={LOCATION_TYPES.map((location) => ({ label: location.label, value: location.value }))}
        />
        {actionData?.fieldErrors?.location && <p className="text-sm text-red-500">{actionData.fieldErrors.location}</p>}
        <SelectPair
          label="Salary Range"
          description="Select the salary range of the job"
          name="salaryRange"
          required
          placeholder="i.e $100,000 - $120,000"
          options={SALARY_RANGE.map((range) => ({ label: range, value: range }))}
        />
        {actionData?.fieldErrors?.salaryRange && <p className="text-sm text-red-500">{actionData.fieldErrors.salaryRange}</p>}
      </div>
      <LoadingButton
        type="submit"
        className="w-full max-w-lg mt-10"
        size="lg"
        isLoading={isLoading}
      >Post Job for $100</LoadingButton>
    </Form>
  </div>;
}