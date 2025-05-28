import type { Route } from "./+types/send-message-page";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId, getUserProfile } from "~/features/users/queries";
import { sendMessage } from "~/features/users/mutations";
import { redirect } from "react-router";

const formSchema = z.object({
    content: z.string().min(1),
});

export const action = async ({ request, params }: Route.ActionArgs) => {
    if (request.method !== "POST") {
        return Response.json({ error: "Method not allowed" }, { status: 405 });
    }
    const formData = await request.formData();
    const { client } = makeSSRClient(request);
    const fromUserId = await getLoggedInUserId(client);

    // 사전 검증 후 전달(undefined 방지)
    if (!params.username) {
        throw new Error("username가 필요합니다.");
    }
    const { profile_id: toUserId } = await getUserProfile(client, {
        username: params.username,
    });
    const messageRoomId = await sendMessage(client, {
        fromUserId,
        toUserId,
        content: formData.get("content") as string,
    });
    return redirect(`/my/messages/${messageRoomId}`);
};