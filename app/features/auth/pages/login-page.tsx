import type { Route } from "./+types/login-page";
import { Form, Link, redirect, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Alert, AlertDescription, AlertTitle, Button } from "~/common/components";
import AuthButtons from "~/features/auth/components/auth-buttons";
import { AlertCircle, LoaderCircle } from "lucide-react";
import { z } from "zod";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Login | WeMaKe" }
    ];
};

const formSchema = z.object({
    email: z.string({
        required_error: "Email is required",
        invalid_type_error: "Email must be a string",
    }).email(),
    password: z.string({
        required_error: "Password is required",
    }).min(8, {
        message: "Password must be at least 8 characters",
    }),
});

export const action = async ({ request }: Route.ActionArgs) => {
    const formData = await request.formData();
    const { success, data, error } = formSchema.safeParse(Object.fromEntries(formData));
    if (!success) {
        return {
            formErrors: error?.flatten().fieldErrors,
            loginError: null,
        };
    }

    const { email, password } = data;
    const { client, headers } = makeSSRClient(request);
    const { error: loginError } = await client.auth.signInWithPassword({
        email,
        password,
    });
    if (loginError) {
        return {
            formErrors: null,
            loginError: loginError.message,
        };
    }

    return redirect("/", { headers });
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Button variant="ghost" asChild className="absolute right-4 top-8">
                <Link to="/auth/join">Join</Link>
            </Button>

            <div className="flex flex-col items-center justify-center w-full max-w-md gap-10">
                <h1 className="text-2xl font-semibold">
                    Log in to your account
                </h1>
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
                    {actionData && "formErrors" in actionData && (
                        <p className="text-sm text-red-500">
                            {actionData?.formErrors?.email?.join(", ")}
                        </p>
                    )}
                    <InputPair
                        id="password"
                        label="Password"
                        description="Enter your password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                    {actionData && "formErrors" in actionData && (
                        <p className="text-sm text-red-500">
                            {actionData?.formErrors?.password?.join(", ")}
                        </p>
                    )}
                    <Button className="w-full cursor-pointer" type="submit" disabled={isSubmitting}>
                        { isSubmitting ? <LoaderCircle className="animate-spin" /> : "Log in" }
                    </Button>
                    {actionData && "loginError" in actionData && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {actionData.loginError}
                            </AlertDescription>
                        </Alert>
                    )}
                </Form>
                <AuthButtons />
            </div>
        </div>
    );
}