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
import { Form, useOutletContext } from "react-router";
import { SendIcon } from "lucide-react";
import MessageBubble from "~/features/users/components/message-bubble";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getMessagesByMessagesRoomId, getRoomsParticipant } from "~/features/users/queries";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Message | WeMaKe" }
    ];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
    const { client } = await makeSSRClient(request);
    const userId = await getLoggedInUserId(client);

    // 사전 검증 후 전달(undefined 방지)
    if (!params.messageRoomId) {
        throw new Error("messageRoomId가 필요합니다.");
    }
    const messages = await getMessagesByMessagesRoomId(client, {
        messageRoomId: params.messageRoomId,
        userId,
    });
    const participants = await getRoomsParticipant(client, {
        messageRoomId: params.messageRoomId,
        userId,
    });
    return {
        messages,
        participants,
    };
};

export default function MessagePage({ loaderData }: Route.ComponentProps) {
    const { userId } = useOutletContext<{ userId: string }>();

    return(
        <div className="h-full flex flex-col justify-between">
            <Card>
                <CardHeader className="flex flex-row gap-4">
                    <Avatar className="size-14">
                        <AvatarImage src={loaderData.participants?.profile?.avatar ?? ""} />
                        <AvatarFallback>
                            {loaderData.participants?.profile?.name.charAt(0) ?? ""}
                        </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col gap-0">
                        <CardTitle className="text-xl">
                            {loaderData.participants?.profile?.name ?? ""}
                        </CardTitle>
                        <CardDescription>2 days ago</CardDescription>
                    </div>
                </CardHeader>
            </Card>

            <div className="py-10 overflow-y-scroll space-y-4 flex flex-col justify-start h-full">
                {loaderData.messages.map((message) => (
                    <MessageBubble
                        key={message.message_id}
                        avatarUrl={message.sender?.avatar ?? ""}
                        avatarFallback={message.sender?.name.charAt(0) ?? ""}
                        content={message.content}
                        isCurrentUser={message.sender?.profile_id === userId}
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