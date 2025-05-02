import { Link } from "react-router";
import { Avatar, AvatarFallback, AvatarImage } from "~/common/components/ui/avatar";
import { Badge } from "~/common/components/ui/badge";
import { Button } from "~/common/components/ui/button";
import { Card, CardHeader, CardTitle, CardFooter } from "~/common/components/ui/card";

interface TeamCardProps {
    id: string;
    leaderUsername: string;
    leaderAvatarUrl: string;
    positions: string[];
    projectDescription: string;
}

export function TeamCard({
    id,
    leaderUsername,
    leaderAvatarUrl,
    positions,
    projectDescription,
}: TeamCardProps) {
    return (
        <Link to={`/teams/${id}`}>
            <Card className="bg-transparent hover:bg-card/50 transition-colors">
                <CardHeader className="flex flex-row items-center">
                    <CardTitle className="text-base leading-loose">
                        <Badge variant="secondary" className="inline-flex shadow-sm items-center">
                            @{leaderUsername}
                            <Avatar>
                                <AvatarFallback>N</AvatarFallback>
                                <AvatarImage src={leaderAvatarUrl} />
                            </Avatar>
                        </Badge>
                        <span className="text-sm"> is looking for </span>
                        {positions.map((position, index) => (
                            <Badge key={index} className="text-base">{position}</Badge>
                        ))}
                        <span className="text-sm"> to build </span>
                        <span className="text-sm">
                            {projectDescription}
                        </span>
                    </CardTitle>
                </CardHeader>
                <CardFooter className="justify-end">
                    <Button variant="link" className="text-base">
                        Join Team &rarr;
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
} 