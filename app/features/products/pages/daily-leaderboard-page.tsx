import { DateTime } from "luxon";
import type { Route } from "./+types/leaderboard-page";
import { data, isRouteErrorResponse } from "react-router";
import { z } from "zod";

const paramsSchema = z.object({
    year: z.number(),
    month: z.number(),
    day: z.number(),
});

export const loader = ({ params }: Route.LoaderArgs) => {
    const { success, data:parsedData } = paramsSchema.safeParse(params);
    if (!success) {
        throw data(
            {
                error_code: "Invalid params",
                message: "Invalid params",
            },
            { status: 400 },
        );
    }

    const date = DateTime.fromObject(parsedData).setZone("Asia/Seoul");

    if (!date.isValid) {
        throw new Error("Invalid date");
        throw data(
            {
                error_code: "Invalid date",
                message: "Invalid date",
            },
            { status: 400 },
        );
    }
    const today = DateTime.now().setZone("Asia/Seoul").startOf("day");
    if (date > today) {
        throw data(
            {
                error_code: "future_date",
                message: "Future date",
            },
            { status: 400 },
        )
    }
    return {
        date,
    }
};

export default function DailyLeaderboardPage() {
    return (
        <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">
                {/*Top Products of {loaderData.month}/{loaderData.day}/{loaderData.year}*/}
            </h1>
        </div>
    );
}

export function  ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
    if (isRouteErrorResponse(error)) {
        return <div>{error.data.message} / {error.data.error_code}</div>
    }
    if (error instanceof Error) {
        return <div>{error.message}</div>
    }
    return <div>Error in leaderboard</div>
}