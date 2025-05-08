import { Badge, Button, Card, CardContent, CardFooter, CardHeader, CardTitle } from "~/common/components";
import { Link } from "react-router";

interface JobsCardProps {
    id: string;
    company: string;
    companyLogoUrl: string;
    companyHq: string;
    title: string;
    positionLocation: string;
    postedAt: string;
    type: string;
    salary: string;
}

export function JobCard({
    id,
    company,
    companyLogoUrl,
    companyHq,
    title,
    positionLocation,
    postedAt,
    type,
    salary
}: JobsCardProps) {
    return (
        <Link to={`/jobs/${id}`}>
            <Card className="bg-transparent transition-colors hover:bg-card/50">
                <CardHeader>
                    <div className="flex items-center gap-4 mb-4">
                        <img
                            src={companyLogoUrl}
                            alt="Company Logo"
                            className="size-10 rounded-full"
                        />
                        <div className="space-x-2">
                            <span className="text-sm text-accent-foreground">{company}</span>
                            <span className="text-sx text-muted-foreground"> {postedAt}</span>
                        </div>
                    </div>
                    <CardTitle>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    <Badge variant="outline">{type}</Badge>
                    <Badge variant="outline">{positionLocation}</Badge>
                </CardContent>
                <CardFooter className="flex justify-between">
                    <div className="flex flex-col">
                        <span className="text-sm font-medium text-muted-foreground">
                            {salary}
                        </span>
                        <span className="text-sm font-medium text-muted-foreground">
                            {companyHq}
                        </span>
                    </div>
                    <Button variant="secondary" size="sm">
                        Apply now
                    </Button>
                </CardFooter>
            </Card>
        </Link>
    );
}