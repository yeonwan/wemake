import { Link } from "react-router";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/common/components/ui/card";
import { Building2, MapPin, Clock, DollarSign } from "lucide-react";
import { DateTime } from "luxon";

interface JobCardProps {
    id: string;
    companyName: string;
    companyHq: string;
    companyLogoUrl: string;
    postedAt: string;
    title: string;
    employmentType: string;
    positionLocation: string;
    salary: string;
}

export function JobCard({
    id,
    companyName,
    companyHq,
    companyLogoUrl,
    postedAt,
    title,
    employmentType,
    positionLocation,
    salary,
}: JobCardProps) {
    return (
        <Link to={`/jobs/${id}`}>
            <Card className="hover:shadow-lg transition-all duration-300 border-2 hover:border-primary/20 w-full max-w-2xl">
                <CardHeader className="space-y-4">
                    <div className="flex items-center gap-4">
                        <img
                            src={companyLogoUrl}
                            alt={`${companyName} Logo`}
                            className="size-12 rounded-xl object-cover border-2 border-muted"
                        />
                        <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2 justify-between">
                                <h3 className="font-semibold text-lg truncate">{companyName}</h3>
                                <span className="text-sm text-muted-foreground font-medium whitespace-nowrap flex-shrink-0">{DateTime.fromISO(postedAt).toRelative()}</span>
                            </div>
                        </div>
                    </div>
                    <CardTitle className="text-xl font-bold hover:text-primary transition-colors">
                        {title}
                    </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="flex flex-wrap gap-2">
                        <Badge variant="outline" className="flex items-center gap-1">
                            <Building2 className="size-3" />
                            {positionLocation.charAt(0).toUpperCase() + positionLocation.slice(1)}
                        </Badge>
                        <Badge variant="outline" className="flex items-center gap-1">
                            <DollarSign className="size-3" />
                            {salary}
                        </Badge>
                    </div>
                </CardContent>
                <CardFooter className="flex flex-col justify-between items-start border-t ">
                    <div className="flex items-center gap-2 text-sm text-muted-foreground max-w-[60%]">
                        <MapPin className="size-4 flex-shrink-0" />
                        <span className="text-xs truncate">{companyHq}</span>
                    </div>
                    <Button 
                        variant="default" 
                        size="sm" 
                        className="mt-4 font-medium transition-all duration-300 hover:scale-105 hover:shadow-md"
                    >
                        Apply Now
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
} 