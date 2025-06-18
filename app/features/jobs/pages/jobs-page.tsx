import { Plus } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardHeader } from "~/common/components/ui/card";
import { data, Link, useSearchParams } from "react-router";
import { Hero } from "~/common/components/hero";
import { JobCard } from "../components/job-card";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constant";
import { cn } from "~/lib/utils";
import type { Route } from "./+types/jobs-page";
import { getJobs } from "../queries";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";

interface Job {
  id: string;
  title: string;
  company: string;
  location: string;
  type: string;
  postedAt: string;
}

export function meta() {
  return [
    { title: "Jobs | WeMake" },
    { name: "description", content: "Find your next opportunity" },
  ];
}

const searchParamsSchema = z.object({
  type: z.enum(JOB_TYPES.map((type) => type.value) as [string, ...string[]]).optional(),
  location: z.enum(LOCATION_TYPES.map((location) => location.value) as [string, ...string[]]).optional(),
  salary: z.enum(SALARY_RANGE).optional(),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
  const {client, headers} = makeSSRClient(request);
  const url = new URL(request.url);
  const { success, data: parsedParams } = searchParamsSchema.safeParse(Object.fromEntries(url.searchParams));
  if (!success) {
    throw data({
      error_code: "INVALID_SEARCH_PARAMS",
      message: "Invalid search params",
    }, { status: 400 });
  }
  const jobs = await getJobs(client, { limit: 40, 
    type: parsedParams.type, 
    location: parsedParams.location, 
    salary: parsedParams.salary });
  return { jobs };
}

export default function JobsPage({ loaderData }: Route.ComponentProps) {
  const [searchParams, setSearchParams] = useSearchParams();
  const onFilterClick = (key: string, value: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchParams((prev) => {
      if (prev.get(key) === value) {
        prev.delete(key);
      } else {
        prev.set(key, value);
      }
      return prev;
    });
  };

  return (
    <div className="space-y-20">
      <Hero title="Jobs" description="Find your next opportunity" />
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-1 lg:grid-cols-2 xl:col-span-4 gap-5">
          {loaderData.jobs.map((job) => (
            <JobCard
              id={job.job_id.toString()}
              companyName={job.company_name}
              companyHq={job.company_location}
              companyLogoUrl={job.company_logo_url}
              postedAt={job.created_at}
              title={job.position}
              employmentType={job.job_type.toString()}
              positionLocation={job.location.toString()}
              salary={job.salary_range.toString()}
            />
          ))}
        </div>
        <div className="flex flex-col col-span-2 space-y-5 sticky top-20 h-fit">
          <Card>
            <CardHeader>
              <h3 className="text-lg font-semibold">Filters</h3>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-2.5 items-start">
                <h4 className="text-sm text-muted-foreground font-bold">Type</h4>
                <div className="flex flex-wrap gap-2">
                  {JOB_TYPES.map((jobType) => (
                    <Button 
                      variant="outline"
                      onClick={(e) => onFilterClick("type", jobType.value, e)}
                      className={cn(
                         searchParams.get("type") === jobType.value && "bg-accent text-accent-foreground"
                      )}
                    >
                      <Link to={`/jobs?type=${jobType.value}`}>{jobType.label}</Link>
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2.5 items-start">
                <h4 className="text-sm text-muted-foreground font-bold">Location</h4>
                <div className="flex flex-wrap gap-2">
                  {LOCATION_TYPES.map((locationType) => (
                    <Button 
                      variant="outline" 
                      onClick={(e) => onFilterClick("location", locationType.value, e)} 
                      className={cn(  
                        searchParams.get("location") === locationType.value && "bg-accent text-accent-foreground"
                      )}
                    >
                      <Link to={`/jobs?location=${locationType.value}`}>{locationType.label}</Link>
                    </Button>
                  ))}
                </div>
              </div>
              <div className="flex flex-col gap-2.5 items-start">
                <h4 className="text-sm text-muted-foreground font-bold">Salary</h4>
                <div className="flex flex-wrap gap-2">
                  {SALARY_RANGE.map((salaryRange) => (
                    <Button 
                      variant="outline" 
                      onClick={(e) => onFilterClick("salary", salaryRange, e)} 
                      className={cn(
                        searchParams.get("salary") === salaryRange && "bg-accent text-accent-foreground"
                      )}
                    >
                      <Link to={`/jobs?salary=${salaryRange}`}>{salaryRange}</Link>
                    </Button>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}