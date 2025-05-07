import type { Route } from "./+types/submit-page";
import { Hero } from "~/common/components/hero";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import SelectPair from "~/common/components/select-pair";
import { Button, Input, Label } from "~/common/components";
import { useState } from "react";

export const meta : Route.MetaFunction = () => {
    return [
        { title: "Submit Product | WeMaKe" },
        { name: "description", content: "Submit your product" },
    ];
}

export default function SubmitPage({ loaderData }: Route.ComponentProps) {
    const [icon, setIcon] = useState<string | null>(null);
    const onChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        if (event.target.files) {
            const file = event.target.files[0];
            // browser image url 생성
            setIcon(URL.createObjectURL(file));
        }
    };

    return (
        <div>
            <Hero
                title="Submit Product"
                subtitle="Share your product with the world"
            />
            <Form className="grid md:grid-cols-2 gap-10 max-w-screen-lg mx-auto">
                {/* Left */}
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
                    <Button type="submit" className="w-full" size="lg">Submit</Button>
                </div>

                {/* Right */}
                <div className="flex flex-col space-y-2">
                    {/* preview */}
                    <div className="size-40 rounded-xl shadow-xl">
                        {icon ? (
                            <img src={icon} alt="icon" className="object-cover w-full h-full" />
                        ) : null}
                    </div>
                    {/* Choose image file */}
                    <Label className="flex flex-col gap-1">
                        Icon
                    </Label>
                    <small className="text-muted-foreground">
                        This is the icon of your product.
                    </small>
                    <Input
                        type="file"
                        name="icon"
                        className="max-w-1/2"
                        onChange={onChange}
                        required
                    />
                    <div className="flex flex-col text-xs">
                        <span className="text-muted-foreground">
                            Recommended size: 128x128px
                        </span>
                        <span className="text-muted-foreground">
                            Allowed formats: PNG, JPEG
                        </span>
                        <span className="text-muted-foreground">
                            Max file size: 1MB
                        </span>
                    </div>
                </div>
            </Form>
        </div>
    );
}