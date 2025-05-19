// import {
//     bigint,
//     integer,
//     pgTable,
//     primaryKey,
//     text,
//     timestamp,
//     uuid,
// } from "drizzle-orm/pg-core";
// import { profiles } from "../users/schema";
import client from "~/supa-client";

// export const gptIdeas = pgTable("gpt_ideas", {
//     gpt_idea_id: bigint({ mode: "number" })
//         .primaryKey()
//         .generatedAlwaysAsIdentity(),
//     idea: text().notNull(),
//     views: integer().notNull().default(0),
//     claimed_at: timestamp(),
//     claimed_by: uuid().references(() => profiles.profile_id, {
//         onDelete: "cascade",
//     }),
//     created_at: timestamp().notNull().defaultNow(),
// });
//
// export const gptIdeasLikes = pgTable(
//     "gpt_ideas_likes",
//     {
//         gpt_idea_id: bigint({ mode: "number" }).references(
//             () => gptIdeas.gpt_idea_id,
//             {
//                 onDelete: "cascade",
//             }
//         ),
//         profile_id: uuid().references(() => profiles.profile_id, {
//             onDelete: "cascade",
//         }),
//     },
//     (table) => [primaryKey({ columns: [table.gpt_idea_id, table.profile_id] })]
// );

export const getGptIdeas = async ({ limit }: { limit: number }) => {
    const { data, error } = await client
        .from("gpt_ideas_view")
        .select("*")
        .limit(limit);

    if (error) { throw error; }
    return data;
};

export const getGptIdea = async (ideaId: number) => {
    const { data, error } = await client
        .from("gpt_ideas_view")
        .select("*")
        .eq("gpt_idea_id", ideaId)
        .single();

    if (error) { throw error; }
    return data;
};