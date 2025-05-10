import type { Route } from "./+types/dashboard-page";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle,
    ChartContainer,
    ChartTooltip,
    ChartTooltipContent
} from "~/common/components";
import { CartesianGrid, Line, LineChart, XAxis } from "recharts";
import type { ChartConfig } from "~/common/components/ui/chart";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Dashboard | WeMaKe" }
    ];
};

const charData = [
    { month: "January", views: 186 },
    { month: "February", views: 305 },
    { month: "March", views: 237 },
    { month: "April", views: 73 },
    { month: "May", views: 209 },
    { month: "June", views: 214 },
]

const chartConfig = {
    views: {
        label: "🖥️",
        color: "var(--primary)",
    }
} satisfies ChartConfig;

export default function DashboardPage() {
    return(
        <div className="space-y-5">
            <h1 className="text-2xl font-semibold mb-6">Dashboard</h1>
            <Card className="w-1/2">
                <CardHeader>
                    <CardTitle>Profile views</CardTitle>
                </CardHeader>
                <CardContent>
                    <ChartContainer config={chartConfig}>
                        <LineChart
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
                            <Line
                                dataKey="views"
                                type="natural"
                                stroke={chartConfig.views.color}
                                strokeWidth={2}
                                dot={false}
                            />
                            <ChartTooltip
                                cursor={false}
                                content={<ChartTooltipContent hideLabel />}
                            />
                        </LineChart>
                    </ChartContainer>
                </CardContent>
            </Card>
        </div>
    );
}