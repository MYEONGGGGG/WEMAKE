import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/submit-team-page";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components";
import { Form, redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { createTeam } from "../mutations";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Create Team | WeMaKe" }
    ];
};

export const formSchema = z.object({
    name: z.string().min(1).max(20),
    stage: z.string(),
    size: z.coerce.number().min(1).max(100),
    equity: z.coerce.number().min(1).max(100),
    roles: z.string(),
    description: z.string().min(1).max(200),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);
    await getLoggedInUserId(client);
};

export const action = async ({ request }: Route.ActionArgs) => {
    const { client } = makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const formData = await request.formData();
    const { success, data, error } = formSchema.safeParse(
        Object.fromEntries(formData)
    );
    if (!success) {
        return { fieldErrors: error.flatten().fieldErrors };
    }
    const { team_id } = await createTeam(client, userId, {
        ...data,
    });
    return redirect(`/teams/${team_id}`);
};

export default function SubmitTeamPage({ actionData }: Route.ComponentProps) {
    return (
        <div className="space-y-20">
            <Hero
                title="Create team"
                subtitle="Create a team to share your ideas and projects"
            />

            <Form
                className="max-w-screen-2xl flex flex-col items-center gap-10 mx-auto"
                method="post"
            >
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
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.name}</p>
                    )}
                    <SelectPair
                        name="stage"
                        label="What is the stage of your product?"
                        description="Select the stage of your product"
                        placeholder="Select the stage of your product"
                        options={[
                            { label: "Idea", value: "idea" },
                            { label: "Prototype", value: "prototype" },
                            { label: "MVP", value: "mvp" },
                            { label: "Production", value: "product" },
                        ]}
                        required
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.stage}</p>
                    )}
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
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.size}</p>
                    )}
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
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.equity}</p>
                    )}
                    <InputPair
                        id="roles"
                        label="What roles are you looking for?"
                        placeholder="React Developer, Product Manager, etc."
                        description="(comma separated)"
                        name="roles"
                        type="text"
                        required
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.roles}</p>
                    )}
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
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-red-500">{actionData.fieldErrors.description}</p>
                    )}
                </div>
                <Button type="submit" className="w-full max-w-sm" size="lg">
                    Create team
                </Button>
            </Form>
        </div>
    );
}