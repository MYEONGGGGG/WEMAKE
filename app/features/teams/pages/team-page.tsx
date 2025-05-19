import { Hero } from "~/common/components/hero";
import type { Route } from "./+types/team-page";
import {
    Avatar,
    AvatarFallback,
    AvatarImage,
    Badge,
    Button, Card,
    CardContent,
    CardHeader,
    CardTitle
} from "~/common/components";
import { Form } from "react-router";
import InputPair from "~/common/components/input-pair";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "team-page | WeMaKe" }
    ];
};

export default function TeamPage() {
    return (
        <div className="space-y-20">
            <Hero title="Join lynn's team" />

            <div className="grid grid-cols-6 gap-40 items-start">
                {/* left */}
                <div className="col-span-4 grid grid-cols-4 gap-5">
                    {[
                        {
                            title: "Product name",
                            value: "Doggie Social"
                        },
                        {
                            title: "Stage",
                            value: "MVP"
                        },
                        {
                            title: "Team size",
                            value: 3
                        },
                        {
                            title: "Available equity",
                            value: 50
                        }
                    ].map((item) => (
                        <Card key={item.title}>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {item.title}
                                </CardTitle>
                                <CardContent className="p-0 font-bold text-xl">
                                    <p>{item.value}</p>
                                </CardContent>
                            </CardHeader>
                        </Card>
                    ))}

                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Looking for
                            </CardTitle>
                            <CardContent className="p-0 font-bold text-xl">
                                <ul className="text-lg list-disc list-inside">
                                    {[
                                        "React Developer",
                                        "Backend Developer",
                                        "Product Manager",
                                        "UI/UX Designer"
                                    ].map((item) => (
                                        <li key={item}>{item}</li>
                                    ))}
                                </ul>
                            </CardContent>
                        </CardHeader>
                    </Card>

                    <Card className="col-span-2">
                        <CardHeader>
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                Idea description
                            </CardTitle>
                            <CardContent className="p-0 font-bold text-xl">
                                <p>
                                    Doggie Social is a social media platform for dogs.
                                    It allows dogs to connect with each other and share their experiences.
                                </p>
                            </CardContent>
                        </CardHeader>
                    </Card>
                </div>

                {/* right */}
                <aside className="col-span-2 space-y-5 border rounded-lg p-6 shadow-sm">
                    <div className="flex gap-5">
                        <Avatar className="size-14">
                            <AvatarFallback>N</AvatarFallback>
                            <AvatarImage src="https://github.com/inthetiger.png" alt="avatar" />
                        </Avatar>
                        <div className="flex flex-col">
                            <h4 className="text-lg font-medium">Lynn</h4>
                            <Badge variant="secondary">Entrepreneur</Badge>
                        </div>
                    </div>
                    <Form className="space-y-5">
                       <InputPair
                           label="Introduce yourself"
                           description="Tell us about yourself"
                           name="introduce"
                           id="introduce"
                           type="text"
                           required
                           textArea
                           placeholder="i.e I'm a software engineer and I'm passionate about building products that make people's lives easier."
                       />
                    </Form>
                    <Button type="submit" className="w-full">Get in touch</Button>
                </aside>
            </div>
        </div>
    );
}