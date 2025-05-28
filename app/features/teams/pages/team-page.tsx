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
import { getTeamById } from "~/features/teams/queries";
import { makeSSRClient } from "~/supa-client";

export const meta: Route.MetaFunction = () => {
    return [
        { title: "team-page | WeMaKe" }
    ];
};

export const loader = async ({ params, request }: Route.LoaderArgs) => {
    const { client, headers } = makeSSRClient(request);
    const team = await getTeamById(client, { teamId: params.teamId });
    return { team };
};

export default function TeamPage({ loaderData }: Route.ComponentProps) {
    return (
        <div className="space-y-20">
            <Hero title={`Join ${loaderData.team.team_leader.name}'s team`} />

            <div className="grid grid-cols-6 gap-40 items-start">
                {/* left */}
                <div className="col-span-4 grid grid-cols-4 gap-5">
                    {[
                        {
                            title: "Product name",
                            value: loaderData.team.product_name,
                        },
                        {
                            title: "Stage",
                            value: loaderData.team.product_stage,
                        },
                        {
                            title: "Team size",
                            value: loaderData.team.team_size,
                        },
                        {
                            title: "Available equity",
                            value: loaderData.team.equity_split,
                        }
                    ].map((item) => (
                        <Card key={item.title}>
                            <CardHeader>
                                <CardTitle className="text-sm font-medium text-muted-foreground">
                                    {item.title}
                                </CardTitle>
                                <CardContent className="p-0 capitalize font-bold text-xl">
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
                                    {loaderData.team.roles.split(",").map((item) => (
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
                                    {loaderData.team.product_description}
                                </p>
                            </CardContent>
                        </CardHeader>
                    </Card>
                </div>

                {/* right */}
                <aside className="col-span-2 space-y-5 border rounded-lg p-6 shadow-sm">
                    <div className="flex gap-5">
                        <Avatar className="size-14">
                            <AvatarFallback>{loaderData.team.team_leader.name[0]}</AvatarFallback>
                            {loaderData.team.team_leader.avatar ? (
                                <AvatarImage src={loaderData.team.team_leader.avatar} />
                            ) : null}
                        </Avatar>
                        <div className="flex flex-col items-start">
                            <h4 className="text-lg font-medium">
                                {loaderData.team.team_leader.name}
                            </h4>
                            <Badge variant="secondary" className="capitalize">
                                {loaderData.team.team_leader.role}
                            </Badge>
                        </div>
                    </div>
                    <Form
                        className="space-y-5"
                        method="post"
                        action={`/users/${loaderData.team.team_leader.username}/messages`}
                    >
                       <InputPair
                           label="Introduce yourself"
                           description="Tell us about yourself"
                           name="content"
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