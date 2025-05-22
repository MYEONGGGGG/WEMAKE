import type { Route } from "./+types/join-page";
import { Form, Link, useNavigation } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components";
import AuthButtons from "~/features/auth/components/auth-buttons";
import { LoaderCircle } from "lucide-react";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Login | WeMaKe" }
    ];
};

export const action = async ({ request }: Route.ActionArgs) => {
    await new Promise((resolve) => setTimeout(resolve, 4000));
    const formData = await request.formData();
    const email = formData.get("email");
    const password = formData.get("password");

    return {
        message: "Error wrong password",
    };
};

export default function LoginPage({ actionData }: Route.ComponentProps) {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "loading";

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
                    <InputPair
                        id="password"
                        label="Password"
                        description="Enter your password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                    <Button className="w-full cursor-pointer" type="submit" disabled={isSubmitting}>
                        { isSubmitting ? <LoaderCircle className="animate-spin" /> : "Log in" }
                    </Button>
                    {actionData?.message && (
                        <p className="text-sm text-red-500">{actionData.message}</p>
                    )}
                </Form>
                <AuthButtons />
            </div>
        </div>
    );
}