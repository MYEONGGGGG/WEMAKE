import { redirect } from "react-router";
import type { Route } from "./+types/my-profile-page";

export default function MyProfilePage() {
    return redirect("/users/nico");
}