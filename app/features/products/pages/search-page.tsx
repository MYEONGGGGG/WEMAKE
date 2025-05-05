import type { Route } from "./+types/search-page";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "~/features/products/components/product-card";
import ProductPagination from "~/common/components/product-pagination";
import { Form } from "react-router";
import { Button, Input } from "~/common/components";

export const meta : Route.MetaFunction = () => {
    return [
        { title: "Search Product | WeMaKe" },
        { name: "description", content: "Search for products" }
    ];
}

const paramsSchema = z.object({
    query: z.string().optional().default(""),
    page: z.number().optional().default(1),
});

export const loader = async ({ request }: Route.LoaderArgs)=> {
    const url = new URL(request.url);
    const { success, data: parsedData } = paramsSchema.safeParse(
        Object.fromEntries(url.searchParams)
    );
    if (!success) {
        throw new Error("Invalid params");
    }
}

export default function SearchPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-10">
            <Hero
                title="Search"
                subtitle="Search for products by title or description"
            />

            <Form className="flex justify-center max-w-screen-sm items-center gap-2 mx-auto">
                <Input name="query" placeholder="Search for products" className="text-lg" />
                <Button type="submit">Search</Button>
            </Form>

            <div className="space-y-5 w-full max-w-screen-md mx-auto">
                {Array.from({ length: 11 }).map((_, index) => (
                    <ProductCard
                        key={index}
                        id={`productId-${index}`}
                        name="Product Name"
                        description="Product Description"
                        commentsCount={12}
                        viewsCount={12}
                        votesCount={120}
                    />
                ))}
            </div>
            <ProductPagination totalPages={10} />
        </div>
    );
}