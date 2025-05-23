import type { Route } from "./+types/message-page";
import {
    Avatar,
    AvatarFallback,
    AvatarImage, Button,
    Card,
    CardDescription,
    CardHeader,
    CardTitle, Textarea
} from "~/common/components";
import { Form } from "react-router";
import { SendIcon } from "lucide-react";
import MessageBubble from "~/features/users/components/message-bubble";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Message | WeMaKe" }
    ];
};

export default function MessagePage() {
    return(
        <div className="h-full flex flex-col justify-between">
            <Card>
                <CardHeader className="flex flex-row gap-4">
                    <Avatar className="size-14">
                        <AvatarImage src="https://github.com/shadcn.png" alt="avatar" />
                        <AvatarFallback>CN</AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0">
                        <CardTitle>Steve Jobs</CardTitle>
                        <CardDescription>2 days ago</CardDescription>
                    </div>
                </CardHeader>
            </Card>

            <div className="py-10 overflow-y-scroll flex flex-col justify-start h-full">
                {Array.from({length: 20}, (_, index) => (
                    <MessageBubble
                        key={index}
                        avatarUrl="https://github.com/shadcn.png"
                        avatarFallback="S"
                        content="this is a message from steve jobs in heaven,
                        make sure to reply because if you don't, you will be punished."
                        isCurrentUser={index % 2 === 0}
                    />
                ))}
            </div>

            <Card>
                <CardHeader>
                    <Form className="relative flex justify-end items-center">
                        <Textarea placeholder="Write a message..." rows={2} className="resize-none" />
                        <Button
                            type="submit"
                            size="icon"
                            className="absolute right-2"
                        >
                            <SendIcon className="size-4" />
                        </Button>
                    </Form>
                </CardHeader>
            </Card>
        </div>
    );
}