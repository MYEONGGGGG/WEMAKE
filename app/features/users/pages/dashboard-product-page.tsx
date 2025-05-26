import type { Route } from "./+types/dashboard-product-page";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "~/common/components";
import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";
import type { ChartConfig } from "~/common/components/ui/chart";
import { makeSSRClient } from "~/supa-client";
import { getLoggedInUserId } from "~/features/users/queries";
import { redirect } from "react-router";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Product Dashboard | WeMaKe" }
    ];
};

export const loader = async ({ request, params }: Route.LoaderArgs) => {
    const { client } = await makeSSRClient(request);
    const userId = await getLoggedInUserId(client);
    const { error } = await client
        .from("products")
        .select("product_id")
        .eq("profile_id", userId)
        .eq("product_id", Number(params.productId))
        .single();
    if (error) {
        throw redirect("/my/dashboard/products");
    }
    const { data, error: rcpError } = await client.rpc("get_product_stats", {
        product_id: params.productId,
    });
    if (rcpError) {
        throw error;
    }
    return {
        chartData: data,
    };
};

const chartConfig = {
    views: {
        label: "Page views",
        color: "var(--chart-1)",
    },
    visitors: {
        label: "Visitors",
        color: "var(--chart-2)",
    }
} satisfies ChartConfig;

export default function DashboardProductPage({ loaderData }: Route.ComponentProps) {
    return(
        <div className="space-y-5">
            <h1 className="text-2xl font-semibold mb-6">Analytics</h1>
            <Card className="w-1/2">
                <CardHeader>
                    <CardTitle>Performance</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <AreaChart
                            accessibilityLayer
                            data={loaderData.chartData}
                            margin={{
                                left: 12,
                                right: 12,
                            }}
                        >
                            <CartesianGrid vertical={false} />
                            <XAxis
                                dataKey="month"
                                tickLine={false}
                                axisLine={false}
                                tickMargin={8}
                                padding={{ left: 15, right: 15 }}
                            />
                            <Area
                                dataKey="product_views"
                                type="natural"
                                stroke={chartConfig.views.color}
                                fill={chartConfig.views.color}
                                strokeWidth={2}
                                dot={false}
                            />
                            <Area
                                dataKey="product_visits"
                                type="natural"
                                stroke={chartConfig.visitors.color}
                                fill={chartConfig.visitors.color}
                                strokeWidth={2}
                                dot={false}
                            />
                            <ChartTooltip
                                cursor={false}
                                wrapperStyle={{ minWidth: "200px" }}
                                content={<ChartTooltipContent indicator="dashed" />}
                            />
                        </AreaChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}