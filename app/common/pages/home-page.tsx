import { Link, type MetaFunction } from "react-router";
import { Button } from "~/common/components";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/components/post-card";
import { IdeasCard } from "~/features/ideas/components/ideas-card";

export const meta : MetaFunction = () => {
    return [
        { title: "Home | WeMaKe" },
        { name: "description", content: "Welcome to WeMaKe" },
    ];
}

export default function HomePage() {
    return (
      <div className="px-20 space-y-40">

          {/* product card */}
          <div className="grid grid-cols-3 gap-4">
              <div>
                  <h2 className="text-5xl font-bold leading-tight tracking-tight">
                      Today's Products
                  </h2>
                  <p className="text-xl font-light text-foreground">
                      The best products made by our community today.
                  </p>
                  <Button variant="link" asChild className="text-lg p-0 text-destructive">
                      <Link to="/products/leaderboards">
                          Explore all products &rarr;
                      </Link>
                  </Button>
              </div>
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

          {/* post card */}
          <div className="grid grid-cols-3 gap-4">
              <div>
                  <h2 className="text-5xl font-bold leading-tight tracking-tight">
                      Latest Discussions
                  </h2>
                  <p className="text-xl font-light text-foreground">
                      The latest discussions from our community.
                  </p>
                  <Button variant="link" asChild className="text-lg p-0 text-destructive">
                      <Link to="/community">
                          Explore All Products &rarr;
                      </Link>
                  </Button>
              </div>

              {Array.from({ length: 11 }).map((_, index) => (
                  <PostCard
                      key={index}
                      id={`postId-${index}`}
                      title="What is the best producitivity tool?"
                      author="Nico"
                      authorAvatarUrl="https://github.com/apple.png"
                      category="Productivity"
                      postedAt="12 hours ago"
                  />
              ))}
          </div>

          {/* ideas GPT card */}
          <div className="grid grid-cols-3 gap-4">
              <div>
                  <h2 className="text-5xl font-bold leading-tight tracking-tight">
                      IdeasGPT
                  </h2>
                  <p className="text-xl font-light text-foreground">
                      Find ideas for your next project.
                  </p>
                  <Button variant="link" asChild className="text-lg p-0 text-destructive">
                      <Link to="/ideas">
                          Explore All ideas &rarr;
                      </Link>
                  </Button>
              </div>

              {Array.from({ length: 5 }).map((_, index) => (
                  <IdeasCard
                      key={index}
                      id={`ideasId-${index}`}
                      title="A startup that creates AI-powered generated personal trainer,
                        delivering customized fitness recommendations and tracking of
                        progress using a mobile app to track workouts and progress as well
                        as a website to manage the business."
                      viewsCount={123}
                      postedAt="12 hours ago"
                      likesCount={12}
                      claimed={index % 2 === 0}
                  />
              ))}
          </div>
      </div>
    );
}