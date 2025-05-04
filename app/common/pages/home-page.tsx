import { Link, type MetaFunction } from "react-router";
import { Button } from "~/common/components";
import { ProductCard } from "~/common/components/product-card";
import { ArrowRightIcon } from "lucide-react";

export const meta : MetaFunction = () => {
    return [
        { title: "Home | WeMaKe" },
        { name: "description", content: "Welcome to WeMaKe" },
    ];
}

export default function HomePage() {
    return (
      <div className="px-20">
          <div className="grid grid-cols-3 gap-4">
              <div>
                  <h2 className="text-5xl font-bold leading-tight tracking-tight">
                      Latest Discussions
                  </h2>
                  <p className="text-xl font-light text-foreground">
                      The latest discussions from our community.
                  </p>
                  <Button variant="link" asChild className="text-lg p-0">
                      <Link to="/community">
                          Explore All Products
                          <ArrowRightIcon />
                      </Link>
                  </Button>
              </div>

              {/* product card */}
              {Array.from({ length: 10 }).map((_, i) => (
                  <ProductCard
                      key={i}
                      id="productId"
                      name="Product Name"
                      description="Product Description"
                      commentsCount={12}
                      viewsCount={12}
                      votesCount={120}
                  />
              ))}
          </div>
      </div>
    );
}