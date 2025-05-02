import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardHeader } from "~/common/components/ui/card";
import { Hero } from "~/common/components/hero";
import { Badge } from "~/common/components/ui/badge";
import { DotIcon } from "lucide-react";


export function meta() {
  return [
    { title: "Job Details | WeMake" },
    { name: "description", content: "View job details and apply" },
  ];
}

export default function JobPage() {
  return (
    <div>
      <div className="bg-gradient-to-tr from-primary/80 to-primary/10 h-60 w-full rounded-lg"></div>
      <div className="grid grid-cols-6 gap-20 items-start">
        <div className="col-span-4 space-y-10">
          <div className="-mt-20 object-cover overflow-hidden">
            <img
              src="https://github.com/facebook.png"
              alt="company logo"
              className="size-40 rounded-full bg-white relative left-10" />
          </div>
          <div>
            <h1 className="text-2xl font-bold">Software Engineer</h1>
            <h4 className="text-sm text-muted-foreground">
              Meta Inc.
            </h4>
          </div>
          <div className="flex gap-2">
            <Badge variant="secondary">Full-time</Badge>
            <Badge variant="secondary">Remote</Badge>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Overview</h4>
            <p className="text-lg text-muted-foreground">
              We are looking for a software engineer with a passion for building
              scalable and efficient systems.
            </p>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Responsibilities</h4>
            <ul className="text-lg list-disc list-inside ">
              {["Desgin and implement scalable systems", "Collaborate with other engineers to build new features", "Optimize performance and maintainability  "].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Qualifications</h4>
            <ul className="text-lg list-disc list-inside ">
              {["Bachelor's degree in Computer Science", "3+ years of experience in software development", "Strong understanding of object-oriented programming and design patterns"].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Skills</h4>
            <ul className="text-lg list-disc list-inside ">
              {["React", "Node.js", "Typescript", "Docker", "Kubernetes"].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
          <div className="space-y-2.5">
            <h4 className="text-2xl font-bold">Benefits</h4>
            <ul className="text-lg list-disc list-inside ">
              {["Healthcare", "Dental", "Vision", "401k", "PTO"].map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>
        </div>
        <div className="col-span-2 sticky top-20 border rounded-xl mt-32 space-y-5 p-6">
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Avg. salary</span>
            <span className="text-2xl font-medium"> $100,000 - $120,000 </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Location</span>
            <span className="text-2xl font-medium"> Remote </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-sm text-muted-foreground">Employment type</span>
            <span className="text-2xl font-medium"> Full-time </span>
          </div>
          <div className="flex gap-1">
            <span className="text-sm text-muted-foreground"> Posted 2 days ago </span>
            <DotIcon className="size-4" />
            <span className="text-sm text-muted-foreground">395 views</span>
          </div>
          <Button className="w-full">Apply now</Button>

        </div>
      </div>
    </div>
  );
}
