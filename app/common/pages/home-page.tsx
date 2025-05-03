import { Link, type MetaFunction } from "react-router";
import { Button, Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components";
import { ChevronUpIcon, EyeIcon, MessageCircleIcon } from "lucide-react";

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
                      Today's Products
                  </h2>
                  <p className="text-xl font-light text-foreground">
                      The best products made by our community today.
                  </p>
              </div>

             {/* Product Card */}
             <div className="">
                 <Link to={`/products/productId`}>
                     <Card className="w-full flex items-center justify-between bg-transparent hover:bg-card/50">
                         <CardHeader>
                             <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
                                 Product Name
                             </CardTitle>

                             <CardDescription className="text-muted-foreground">
                                 Product Description
                             </CardDescription>

                             {/*<div className="flex items-center gap-4 mt-2">*/}
                             {/*    <div className="flex items-center gap-px text-xs text-muted-foreground">*/}
                             {/*        <MessageCircleIcon className="w-4 h-4" />*/}
                             {/*        <span>12</span>*/}
                             {/*    </div>*/}
                             {/*    <div className="flex items-center gap-px text-xs text-muted-foreground">*/}
                             {/*        <EyeIcon className="w-4 h-4" />*/}
                             {/*        <span>12</span>*/}
                             {/*    </div>*/}
                             {/*</div>*/}
                         </CardHeader>

                         {/*<CardFooter className="py-0">*/}
                         {/*    <Button variant="outline" className="flex flex-col h-14">*/}
                         {/*        <ChevronUpIcon className="size-4 shrink-0" />*/}
                         {/*        <span>120</span>*/}
                         {/*    </Button>*/}
                         {/*</CardFooter>*/}
                     </Card>
                 </Link>
             </div>

          </div>
      </div>
    );
}