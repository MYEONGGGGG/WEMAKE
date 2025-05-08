import type { Route } from "./+types/otp-page";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Verify OTP | WeMaKe" }
    ];
};

export default function OtpPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center w-full max-w-md gap-10">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">
                        Confirm OTP
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        Enter the OTP code sent to your email address.
                    </p>
                </div>
                <Form className="w-full space-y-4">
                    <InputPair
                        id="email"
                        label="Email"
                        description="Enter your email address"
                        name="email"
                        type="text"
                        placeholder="i.e wemake@example.com"
                        required
                    />
                    <InputPair
                        id="otp"
                        label="OTP"
                        description="Enter the OTP code sent to your email address"
                        name="otp"
                        type="number"
                        placeholder="i.e 1234"
                        required
                    />
                    <Button className="w-full" type="submit">Send OTP</Button>
                </Form>
            </div>
        </div>
    );
}