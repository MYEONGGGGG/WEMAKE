import { redirect } from "react-router";
import type { Route } from "./+types/my-profile-page";
import { makeSSRClient } from "~/supa-client";
import { getUserById } from "~/features/users/queries";

export async function loader({ request }: Route.LoaderArgs) {
    const { client } = makeSSRClient(request);
    const {
        data: {user}
    } = await client.auth.getUser();
    if (user) {
        const profile = await getUserById(client, { id: user.id });
        return redirect(`/users/${encodeURIComponent(profile.username)}`);
    }

    // 로그인한 계정이 없다면 로그인하도록 유도
    return redirect("/auth/login");
}