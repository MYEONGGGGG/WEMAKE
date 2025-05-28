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
import {
    getLoggedInUserId,
    getMessagesByMessagesRoomId,
    getRoomsParticipant,
    sendMessageToRoom
} from "~/features/users/queries";
import { useEffect, useRef } from "react";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Message | WeMaKe" }
    ];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
    const { client } = makeSSRClient(request);
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

export const action = async ({ request, params }: Route.ActionArgs) => {
    const { client } = makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const formData = await request.formData();
    const message = formData.get("message");
    await sendMessageToRoom(client, {
        messageRoomId: params.messageRoomId,
        message: message as string,
        userId,
    });
    return {
        ok: true,
    };
};

export default function MessagePage({ loaderData, actionData }: Route.ComponentProps) {
    const { userId } = useOutletContext<{ userId: string }>();
    const formRef = useRef<HTMLFormElement>(null);
    useEffect(() => {
        if (actionData?.ok) {
            formRef.current?.reset();
        }
    }, [actionData]);

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
                    <Form
                        ref={formRef}
                        method="post"
                        className="relative flex justify-end items-center"
                    >
                        <Textarea
                            placeholder="Write a message..."
                            rows={2}
                            className="resize-none"
                            required
                            name="message"
                        />
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