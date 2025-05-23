import type { Route } from "./+types/join-page";
import { Form, Link, redirect, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Alert, AlertDescription, AlertTitle, Button } from "~/common/components";
import AuthButtons from "~/features/auth/components/auth-buttons";
import { makeSSRClient } from "~/supa-client";
import { z } from "zod";
import { checkUsernameExists } from "~/features/auth/queries";
import { AlertCircle } from "lucide-react";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Join | WeMaKe" }
    ];
};

const formSchema = z.object({
    name: z.string().min(3),
    username: z.string().min(3),
    email: z.string().email(),
    password: z.string().min(8),
});

export const action = async ({request}: Route.ActionArgs) => {
    const formData = await request.formData();
    const { success, error, data } = formSchema.safeParse(
        Object.fromEntries(formData)
    );
    if (!success) {
        return {
            formErrors: error.flatten().fieldErrors,
        };
    }

    const usernameExists = await checkUsernameExists(request, {
        username: data.username,
    });
    if (usernameExists) {
      return {
          formErrors: { username: ["Username already exists"] }
      };
    }

    const { client, headers } = makeSSRClient(request);
    const { error: signUpError } = await client.auth.signUp({
        email: data.email,
        password: data.password,
        options: {
            data: {
                name: data.name,
                username: data.username,
            },
        },
    });
    if (signUpError) {
        return {
            signUpError: signUpError.message,
        };
    }

    return redirect("/", { headers });
};

export default function JoinPage({ actionData }: Route.ComponentProps) {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting" || navigation.state === "loading";

    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Button variant="ghost" asChild className="absolute right-4 top-8">
                <Link to="/auth/login">Login</Link>
            </Button>

            <div className="flex flex-col items-center justify-center w-full max-w-md gap-10">
                <h1 className="text-2xl font-semibold">
                    Create an account
                </h1>
                <Form className="w-full space-y-4" method="post">
                    <InputPair
                        id="name"
                        label="Name"
                        description="Enter your name"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        required
                    />
                    {actionData && "formErrors" in actionData && (
                        <p className="text-sm text-red-500">{actionData?.formErrors?.name}</p>
                    )}
                    <InputPair
                        id="username"
                        label="Username"
                        description="Enter your username"
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        required
                    />
                    {actionData && "formErrors" in actionData && (
                        <p className="text-sm text-red-500">{actionData?.formErrors?.username}</p>
                    )}
                    <InputPair
                        id="email"
                        label="Email"
                        description="Enter your email address"
                        name="email"
                        type="text"
                        placeholder="Enter your email address"
                        required
                    />
                    {actionData && "formErrors" in actionData && (
                        <p className="text-sm text-red-500">{actionData?.formErrors?.email}</p>
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
                        <p className="text-sm text-red-500">{actionData?.formErrors?.password}</p>
                    )}
                    <Button className="w-full" type="submit">
                        Create account
                    </Button>
                    {actionData && "signUpError" in actionData && (
                        <Alert variant="destructive">
                            <AlertCircle className="h-4 w-4" />
                            <AlertTitle>Error</AlertTitle>
                            <AlertDescription>
                                {actionData.signUpError}
                            </AlertDescription>
                        </Alert>
                    )}
                </Form>
                <AuthButtons />
            </div>
        </div>
    );
}