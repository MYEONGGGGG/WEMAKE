// UI가 없는 페이지
// 로직을 실행하고 유저를 URL로 보내는 작업을 한다.
import type { Route } from "./+types/categories-page";
import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";

export const loader = async ({params, request}: Route.LoaderArgs) => {
    const { client, headers } = makeSSRClient(request);
    const { data, error } = await client
        .from("products")
        .select("url")
        .eq("product_id", Number(params.productId))
        .single();

    if (data) {
        await client.rpc("track_event", {
            event_type: "product_visit",
            event_data: {
              product_id: params.productId,
            },
        });

        return redirect(data.url);
    }
};