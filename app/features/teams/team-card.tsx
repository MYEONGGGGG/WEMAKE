import { Link } from "react-router";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Badge, Button,
    Card,
    CardFooter,
    CardHeader,
    CardTitle
} from "~/common/components";

interface TeamCardProps {
    id: number;
    leaderUsername: string;
    leaderAvatarUrl: string | null;
    positions: string[];
    projectsDescription: string;
}

export function TeamCard({
    id,
    leaderUsername,
    leaderAvatarUrl,
    positions,
    projectsDescription,
}: TeamCardProps) {
    return (
        <Link to={`/teams/${id}`} className="block">
            <Card className="bg-transparent hover:bg-card/50 transition-colors flex flex-col justify-between">
                <CardHeader className="flex flex-row items-center">
                    <CardTitle className="text-base leading-loose">
                        <Badge variant="secondary" className="inline-flex shadow-sm items-center text-base">
                            <span>{leaderUsername}</span>
                            <Avatar>
                                <AvatarFallback>{leaderUsername[0]}</AvatarFallback>
                                {leaderAvatarUrl ? <AvatarImage src={leaderAvatarUrl} /> : null}
                            </Avatar>
                        </Badge>
                        <span>is Looking for</span>
                        {positions.map((position, index) => (
                            <Badge key={index} className="text-base">
                                {position}
                            </Badge>
                        ))}
                        <span> to build </span>
                        <span>{projectsDescription}</span>
                    </CardTitle>
                </CardHeader>
                <CardFooter className="justify-end">
                    <Button variant="link" asChild>
                        Join team &rarr;
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}