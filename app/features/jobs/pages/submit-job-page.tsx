import type { Route } from "./+types/submit-job-page";
import { Hero } from "~/common/components/hero";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATIONS_TYPES, SALARY_RANGE } from "~/features/jobs/constants";
import { Button } from "~/common/components";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Submit Job | WeMaKe" },
        { name: "description", content: "Submit a job to WeMaKe"}
    ];
};

export default function SubmitJobPage() {
    return (
        <div>
            <Hero
                title="Post a Job"
                subtitle="Reach out to the best developers in to world"
            />
            <Form className="max-w-screen-2xl mx-auto flex flex-col gap-10 items-center">
                <div className="grid grid-cols-3 w-full gap-10">
                    <InputPair
                        id="postion"
                        label="Position"
                        description="(40 characters max)"
                        name="position"
                        maxLength={40}
                        type="text"
                        required
                        placeholder="i.e Senior React Developer"
                    />
                    <InputPair
                        id="overview"
                        label="Overview"
                        description="(40 characters max)"
                        name="overview"
                        maxLength={40}
                        type="text"
                        required
                        placeholder="We are finding a React developer to work on our new product."
                        textArea
                    />
                    <InputPair
                        id="responsibilities"
                        label="Responsibilities"
                        description="(40 characters max, comma separated)"
                        name="responsibilities"
                        maxLength={40}
                        type="text"
                        required
                        placeholder="i.e Implementing new features, fixing bugs, etc."
                        textArea
                    />
                    <InputPair
                        id="qualifications"
                        label="Qualifications"
                        description="(40 characters max, comma separated)"
                        name="qualifications"
                        maxLength={40}
                        type="text"
                        required
                        placeholder="i.e Implementing new features, fixing bugs, etc."
                        textArea
                    />
                    <InputPair
                        id="benefits"
                        label="Benefits"
                        description="(40 characters max, comma separated)"
                        name="benefits"
                        maxLength={40}
                        type="text"
                        required
                        placeholder="i.e Implementing new features, fixing bugs, etc."
                        textArea
                    />
                    <InputPair
                        id="skills"
                        label="Skills"
                        description="(40 characters max, comma separated)"
                        name="skills"
                        maxLength={40}
                        type="text"
                        required
                        placeholder="i.e TypeScript, React etc."
                        textArea
                    />
                    <InputPair
                        id="companyName"
                        label="Company Name"
                        description="(40 characters max, comma separated)"
                        name="companyName"
                        maxLength={40}
                        type="text"
                        required
                        placeholder="i.e wemake"
                    />
                    <InputPair
                        id="companyLogoUrl"
                        label="Company Logo URL"
                        description="(40 characters max, comma separated)"
                        name="companyLogoUrl"
                        type="url"
                        required
                        placeholder="i.e https://wemake.services/logo.png"
                    />
                    <InputPair
                        id="companyLocation"
                        label="Company Location"
                        description="(40 characters max, comma separated)"
                        name="companyLocation"
                        maxLength={40}
                        type="text"
                        required
                        placeholder="i.e Remote, New York, etc."
                    />
                    <InputPair
                        id="applyUrl"
                        label="Apply URL"
                        description="(40 characters max, comma separated)"
                        name="applyUrl"
                        type="url"
                        required
                        placeholder="i.e https://wemake.services/apply"
                    />
                    <SelectPair
                        label="Job Type"
                        description="Select the type of job"
                        name="jobType"
                        required
                        placeholder="Select a job type"
                        options={JOB_TYPES.map((type) => ({
                            label: type.label,
                            value: type.value
                        }))}
                    />
                    <SelectPair
                        label="Location"
                        description="Select the location of the job"
                        name="jobLocation"
                        required
                        placeholder="Select the location of the job"
                        options={LOCATIONS_TYPES.map((location) => ({
                            label: location.label,
                            value: location.value
                        }))}
                    />
                    <SelectPair
                        label="Salary Range"
                        description="Select the salary range of the job"
                        name="salaryRange"
                        required
                        placeholder="Select the salary range of the job"
                        options={SALARY_RANGE.map((salary) => ({
                            label: salary,
                            value: salary
                        }))}
                    />
                </div>
                <Button type="submit" className="w-full max-w-sm" size="lg">
                    Post job for $100
                </Button>
            </Form>
        </div>
    );
}