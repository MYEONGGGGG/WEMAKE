import type { Route } from "./+types/product-overview-page";
import { ChevronUpIcon, StarIcon } from "lucide-react";
import { Button } from "~/common/components";

export function  meta() {
    return [
        { title: "Product Overview | WeMaKe" },
        { name: "description", content: "View product details and information" },
    ];
}

export default function ProductOverviewPage() {
    return (
      <div className="space-y-10">
          {/* header */}
          <div className="flex justify-between">
              {/* Left */}
              <div className="flex gap-10">
                  <div className="size-40 rounded-xl shadow-xl bg-primary/50"></div>
                  <div>
                      <h1 className="text-5xl font-bold">Product Name</h1>
                      <p className="text-2xl font-light">Product Description</p>
                      <div className="mt-5 flex items-center gap-2">
                          <div className="flex text-yellow-400">
                              {Array.from({length: 5}).map((_, i) => (
                                  <StarIcon className="size-4" fill="currentColor" key={i} />
                              ))}
                          </div>
                          <span className="text-muted-foreground">100 reviews</span>
                      </div>
                  </div>
              </div>

              {/* Right */}
              <div className="flex gap-10">
                  <Button
                      variant={"secondary"}
                      size="lg"
                      className="text-lg h-14 px-10"
                  >
                      Visit Website
                  </Button>
                  <Button
                      size="lg"
                      className="text-lg h-14 px-10"
                  >
                      <ChevronUpIcon className="size-4" />
                      Upvote (100)
                  </Button>
              </div>
          </div>

          {/**/}
          <div className="flex gap-2.5">
              <Button variant={"outline"}>Overview</Button>
              <Button variant={"outline"}>Reviews</Button>
          </div>

          {/**/}
          <div className="space-y-10">
             <div className="space-y-1">
                 <h3 className="text-lg font-bold">How does it product?</h3>
                 <p className="text-muted-foreground">
                     Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                     quos.
                 </p>
             </div>
              <div className="space-y-1">
                  <h3 className="text-lg font-bold">How does it work</h3>
                  <p className="text-muted-foreground">
                      Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam,
                      quos.
                  </p>
              </div>
          </div>
      </div>
    );
}