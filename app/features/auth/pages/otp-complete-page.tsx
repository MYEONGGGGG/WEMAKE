import type { Route } from "./+types/otp-complete-page";
import { Form, redirect, useNavigation, useSearchParams } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";
import { LoaderCircle } from "lucide-react";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Verify OTP | WeMaKe" }
    ];
};

const formSchema = z.object({
    email: z.string().email(),
    otp: z.string().min(6).max(6),
});

export const action = async ({ request }: Route.ActionArgs) => {
    const formData = await request.formData();
    const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData));
    if (!success) {
        return { fieldErrors: error?.flatten().fieldErrors };
    }

    const { email, otp } = data;
    const { client, headers } = makeSSRClient(request);

    const { error: verifyError } = await client.auth.verifyOtp({
        email,
        token: otp,
        type: "email",
    });
    if (verifyError) {
        return { verifyError: verifyError.message };
    }

    return redirect("/", { headers });
};

export default function OtpPage({actionData}: Route.ComponentProps) {
    const [searchParams] = useSearchParams();
    const email = searchParams.get("email");
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";

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
                <Form className="w-full space-y-4" method="post">
                    <InputPair
                        id="email"
                        label="Email"
                        description="Enter your email address"
                        name="email"
                        defaultValue={email || ""}
                        type="text"
                        placeholder="i.e wemake@example.com"
                        required
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-sm text-red-500">
                            {actionData.fieldErrors?.email?.join(", ")}
                        </p>
                    )}
                    <InputPair
                        id="otp"
                        label="OTP"
                        description="Enter the OTP code sent to your email address"
                        name="otp"
                        type="number"
                        placeholder="i.e 1234"
                        required
                    />
                    {actionData && "fieldErrors" in actionData && (
                        <p className="text-sm text-red-500">
                            {actionData.fieldErrors?.otp?.join(", ")}
                        </p>
                    )}
                    {actionData && "verifyError" in actionData && (
                        <p className="text-sm text-red-500">{actionData.verifyError}</p>
                    )}
                    <Button className="w-full" type="submit" disabled={isSubmitting}>
                        {isSubmitting ? (
                            <LoaderCircle  className="animate-spin" />
                        ) : (
                            "Verify OTP"
                        )}
                    </Button>
                </Form>
            </div>
        </div>
    );
}