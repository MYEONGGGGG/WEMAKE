import type { Route } from "./+types/profile-page";
import { useOutletContext } from "react-router";
import client from "~/supa-client";
import { getUserIdByUsername } from "~/features/users/queries";

export const loader = async ({params}: Route.LoaderArgs) => {
    const user = await getUserIdByUsername(params.username);

    // 유저가 존재할 경우 track_event 함수 호출
    if (user) {
        await client.rpc("track_event", {
            event_type: "profile_view",
            event_data: {
                profile_id: user.profile_id,
            },
        });
    }

    return null;
};

export default function ProfilePage() {
    const { headline, bio } = useOutletContext<{
        headline: string,
        bio: string,
    }>();

    return(
        <div className="max-w-screen-md flex flex-col space-y-10">
            <div className="space-y-2">
                <h4 className="text-lg font-bold">Headline</h4>
                <p className="text-muted-foreground">{headline}</p>
            </div>
            <div className="space-y-2">
                <h4 className="text-lg font-bold">Bio</h4>
                <p className="text-muted-foreground">{bio}</p>
            </div>
        </div>
    );
}