import type { Route } from "./+types/submit-post-page";
import { Hero } from "~/common/components/hero";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button } from "~/common/components";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Start Social | WeMaKe" }
    ];
};

export default function submitPostPage() {
    return (
        <div className="space-y-20">
            <Hero
                title="Submit Post"
                subtitle="Submit your post to the community"
            />

            <Form className="flex flex-col gap-10 space-y-10 max-w-screen-md mx-auto">
                <InputPair
                    label="Title"
                    name="title"
                    id="title"
                    description="(40 characters or less)"
                    required
                    placeholder="i.e What is the best productivity tool for developers?"
                />
                <SelectPair
                    required
                    name="category"
                    label="Category"
                    description="Select the category that best fits your discussion"
                    placeholder="i.e Productivity"
                    options={[
                        { value: "1", label: "Productivity" },
                        { value: "2", label: "Technology" },
                        { value: "3", label: "Design" },
                    ]}
                />
                <InputPair
                    label="Content"
                    name="content"
                    id="content"
                    description="(1000 characters or less)"
                    required
                    placeholder="i.e I'm looking for a productivity tool that can help me manage my time better"
                    textArea
                />
                <Button className="mx-auto">Create Discussion</Button>
            </Form>
        </div>
    );
}