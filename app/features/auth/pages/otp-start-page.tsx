import type { Route } from "./+types/otp-start-page";
import { Button } from "~/common/components";
import { Form, Link, redirect, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { LoaderCircle } from "lucide-react";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Start OTP | WeMaKe" }
    ];
};

const formSchema = z.object({
    email: z.string().email(),
});

export const action = async ({ request }: Route.ActionArgs) => {
    const formData = await request.formData();
    const { success, data } = formSchema.safeParse(Object.fromEntries(formData));
    if (!success) {
        return {
            error: "Invalid email address",
        };
    }

    const { email } = data;
    const { client } = makeSSRClient(request);
    const { error } = await client.auth.signInWithOtp({
        email,
        options: {
            shouldCreateUser: true,
        }
    });

    if (error) {
        return { error: "Failed to send OTP. Please try again later." };
    }

    return redirect(`/auth/otp/complete?email=${email}`);
};

export default function OtpStartPage({actionData}: Route.ComponentProps) {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <div className="flex flex-col items-center justify-center w-full max-w-md gap-10">
                <div className="text-center">
                    <h1 className="text-2xl font-semibold">
                        Log in with OTP
                    </h1>
                    <p className="text-sm text-muted-foreground">
                        We will send you a 4-digit code to log in to your account.
                    </p>
                </div>
                <Form className="w-full space-y-4" method="post">
                    <InputPair
                        id="email"
                        label="Email"
                        description="Enter your email address"
                        name="email"
                        type="text"
                        placeholder="i.e wemake@example.com"
                        required
                    />
                    {actionData && "error" in actionData && (
                        <p className="text-sm text-red-500">{actionData.error}</p>
                    )}
                    <Button className="w-full" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <LoaderCircle  className="animate-spin" />
                        ) : (
                            "Send OTP"
                        )}
                    </Button>
                </Form>
            </div>
        </div>
    );
}