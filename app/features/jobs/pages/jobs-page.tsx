import { Button } from "~/common/components";
import type { Route } from "./+types/jobs-page";
import { Hero } from "~/common/components/hero";
import { JobCard } from "~/features/jobs/components/job-card";
import { JOB_TYPES, LOCATIONS_TYPES, SALARY_RANGE } from "~/features/jobs/constants";
import { data, useSearchParams } from "react-router";
import { cn } from "~/lib/utils";
import { getJobs } from "~/features/jobs/queries";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Jobs | WeMaKe" },
        { name: "description", content: "Browse jobs by title or description" }
    ];
};

const searchParamsSchema = z.object({
    type: z
        .enum(JOB_TYPES.map((type) => type.value) as [string, ...string[]])
        .optional(),
    location: z
        .enum(LOCATIONS_TYPES.map((type) => type.value) as [string, ...string[]])
        .optional(),
    salary: z
        .enum(SALARY_RANGE)
        .optional(),
});

export const loader = async ({request}: Route.LoaderArgs) => {
    const url = new URL(request.url);
    const {success, data: parsedData} = searchParamsSchema.safeParse(Object.fromEntries(url.searchParams));
    if (!success) {
        throw data(
            {
                error_code: "Invalid_search_params",
                message: "Invalid search params",
            },
            { status: 400 },
        );
    }

    const { client, headers } = makeSSRClient(request);
    const jobs = await getJobs(client, {
        limit: 40,
        location: parsedData.location,
        type: parsedData.type,
        salary: parsedData.salary,
    });

    return { jobs };
};

export default function jobsPage({ loaderData }: Route.ComponentProps) {
    const [searchParams, setSearchParams] = useSearchParams();
    const onFilterClick = (key: string, value: string) => {
        if (value === searchParams.get(key)) {
            searchParams.delete(key);
            setSearchParams(searchParams);
        } else {
            searchParams.set(key, value);
            setSearchParams(searchParams);
        }
    };

    return (
        <div className="space-y-20">
            <Hero
                title="Jobs"
                subtitle="Search for jobs by title or description"
            />

            <div className="grid grid-cols-1 xl:grid-cols-6 gap-20 items-start">
                {/* left */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 col-span-4 gap-5">
                    {loaderData.jobs.map((job) => (
                        <JobCard
                            key={job.job_id}
                            id={job.job_id}
                            company={job.company_name}
                            companyLogoUrl={job.company_logo}
                            companyHq={job.company_location}
                            title={job.position}
                            positionLocation={job.location}
                            postedAt={job.created_at}
                            type={job.job_type}
                            salary={job.salary_range}
                        />
                    ))}
                </div>

                {/* right */}
                <div className="xl:col-span-2 sticky top-20 flex flex-col gap-10">
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