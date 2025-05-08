import type { Route } from "./+types/join-page";
import { Form, Link } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Login | WeMaKe" }
    ];
};

export default function LoginPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Button variant="ghost" asChild className="absolute right-4 top-8">
                <Link to="/auth/join">Join</Link>
            </Button>

            <div className="flex flex-col items-center justify-center w-full max-w-md gap-10">
                <h1 className="text-2xl font-semibold">
                    Log in to your account
                </h1>
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
                        id="password"
                        label="Password"
                        description="Enter your password"
                        name="password"
                        type="password"
                        placeholder="Enter your password"
                        required
                    />
                    <Button className="w-full" type="submit">Login account</Button>
                </Form>
            </div>
        </div>
    );
}