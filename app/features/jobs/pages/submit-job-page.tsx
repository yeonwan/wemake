import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardHeader } from "~/common/components/ui/card";
import { Input } from "~/common/components/ui/input";
import { Label } from "~/common/components/ui/label";
import { Textarea } from "~/common/components/ui/textarea";
import { Hero } from "~/common/components/hero";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "~/common/components/ui/select";
import { Form } from "react-router";
import { InputPair } from "~/common/components/input-pair";

import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constant";
import SelectPair from "~/common/components/select-pair";

export function meta() {
  return [
    { title: "Post a Job | WeMake" },
    { name: "description", content: "Post a new job opportunity" },
  ];
}


export default function SubmitJobPage() {
  return <div>
    <Hero title="Post a Job"
      description="Reach out to the best developers in the world" />
    <Form className="max-w-screen-2xl mx-auto flex flex-col items-center gap-5 p-5">
      <div className="grid grid-cols-3 gap-5 space-y-5">
        <InputPair
          id="position"
          label="Position"
          description="(40 characters max)"
          name="position"
          placeholder="i.e Software Engineer"
          type="text"
          required
          maxLength={40}
        >
        </InputPair>
        <InputPair
          id="overview"
          label="Overview"
          description="(400 characters max, separated by commas)"
          name="overview"
          placeholder="i.e We are looking for a software engineer with a passion for building scalable systems. You will be responsible for designing and implementing scalable systems, collaborating with other engineers to build new features, and optimizing performance and maintainability."
          type="text"
          required
          maxLength={400}
          textArea
        >
        </InputPair>
        <InputPair
          id="responsibilities"
          label="Responsibilities"
          description="(400 characters max, separated by commas)"
          name="responsibilities"
          placeholder="i.e Design and implement scalable systems, Collaborate with other engineers to build new features, Optimize performance and maintainability"
          type="text"
          required
          maxLength={400}
          textArea
        >
        </InputPair>
        <InputPair
          id="qualifications"
          label="Qualifications"
          description="(400 characters max, separated by commas)"
          name="qualifications"
          placeholder="i.e Bachelor's degree in Computer Science, 3+ years of experience in software development, Strong understanding of object-oriented programming and design patterns"
          type="text"
          required
          maxLength={400}
          textArea
        >
        </InputPair>
        <InputPair
          id="skills"
          label="Skills"
          description="(400 characters max, separated by commas)"
          name="skills"
          placeholder="i.e React, Node.js, Typescript, Docker, Kubernetes"
          type="text"
          required
          maxLength={400}
          textArea
        >
        </InputPair>
        <InputPair
          id="benefits"
          label="Benefits"
          description="(400 characters max, separated by commas)"
          name="benefits"
          placeholder="i.e Health insurance, Dental insurance, Vision insurance"
          type="text"
          required
          maxLength={400}
          textArea
        >
        </InputPair>
        <InputPair
          id="companyName"
          label="Company Name"
          description="(40 characters max)"
          name="companyName"
          placeholder="i.e Meta, Google, Apple"
          type="text"
          required
          maxLength={40}
        >
        </InputPair>
        <InputPair
          id="companyLogoUrl"
          label="Company Logo URL"
          description="(40 characters max)"
          name="companyLogoUrl"
          placeholder="i.e https://example.com/logo.png"
          type="text"
          required
          maxLength={40}
        >
        </InputPair>
        <InputPair
          id="companyLocation"
          label="Company Location"
          description="(40 characters max)"
          name="companyLocation"
          placeholder="i.e San Francisco, CA, USA"
          type="text"
          required
          maxLength={40}
        >
        </InputPair>
        <InputPair
          id="applyUrl"
          label="Apply URL"
          description="(40 characters max)"
          name="applyUrl"
          placeholder="i.e https://example.com/apply"
          type="text"
          required
          maxLength={40}
        >
        </InputPair>
        <SelectPair
          label="Job Type"
          description="Select the type of job you are posting"
          name="jobType"
          required
          placeholder="i.e Full-time, Part-time, Contract"
          options={JOB_TYPES.map((type) => ({ label: type.label, value: type.value }))}
        />
        <SelectPair
          label="Location"
          description="Select the location of the job"
          name="location"
          required
          placeholder="i.e San Francisco, CA, USA"
          options={LOCATION_TYPES.map((location) => ({ label: location.label, value: location.value }))}
        />
        <SelectPair
          label="Salary Range"
          description="Select the salary range of the job"
          name="salaryRange"
          required
          placeholder="i.e $100,000 - $120,000"
          options={SALARY_RANGE.map((range) => ({ label: range, value: range }))}
        />
      </div>
      <Button
        type="submit"
        className="w-full max-w-lg mt-10"
        size="lg"
      >Post Job for $100</Button>
    </Form>
  </div>;
}