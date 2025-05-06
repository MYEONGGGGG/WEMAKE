import type { Route } from "./+types/submit-page";
import { Hero } from "~/common/components/hero";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";

export const meta : Route.MetaFunction = () => {
    return [
        { title: "Submit Product | WeMaKe" },
        { name: "description", content: "Submit your product" },
    ];
}

export default function SubmitPage({ loaderData }: Route.ComponentProps) {
    return (
        <div>
            <Hero
                title="Submit Product"
                subtitle="Share your product with the world"
            />
            <Form className="grid md:grid-cols-2 gap-10 max-w-screen-lg mx-auto">
                <div className="space-y-5 order-1 md:order-0">
                    <InputPair
                        label="Name"
                        description="This is the name of your product"
                        id="name"
                        name="name"
                        type="text"
                        required
                        placeholder="Name of your product"
                    />
                    <InputPair
                        label="Tagline"
                        description="60 characters or less"
                        id="tagline"
                        name="tagline"
                        type="text"
                        required
                        placeholder="A concise description of your product"
                    />
                    <InputPair
                        label="URL"
                        description="The URL of your product"
                        id="url"
                        name="url"
                        type="url"
                        required
                        placeholder="https://example.com"
                    />
                    <InputPair
                        textArea
                        label="Description"
                        description="A detailed description of your product"
                        id="description"
                        name="description"
                        type="text"
                        required
                        placeholder="A detailed description of your product"
                    />
                    <SelectPair
                        label="Category"
                        description="The category of your product"
                        name="category"
                        required
                        placeholder="Select a category"
                        options={[
                            { value: "1", label: "Category 1" },
                            { value: "2", label: "Category 2" },
                            { value: "3", label: "Category 3" },
                        ]}
                    />
                </div>
            </Form>
        </div>
    );
}