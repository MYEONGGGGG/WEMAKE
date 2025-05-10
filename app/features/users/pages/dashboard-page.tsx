import type { Route } from "./+types/dashboard-page";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Dashboard | WeMaKe" }
    ];
};

export default function DashboardPage() {
    return(
        <div className="space-y-10">
            Dashboard page
        </div>
    );
}