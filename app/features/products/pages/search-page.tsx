import type { Route } from "./+types/search-page";
import { z } from "zod";
import { Hero } from "~/common/components/hero";
import { ProductCard } from "~/features/products/components/product-card";
import ProductPagination from "~/common/components/product-pagination";
import { Form } from "react-router";
import { Button, Input } from "~/common/components";
import { getPagesBySearch, getProductsBySearch } from "~/features/products/queries";
import { makeSSRClient } from "~/supa-client";

export const meta : Route.MetaFunction = () => {
    return [
        { title: "Search Product | WeMaKe" },
        { name: "description", content: "Search for products" }
    ];
}

const searchParams = z.object({
    query: z.string().optional().default(""),
    page: z.number().optional().default(1),
});

export async function loader({ request }: Route.LoaderArgs) {
    const url = new URL(request.url);
    const { success, data: parsedData } = searchParams.safeParse(
        Object.fromEntries(url.searchParams)
    );
    if (!success) {
        throw new Error("Invalid params");
    }

    if (parsedData.query === "") {
        return { products: [], totalPages: 1 };
    }

    const { client, headers } = makeSSRClient(request);
    const [ products, totalPages ] = await Promise.all([
        getProductsBySearch(client, {
            query: parsedData.query,
            page: Number(parsedData.page),
        }),
        getPagesBySearch(client, {
            query: parsedData.query,
        })
    ]);

    return { products, totalPages };
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
                {loaderData.products.map((product) => (
                    <ProductCard
                        key={product.product_id}
                        id={product.product_id}
                        name={product.name}
                        description={product.tagline}
                        reviewsCount={product.reviews}
                        viewsCount={product.views}
                        votesCount={product.upvotes}
                    />
                ))}
            </div>
            <ProductPagination totalPages={loaderData.totalPages} />
        </div>
    );
}