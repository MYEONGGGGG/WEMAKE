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

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Product Dashboard | WeMaKe" }
    ];
};

const charData = [
    { month: "January", views: 186, visitors: 123 },
    { month: "February", views: 305, visitors: 45 },
    { month: "March", views: 237, visitors: 32 },
    { month: "April", views: 73, visitors: 11 },
    { month: "May", views: 209, visitors: 200 },
    { month: "June", views: 214, visitors: 156 },
]

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

export default function DashboardProductPage() {
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
                            data={charData}
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
                                tickFormatter={(value) => value.slice(0, 3)}
                            />
                            <Area
                                dataKey="views"
                                type="natural"
                                stroke={chartConfig.views.color}
                                fill={chartConfig.views.color}
                                strokeWidth={2}
                                dot={false}
                            />
                            <Area
                                dataKey="visitors"
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