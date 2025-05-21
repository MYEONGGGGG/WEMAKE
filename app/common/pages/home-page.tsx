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
import { getPosts } from "~/features/community/queries";
import { getGptIdeas } from "~/features/ideas/queries";
import { getJobs } from "~/features/jobs/queries";
import { getTeams } from "~/features/teams/queries";
import { makeSSRClient } from "~/supa-client";

export const meta : MetaFunction = () => {
    return [
        { title: "Home | WeMaKe" },
        { name: "description", content: "Welcome to WeMaKe" },
    ];
}

export const loader = async ({request}: Route.LoaderArgs) => {
    const { client, headers } = makeSSRClient(request);

    const [products, posts, ideas, jobs, teams] = await Promise.all([
        getProductsByDateRange(client, {
            startDate: DateTime.now().startOf("day"),
            endDate: DateTime.now().endOf("day"),
            limit: 7,
        }),
        getPosts(client, { limit: 7, sorting: "newest" }),
        getGptIdeas(client, { limit: 7 }),
        getJobs(client, { limit: 11 }),
        getTeams(client, { limit: 7 }),
    ]);

    return { products, posts, ideas, jobs, teams };
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
                      id={product.product_id}
                      name={product.name}
                      description={product.tagline}
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

              {loaderData.posts.map((post) => (
                  <PostCard
                      key={post.post_id}
                      id={post.post_id}
                      title={post.title}
                      author={post.author}
                      authorAvatarUrl={post.author_avatar}
                      category={post.topic}
                      postedAt={post.created_at}
                      votesCount={post.upvotes}
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

              {loaderData.ideas.map((idea) => (
                  <IdeaCard
                      key={idea.gpt_idea_id}
                      id={idea.gpt_idea_id}
                      title={idea.idea}
                      viewsCount={idea.views}
                      postedAt={idea.created_at}
                      likesCount={idea.likes}
                      claimed={idea.is_claimed}
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

              {loaderData.jobs.map((job) => (
                  <JobCard
                      key={job.job_id}
                      id={job.job_id}
                      company={job.company_name}
                      companyLogoUrl={job.company_logo}
                      companyHq={job.company_location}
                      title={job.position}
                      positionLocation={job.location}
                      postedAt={job.created_at}
                      type={job.job_type}
                      salary={job.salary_range}
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

              {loaderData.teams.map((team) => (
                  <TeamCard
                      key={team.team_id}
                      id={team.team_id}
                      leaderUsername={team.team_leader.username}
                      leaderAvatarUrl={team.team_leader.avatar}
                      positions={team.roles.split(",")}
                      projectsDescription={team.product_description}
                  />
              ))}
          </div>

      </div>
    );
}