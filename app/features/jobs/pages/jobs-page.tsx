import { Plus } from "lucide-react";
import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardHeader } from "~/common/components/ui/card";
import { Link, useSearchParams } from "react-router";
import { Hero } from "~/common/components/hero";
import { JobCard } from "../components/job-card";
import { JOB_TYPES, LOCATION_TYPES, SALARY_RANGE } from "../constant";
import { cn } from "~/lib/utils";

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

export default function JobsPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const onFilterClick = (key: string, value: string, e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    setSearchParams((prev) => {
      prev.set(key, value);
      return prev;
    });
  };

  return (
    <div className="space-y-20">
      <Hero title="Jobs" description="Find your next opportunity" />
      <div className="grid grid-cols-1 xl:grid-cols-6 gap-10 relative">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:col-span-4 gap-5">
          {Array.from({ length: 20 }).map((_, index) => (
            <JobCard
              id={`jobId-${index}`}
              companyName="Meta"
              companyHq="San Francisco, CA"
              companyLogoUrl="https://github.com/facebook.png"
              postedAt="12 hours ago"
              title="Software Engineer"
              employmentType="Full-time"
              positionLocation="Remote"
              salary="$100,000 - $120,000"
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