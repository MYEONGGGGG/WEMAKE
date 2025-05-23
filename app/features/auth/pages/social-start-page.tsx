import { redirect } from "react-router";
import { makeSSRClient } from "~/supa-client";
import type { Route } from "./+types/social-start-page";
import { z } from "zod";
import { Simulate } from "react-dom/test-utils";

const paramSchema = z.object({
    provider: z.enum(["kakao", "github"]),
});

export const loader = async ({ params, request }: Route.LoaderArgs) => {
    const { success, data } = paramSchema.safeParse(params);
    if (!success) {
        return redirect("/auth/login");
    }

    const { provider } = data;
    const redirectTo = `http://localhost:5173/auth/social/${data.provider}/complete`; // 소셜 로그인 인증 완료 후 돌아올 주소(소셜 인증 완료 처리 페이지)

    // SSR 클라이언트 생성
    // headers에는 set-Cookie가 포함되어 있음(클라이언트 인증 흐름을 유지하기 위한 정보)
    const { client, headers } = makeSSRClient(request);

    // 소셜 로그인 리디렉션 URL 요청(실제 로그인을 진행하는 것은 아님, 사용자를 소셜 로그인 페이지로 보낼 주소를 반환 받아오기 위한 목적임)
    // Supabase가 소셜 로그인 제공자(kakao, github)의 인증 URL을 생성해서 구조분해할당 방식으로 url에 값을 담아줌
    const {
        data: { url },
        error,
    } = await client.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo,
        }
    });

    // Supabase에서 생성한 소셜 로그인 URL로 사용자를 리디렉트하면서
    // 동시에 인증 상태를 유지하기 위해 필요한 headers도 함께 전달함
    if (url) {
        return redirect(url, { headers });
    }

    if (error) {
        throw error;
    }
};