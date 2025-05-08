import { Button } from "~/common/components";
import type { Route } from "./+types/jobs-page";
import { Hero } from "~/common/components/hero";
import { JobCard } from "~/features/jobs/components/job-card";
import { JOB_TYPES, LOCATIONS_TYPES, SALARY_RANGE } from "~/features/jobs/constants";
import { useSearchParams } from "react-router";
import { cn } from "~/lib/utils";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Jobs | WeMaKe" },
        { name: "description", content: "Browse jobs by title or description" }
    ];
};

export default function jobsPage() {
    const [searchParams, setSearchParams] = useSearchParams();
    const onFilterClick = (key: string, value: string) => {
        searchParams.set(key, value);
        setSearchParams(searchParams);
    };

    return (
        <div className="space-y-20">
            <Hero
                title="Jobs"
                subtitle="Search for jobs by title or description"
            />

            <div className="grid grid-cols-6 gap-20 items-start">
                {/* left */}
                <div className="grid grid-cols-3 col-span-4 gap-5">
                    {Array.from({ length: 20 }).map((_, index) => (
                        <JobCard
                            key={index}
                            id={`jobId-${index}`}
                            company="Tesla"
                            companyLogoUrl="https://github.com/facebook.png"
                            companyHq="San Francisco, CA"
                            title="Software Engineer"
                            postedAt="12 hours ago"
                            type="Full-time"
                            positionLocation="Remote"
                            salary="$100,000 - $120,000"
                        />
                    ))}
                </div>

                {/* right */}
                <div className="col-span-2 sticky top-20 flex flex-col gap-10">
                    <div className="flex flex-col items-start gap-2.5">
                        <h4 className="text-sm text-muted-foreground font-bold">Type</h4>
                        <div className="flex flex-wrap gap-2">
                            {
                                JOB_TYPES.map((type, index) => (
                                    <Button
                                        variant="outline"
                                        key={index}
                                        onClick={() => onFilterClick("type", type.value)}
                                        className={cn(
                                            type.value === searchParams.get("type") ? "bg-accent" : ""
                                        )}
                                    >
                                        {type.label}
                                    </Button>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-2.5">
                        <h4 className="text-sm text-muted-foreground font-bold">Location</h4>
                        <div className="flex flex-wrap gap-2">
                            {
                                LOCATIONS_TYPES.map((type, index) => (
                                    <Button
                                        variant="outline"
                                        key={index}
                                        onClick={() => onFilterClick("location", type.value)}
                                        className={cn(
                                            type.value === searchParams.get("location") ? "bg-accent" : ""
                                        )}
                                    >
                                        {type.label}
                                    </Button>
                                ))
                            }
                        </div>
                    </div>

                    <div className="flex flex-col items-start gap-2.5">
                        <h4 className="text-sm text-muted-foreground font-bold">Salary Range</h4>
                        <div className="flex flex-wrap gap-2">
                            {
                                SALARY_RANGE.map((range, index) => (
                                    <Button
                                        variant="outline"
                                        key={index}
                                        onClick={() => onFilterClick("salary", range)}
                                        className={cn(
                                            range === searchParams.get("salary") ? "bg-accent" : ""
                                        )}
                                    >
                                        {range}
                                    </Button>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}