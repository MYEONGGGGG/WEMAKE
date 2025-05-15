import { Link } from "react-router";
import { Button, Card, CardDescription, CardFooter, CardHeader, CardTitle } from "~/common/components";
import { ChevronUpIcon, EyeIcon, MessageCircleIcon } from "lucide-react";

interface ProductCardProps {
    id: string;
    name: string;
    description: string;
    reviewsCount: string;
    viewsCount: string;
    votesCount: string;
}

export function ProductCard({
    id,
    name,
    description,
    reviewsCount,
    viewsCount,
    votesCount,
 }: ProductCardProps) {
    return (
        <Link to={`/products/${id}`}>
            <Card className="w-full bg-transparent hover:bg-card/50">
                <div className="flex items-center justify-between">
                    <CardHeader className="flex-1">
                        <CardTitle className="text-2xl font-semibold leading-none tracking-tight">
                            {name}
                        </CardTitle>
                        <CardDescription className="text-muted-foreground">
                            {description}
                        </CardDescription>
                        <div className="flex items-center gap-4 mt-2">
                            <div className="flex items-center gap-px text-xs textmuted-foreground">
                                <MessageCircleIcon className="w-4 h-4" />
                                <span>{reviewsCount}</span>
                            </div>
                            <div className="flex items-center gap-px text-xs textmuted-foreground">
                                <EyeIcon className="w-4 h-4" />
                                <span>{viewsCount}</span>
                            </div>
                        </div>
                    </CardHeader>
                    <CardFooter className="py-0">
                        <Button variant="outline" className="flex flex-col h-14">
                            <ChevronUpIcon className="size-4 shrink-0" />
                            <span>{votesCount}</span>
                        </Button>
                    </CardFooter>
                </div>
            </Card>
        </Link>
    );
}