import { Button } from "~/common/components/ui/button";
import { Badge } from "~/common/components/ui/badge";
import { DotIcon } from "lucide-react";
import { useState } from "react";
import type { Route } from "./+types/job-page";
import { getJobById } from "../queries";
import { DateTime } from "luxon";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = ({ data }) => {
  return [
    { title: `${data.job.position} | WeMake` },
    { name: "description", content: data.job.overview },
  ];
}

export async function loader({ params, request }: Route.LoaderArgs) {
  const {client, headers} = makeSSRClient(request);
  const job = await getJobById(client, { jobId: Number(params.jobId) });
  return { job };
}

export default function JobPage({ loaderData }: Route.ComponentProps) {
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const job = loaderData.job;

  const toggleFilter = (filter: string) => {
    setSelectedFilters(prev => 
      prev.includes(filter) 
        ? prev.filter(f => f !== filter) // Remove if already selected
        : [...prev, filter] // Add if not selected
    );
  };

  const isFilterSelected = (filter: string) => selectedFilters.includes(filter);

  return (
    <div>
      <div className="bg-gradient-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>
      <div className="grid grid-cols-6 gap-20 items-start">
        <div className="col-span-4 space-y-10">
          <div className="-mt-20 object-cover overflow-hidden">
            <img
              src={job.company_logo_url}
              alt="company logo"
              className="size-40 rounded-full bg-white relative left-10" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">{job.position}</h1>
            <h4 className="text-sm text-muted-foreground">
              {job.company_name}
            </h4>
          </div>
          <div className="flex gap-2">
            <Badge 
              variant={isFilterSelected("Full-time") ? "default" : "secondary"}
              className="cursor-pointer hover:opacity-80"
              onClick={() => toggleFilter("Full-time")}
            >
              Full-time
            </Badge>
            <Badge 
              variant={isFilterSelected("Remote") ? "default" : "secondary"}
              className="cursor-pointer hover:opacity-80"
              onClick={() => toggleFilter("Remote")}
            >
              Remote
            </Badge>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-lg text-muted-foreground">
              {job.overview}
            </p>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Responsibilities</h4>
            <ul className="text-lg list-disc list-inside ">
              {job.responsibilities.split(",").map((item, index) => (
                <li className="capitalize" key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Qualifications</h4>
            <ul className="text-lg list-disc list-inside ">
              {job.qualifications.split(",").map((item, index) => (
                <li className="capitalize" key={index}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Skills</h4>
            <ul className="text-lg list-disc list-inside ">
              {job.skills.split(",").map((item, index) => (
                <li className="capitalize" key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Benefits</h4>
            <ul className="text-lg list-disc list-inside ">
              {job.benefits.split(",").map((item, index) => (
                <li className="capitalize" key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-2 sticky top-20 border rounded-xl mt-32 space-y-5 p-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Avg. salary</span>
            <span className="text-2xl font-medium"> {job.salary_range} </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Location</span>
            <span className="text-2xl font-medium capitalize"> {job.location} </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Employment type</span>
            <span className="text-2xl font-medium capitalize"> {job.job_type} </span>
          </div>
          <div className="flex gap-1">
            <span className="text-sm text-muted-foreground"> Posted {DateTime.fromISO(job.created_at).toRelative()} </span>
            <DotIcon className="size-4" />
            <span className="text-sm text-muted-foreground">395 views</span>
          </div>
          <Button className="w-full">Apply now</Button>

        </div>
      </div>
    </div>
  );
}
