import type { Route } from "./+types/profile-page";
import { useOutletContext } from "react-router";
import client from "~/supa-client";

export const loader = async ({params}: Route.LoaderArgs) => {
    await client.rpc("track_event", {
        event_type: "profile_view",
        event_data: {
            username: params.username
            // 챕터 6.14 과제: 추가한 추적 함수를 이용하여 userId로 바꾸기
            // track_event를 특정 user id 기반으로 생성해야함.
            // username이 수정되더라도 user id 기반으로 하면 문제가 발생하지 않고 로깅할 수 있다.
            // 또, 반드시 존재하는 유저에 대해서만 이벤트를 저장할 수 있다.
        },
    });

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