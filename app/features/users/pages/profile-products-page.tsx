import type { Route } from "./+types/profile-products-page";
import { ProductCard } from "~/features/products/components/product-card";
import { getUserProducts } from "~/features/users/queries";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Profile products page | WeMaKe" }
    ];
};

export const loader = async ({params}: Route.LoaderArgs) => {
    const products = await getUserProducts(params.username);
    return { products };
};

export default function profileProductsPage({loaderData}: Route.ComponentProps) {
    return(
        <div className="flex flex-col gap-5">
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
    );
}