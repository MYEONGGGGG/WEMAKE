import type { Route } from "./+types/submit-job-page";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "Submit Job | WeMaKe" },
        { name: "description", content: "Submit a job to WeMaKe"}
    ];
};

export default function SubmitJobPage() {
    return <div>Submit Job Page</div>
}