import type { Route } from "./+types/join-page";
import { Form, Link } from "react-router";
import InputPair from "~/common/components/input-pair";
import { Button } from "~/common/components";
import AuthButtons from "~/features/auth/components/auth-buttons";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Join | WeMaKe" }
    ];
};

export default function JoinPage() {
    return (
        <div className="flex flex-col items-center justify-center h-full">
            <Button variant="ghost" asChild className="absolute right-4 top-8">
                <Link to="/auth/login">Login</Link>
            </Button>

            <div className="flex flex-col items-center justify-center w-full max-w-md gap-10">
                <h1 className="text-2xl font-semibold">
                    Create an account
                </h1>
                <Form className="w-full space-y-4">
                    <InputPair
                        id="name"
                        label="Name"
                        description="Enter your name"
                        name="name"
                        type="text"
                        placeholder="Enter your name"
                        required
                    />
                    <InputPair
                        id="username"
                        label="Username"
                        description="Enter your username"
                        name="username"
                        type="text"
                        placeholder="Enter your username"
                        required
                    />
                    <InputPair
                        id="email"
                        label="Email"
                        description="Enter your email address"
                        name="email"
                        type="text"
                        placeholder="Enter your email address"
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
                    <Button className="w-full" type="submit">
                        Create account
                    </Button>
                </Form>
                <AuthButtons />
            </div>
        </div>
    );
}