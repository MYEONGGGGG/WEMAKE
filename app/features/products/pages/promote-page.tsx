import type { Route } from "./+types/leaderboard-page";
import { Hero } from "~/common/components/hero";
import { Form } from "react-router";
import SelectPair from "~/common/components/select-pair";
import { Button, Calendar, Label } from "~/common/components";
import { useEffect, useRef, useState } from "react";
import type { DateRange } from "react-day-picker";
import { DateTime } from "luxon";
import { loadTossPayments, type TossPaymentsWidgets } from "@tosspayments/tosspayments-sdk";

export const meta : Route.MetaFunction = () => {
    return [
        { title: "Promote product | ProductHunt Clone" },
        { name: "description", content: "Promote your product" }
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

    const widgets = useRef<TossPaymentsWidgets|null>(null);
    const initedToss = useRef<boolean>(false);
    useEffect(() => {
        const initToss = async () => {
            if (initedToss.current) return;
            initedToss.current = true;
            const toss = loadTossPayments(
                "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm"
            );
            widgets.current = (await toss).widgets({
                customerKey: "1111111",
            });
            await widgets.current.setAmount({
                value: 0,
                currency: "KRW",
            });
            await widgets.current.renderPaymentMethods({
                selector: "#toss-payment-methods",
            });
            await widgets.current.renderAgreement({
                selector: "#toss-payment-agreement",
            });
        };
        initToss();
    }, []);
    useEffect(() => {
        const updateAmount = async () => {
            if (widgets.current) {
                await widgets.current.setAmount({
                    value: totalDays * 20000,
                    currency: "KRW",
                });
            }
        };
        updateAmount();
    }, [promotionPeriod]);

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const product = formData.get("product") as string;
        if (!product || !promotionPeriod?.to || !promotionPeriod?.from) return;
        await widgets.current?.requestPayment({
            orderId: crypto.randomUUID(),
            orderName: `WeMake Promotion`,
            customerEmail: "nico@nomadcoders.co",
            customerName: "Nico",
            customerMobilePhone: "01012345678",
            metadata: {
                product,
                promotionFrom: DateTime.fromJSDate(promotionPeriod.from).toISO(),
                promotionTo: DateTime.fromJSDate(promotionPeriod.to).toISO(),
            },
            successUrl: `${window.location.href}/success`,
            failUrl: `${window.location.href}/fail`,
        });
    };

    return (
        <div>
            <Hero
                title="Promote product"
                subtitle="Boost your product's visibility"
            />
            <form onSubmit={handleSubmit} className="grid grid-cols-6 gap-10">
                <div className="col-span-3 mx-auto w-1/2 flex flex-col gap-10 items-start">
                    <SelectPair
                        required
                        name="product"
                        label="Select a product"
                        description="Select the product you want to promote."
                        placeholder="Select a product"
                        options={[
                            {
                                label: "AI Dark Mode Maker",
                                value: "ai-dark-mode-maker",
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
                </div>

                <aside className="col-span-3 px-20 flex flex-col items-center">
                    <div id="toss-payment-methods" className="w-full" />
                    <div id="toss-payment-agreement" className="w-full" />
                    <Button className="w-full" disabled={totalDays === 0}>
                        Go to checkout ({ (totalDays* 20000).toLocaleString("ko-KR", {
                        style: "currency",
                        currency: "KRW",
                    }) })
                    </Button>
                </aside>
            </form>
        </div>
    );
}