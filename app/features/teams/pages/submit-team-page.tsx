import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-team-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { JOB_TYPES, LOCATIONS_TYPES, SALARY_RANGE } from "~/features/jobs/constants";
import { Button } from "~/common/components";
import { Form } from "react-router";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Create Team | WeMaKe" }
    ];
};

export default function SubmitTeamPage() {
    return (
        <div className="space-y-20">
            <Hero
                title="Create team"
                subtitle="Create a team to share your ideas and projects"
            />

            <Form className="max-w-screen-2xl mx-auto flex flex-col gap-10 items-center">
                <div className="grid grid-cols-3 w-full gap-10">
                    <InputPair
                        id="name"
                        label="What is the name of your product?"
                        placeholder="i.e WeMake"
                        description="(20 characters max)"
                        name="name"
                        maxLength={20}
                        type="text"
                        required
                    />
                    <SelectPair
                        name="stage"
                        label="What is the stage of your product?"
                        description="Select the stage of your product"
                        placeholder="Select the stage of your product"
                        options={[
                            { label: "Idea", value: "idea" },
                            { label: "Prototype", value: "prototype" },
                            { label: "MVP", value: "mvp" },
                            { label: "Production", value: "production" },
                        ]}
                        required
                    />
                    <InputPair
                        id="size"
                        label="What is the size of your team?"
                        description="(1-100)"
                        name="size"
                        max={20}
                        min={1}
                        type="number"
                        required
                    />
                    <InputPair
                        id="equity"
                        label="How much equity are you willing to give to your team?"
                        description="(*each)"
                        name="equity"
                        max={20}
                        min={1}
                        type="number"
                        required
                    />
                    <InputPair
                        id="roles"
                        label="What roles are you looking for?"
                        placeholder="React Developer, Product Manager, etc."
                        description="(comma separated)"
                        name="roles"
                        type="text"
                        required
                    />
                    <InputPair
                        id="description"
                        label="What is the description of your product?"
                        placeholder="i.e We are building a product that will help developers manage their time better."
                        description="(200 characters max)"
                        name="description"
                        type="text"
                        required
                        textArea
                    />
                </div>
                <Button type="submit" className="w-full max-w-sm" size="lg">
                    Create team
                </Button>
            </Form>
        </div>
    );
}