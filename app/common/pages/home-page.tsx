import type { Route } from "./+types/home-page";
import { Link, type MetaFunction } from "react-router";
import { Button } from "~/common/components";
import { ProductCard } from "~/features/products/components/product-card";
import { PostCard } from "~/features/community/components/post-card";
import { IdeaCard } from "~/features/ideas/components/idea-card";
import { JobCard } from "~/features/jobs/components/job-card";
import { TeamCard } from "~/features/teams/team-card";
import { getProductsByDateRange } from "~/features/products/queries";
import { DateTime } from "luxon";

export const meta : MetaFunction = () => {
    return [
        { title: "Home | WeMaKe" },
        { name: "description", content: "Welcome to WeMaKe" },
    ];
}

export const loader = async () => {
    const products = await getProductsByDateRange({
        startDate: DateTime.now().startOf("day"),
        endDate: DateTime.now().endOf("day"),
        limit: 7,
    });

    return { products }
};

export default function HomePage({ loaderData }: Route.ComponentProps) {
    return (
      <div className="px-0 md:px-20 space-y-20 md:space-y-40">

          {/* product card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-center md:text-left">
              <div>
                  <h2 className="text-2xl md:text-5xl font-bold leading-tight tracking-tight">
                      Today's Products
                  </h2>
                  <p className="text-lg md:text-xl font-light text-foreground">
                      The best products made by our community today.
                  </p>
                  <Button variant="link" asChild className="text-sm md:text-lg p-0">
                      <Link to="/products/leaderboards">
                          Explore all products &rarr;
                      </Link>
                  </Button>
              </div>
              {loaderData.products.map((product) => (
                  <ProductCard
                      key={product.product_id}
                      id={product.product_id.toString()}
                      name={product.name}
                      description={product.description}
                      reviewsCount={product.reviews}
                      viewsCount={product.views}
                      votesCount={product.upvotes}
                  />
              ))}
          </div>

          {/* post card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-center md:text-left">
              <div>
                  <h2 className="text-2xl md:text-5xl font-bold leading-tight tracking-tight">
                      Latest Discussions
                  </h2>
                  <p className="text-lg md:text-xl font-light text-foreground">
                      The latest discussions from our community.
                  </p>
                  <Button variant="link" asChild className="text-sm md:text-lg p-0">
                      <Link to="/community">
                          Explore All Products &rarr;
                      </Link>
                  </Button>
              </div>

              {Array.from({ length: 11 }).map((_, index) => (
                  <PostCard
                      key={index}
                      id={index}
                      title="What is the best producitivity tool?"
                      author="Nico"
                      authorAvatarUrl="https://github.com/apple.png"
                      category="Productivity"
                      postedAt="12 hours ago"
                  />
              ))}
          </div>

          {/* ideas GPT card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-center md:text-left">
              <div>
                  <h2 className="text-2xl md:text-5xl font-bold leading-tight tracking-tight">
                      IdeasGPT
                  </h2>
                  <p className="text-lg md:text-xl font-light text-foreground">
                      Find ideas for your next project.
                  </p>
                  <Button variant="link" asChild className="text-sm md:text-lg p-0">
                      <Link to="/ideas">
                          Explore All ideas &rarr;
                      </Link>
                  </Button>
              </div>

              {Array.from({ length: 5 }).map((_, index) => (
                  <IdeaCard
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

          {/* Jobs Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-center md:text-left">
              <div>
                  <h2 className="text-2xl md:text-5xl font-bold leading-tight tracking-tight">
                      Letest Jobs
                  </h2>
                  <p className="text-lg md:text-xl font-light text-foreground">
                      Find your dream job.
                  </p>
                  <Button variant="link" asChild className="text-sm md:text-lg p-0">
                      <Link to="/jobs">
                          Explore All jobs &rarr;
                      </Link>
                  </Button>
              </div>

              {Array.from({ length: 11 }).map((_, index) => (
                  <JobCard
                      key={index}
                      id={`jobsId-${index}`}
                      company="Tesla"
                      companyLogoUrl="https://github.com/teslamotors.png"
                      companyHq="San Francisco, CA"
                      title="Software Engineer"
                      positionLocation="Remote"
                      postedAt="12 hours ago"
                      type="Full-time"
                      salary="$100,000 - $120,000"
                  />
              ))}
          </div>

          {/* Team Card */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 text-center md:text-left">
              <div>
                  <h2 className="text-2xl md:text-5xl font-bold leading-tight tracking-tight">
                      Find a Team mate
                  </h2>
                  <p className="text-lg md:text-xl font-light text-foreground">
                      Join a team looking for a new member.
                  </p>
                  <Button variant="link" asChild className="text-lg p-0">
                      <Link prefetch="viewport" to="/teams">
                          Explore All teams &rarr;
                      </Link>
                  </Button>
              </div>

              {Array.from({ length: 7 }).map((_, index) => (
                  <TeamCard
                      key={index}
                      id={`teamId-${index}`}
                      leaderUsername="@lynn"
                      leaderAvatarUrl="https://github.com/inthetiger.png"
                      positions={["React Developer", "Backend Developer", "Product Manager"]}
                      projectsDescription="a new social media platform"
                  />
              ))}
          </div>

      </div>
    );
}