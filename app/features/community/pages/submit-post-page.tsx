import type { Route } from "./+types/submit-post-page";
import { Hero } from "~/common/components/hero";
import { Form, redirect } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components";
import { makeSSRClient } from "~/supa-client";
import { getTopics } from "~/features/community/queries";
import { getLoggedInUserId } from "~/features/users/queries";
import { z } from "zod";
import { createPost } from "~/features/community/mutations";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Submit Post | WeMaKe" }
    ];
};

const formSchema = z.object({
    title: z.string().min(1).max(40),
    category: z.string().min(1).max(100),
    content: z.string().min(1).max(1000),
});

export const loader = async ({ request }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);
    await getLoggedInUserId(client);
    const topics = await getTopics(client);
    return { topics };
};

export const action = async ({ request }: Route.ActionArgs) => {
    const { client } = makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const formData = await request.formData();
    const { success, error, data } = formSchema.safeParse(
        Object.fromEntries(formData)
    );
    if (!success) {
        return {
            fieldErrors: error.flatten().fieldErrors,
        };
    }
    const { title, category, content } = data;
    const { post_id } = await createPost(client, {
        title,
        category,
        content,
        userId,
    });

    return redirect(`/community/${post_id}`);
};

export default function submitPostPage({
    loaderData,
    actionData,
}: Route.ComponentProps) {
    return (
        <div className="space-y-20">
            <Hero
                title="Submit Post"
                subtitle="Submit your post to the community"
            />

            <Form
                className="flex flex-col gap-10 space-y-10 max-w-screen-md mx-auto"
                method="post"
            >
                <InputPair
                    label="Title"
                    name="title"
                    id="title"
                    description="(40 characters or less)"
                    required
                    placeholder="i.e What is the best productivity tool for developers?"
                />
                {actionData && "fieldErrors" in actionData && (
                    <div className="text-red-500">
                        {actionData.fieldErrors.title?.join(", ")}
                    </div>
                )}
                <SelectPair
                    required
                    name="category"
                    label="Category"
                    description="Select the category that best fits your discussion"
                    placeholder="i.e Productivity"
                    options={loaderData.topics.map((topic) => ({
                        label: topic.name,
                        value: topic.slug,
                    }))}
                />
                {actionData && "fieldErrors" in actionData && (
                    <div className="text-red-500">
                        {actionData.fieldErrors.category?.join(", ")}
                    </div>
                )}
                <InputPair
                    label="Content"
                    name="content"
                    id="content"
                    description="(1000 characters or less)"
                    required
                    placeholder="i.e I'm looking for a productivity tool that can help me manage my time better"
                    textArea
                />
                {actionData && "fieldErrors" in actionData && (
                    <div className="text-red-500">
                        {actionData.fieldErrors.content?.join(", ")}
                    </div>
                )}
                <Button className="mx-auto">Create Discussion</Button>
            </Form>
        </div>
    );
}