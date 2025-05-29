import type { Route } from "./+types/leaderboard-page";
import { Hero } from "~/common/components/hero";
import { Form } from "react-router";
import SelectPair from "~/common/components/select-pair";
import { Button, Calendar, Label } from "~/common/components";
import { useState } from "react";
import type { DateRange } from "react-day-picker";
import { DateTime } from "luxon";

export const meta : Route.MetaFunction = () => {
    return [
        { title: "Promote product | ProductHunt Clone" },
        { name: "description", content: "\"Promote your product" }
    ];
}

export default function PromotePage() {
    const [promotionPeriod, setPromotionPeriod] = useState<DateRange | undefined>();
    const totalDays = promotionPeriod?.from && promotionPeriod.to
        ? DateTime.fromJSDate(promotionPeriod.to).diff(
            DateTime.fromJSDate(promotionPeriod.from),
            "days"
        ).days
        : 0;

    return (
        <div>
            <Hero
                title="Promote product"
                subtitle="Boost your product's visibility"
            />
            <div className="grid grid-cols-6">
                <Form className="col-span-4 mx-auto flex flex-col gap-10 items-center">
                    <SelectPair
                        name="product"
                        label="Select a product"
                        description="Select the product you want to promote."
                        placeholder="Select a product"
                        options={[
                            {
                                label: "AI Dark Mode Maker",
                                value: "ai-dark-mode-maker",
                            },
                            {
                                label: "AI Dark Mode Maker",
                                value: "ai-dark-mode-maker-1",
                            },
                            {
                                label: "AI Dark Mode Maker",
                                value: "ai-dark-mode-maker-2",
                            },
                        ]}
                    />
                    <div className="flex flex-col gap-2 items-center w-full">
                        <Label className="flex flex-col gap-1">
                            Select a range of dates for promotion{" "}
                            <small className="text-muted-foreground text-center">
                                Minimum duration is 3 days.
                            </small>
                        </Label>
                        <Calendar
                            mode="range"
                            selected={promotionPeriod}
                            onSelect={setPromotionPeriod}
                            min={3}
                            disabled={{ before: new Date() }}
                        />
                    </div>
                    <Button disabled={totalDays === 0}>
                        Go to checkout ${ Number(totalDays) * 20 }
                    </Button>
                </Form>
                <aside className="col-span-2"></aside>
            </div>
        </div>
    );
}